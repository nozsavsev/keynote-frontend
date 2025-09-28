import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";
import { TRPresentorDTO, TRRoomDTO } from "../KeynoteApi_gen";
import * as signalR from "@microsoft/signalr";
import { AppENVConfig } from "@/pages/_app";
import { KEYNOTE_API } from "../API";

export type ConnectionState = "disconnected" | "connecting" | "connected";

export class KeynoteRealtimeBase<ME_TYPE> {
  constructor(private readonly hubName: "presentorHub" | "screenHub" | "spectatorHub") {
    // MobX observables will be configured in child classes
  }

  //#region default

  @observable protected _connectionState: ConnectionState = "disconnected";
  protected connection: signalR.HubConnection | null = null;
  protected isConnecting: boolean = false;
  private healthCheckInterval: NodeJS.Timeout | null = null;
  private lastActivityTime: number = Date.now();
  private isTabVisible: boolean = true;

  @computed
  public get connectionState() {
    return this._connectionState;
  }

  @action
  protected setConnectionState(state: ConnectionState) {
    this._connectionState = state;
  }

  public async connect() {
    // Prevent multiple simultaneous connection attempts
    if (this.isConnecting || this._connectionState === "connected") {
      return;
    }

    this.isConnecting = true;

    await this.disconnect();
    this.setConnectionState("connecting");

    // Acquire session cookie for screen and spectator hubs
    await this.acquireSessionCookie();

    const hubUrl = new URL(`/${this.hubName}`, AppENVConfig.API_BASE_REALTIME).toString();

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling,
        skipNegotiation: false,
        withCredentials: true,
      })
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          // Exponential backoff: 0, 2s, 5s, 10s, 20s, 30s, then 30s intervals
          const delays = [0, 2000, 5000, 10000, 20000, 30000];
          const index = Math.min(retryContext.previousRetryCount, delays.length - 1);
          return delays[index];
        },
      })
      .configureLogging(signalR.LogLevel.Error)
      .build();

    this.connection.onclose((error) => {
      // Only set to disconnected if we're not in the middle of a reconnection attempt
      if (this.connection?.state !== signalR.HubConnectionState.Reconnecting) {
        this.setConnectionState("disconnected");
        this.isConnecting = false;
      }
    });

    this.connection.onreconnecting((error) => {
      this.setConnectionState("connecting");
    });

    this.connection.onreconnected((connectionId) => {
      this.setConnectionState("connected");
      this.isConnecting = false;
    });

    this.connection.on("Disconnected", () => {
      this.setConnectionState("disconnected");
      this.isConnecting = false;
    });

    this.connection.on("Refresh", (room) => {
      console.log(`[${this.hubName}] Refresh:`, JSON.stringify(room, null, 2));
      this.lastActivityTime = Date.now();
      this.refreshData(room);
    });

    this.connection.on("RoomCode", (roomCode) => {
      console.log(`[${this.hubName}] RoomCodeReceived:`, roomCode);
      this.OnRoomCodeReceived(roomCode);
    });

    // Add health check and visibility monitoring
    this.setupHealthMonitoring();

    try {
      await this.connection.start().catch((e) => {
        throw "aboba";
      });

      this.setConnectionState("connected");
      this.isConnecting = false;
      await this.OnSuccessfullConnection();
    } catch (e) {
      console.error(`[${this.hubName}] Connection failed:`, e);
      this.setConnectionState("disconnected");
      this.isConnecting = false;
      this.clearData();
    }
  }

  @action
  public async disconnect() {
    this.stopHealthMonitoring();
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
      this.setConnectionState("disconnected");
    }
  }

  @action
  private async acquireSessionCookie() {
    // Only screen and spectator hubs need to acquire their own session cookies
    if (this.hubName === "screenHub" || this.hubName === "spectatorHub") {
      try {
        if (this.hubName === "screenHub") {
          await KEYNOTE_API.Client.Session.GetScreenSession();
        } else if (this.hubName === "spectatorHub") {
          await KEYNOTE_API.Client.Session.GetSpectatorSession();
        }
      } catch (error) {
        console.error(`[${this.hubName}] Failed to acquire session cookie:`, error);
        throw error;
      }
    }
  }

  //#endregion

  //#region me and room
  @action
  protected async refreshData(room: TRRoomDTO | null) {
    await this.updateMe();
    if (room?.screen == null && this.hubName === "screenHub") room = null;
    await this.updateCurrentRoom(room);
  }

  @action
  protected async clearData() {
    this.setMe(null);
    this.setCurrentRoom(null);
  }

  @observable protected _me: ME_TYPE | null = null;

  @computed
  public get me() {
    return this._me;
  }

  @action
  protected setMe(state: ME_TYPE | null) {
    if (state != null) {
      // Make the user object observable to track nested property changes
      this._me = observable(state);
    } else {
      this._me = state;
    }
  }

  @action
  protected async updateMe() {
    if (this.connectionState === "connected" && this.connection != null) {
      var result = await this.connection.invoke("Me");
      console.log(`[${this.hubName}] updateMe:`, JSON.stringify(result, null, 2));
      this.setMe(result as ME_TYPE);
    }
  }

  @observable protected _currentRoom: TRRoomDTO | null = null;

  @computed
  public get currentRoom() {
    return this._currentRoom;
  }

  @computed
  public get hasScreen() {
    return this._currentRoom?.screen != null;
  }

  @action
  protected setCurrentRoom(state: TRRoomDTO | null) {
    if (state != null) {
      // Force MobX to detect the change by creating a completely new observable object
      const newRoom = observable({
        identifier: state.identifier,
        roomCode: state.roomCode,
        keynote: state.keynote ? observable(state.keynote) : undefined,
        currentFrame: state.currentFrame,
        showSpectatorQR: state.showSpectatorQR,
        tempControlSpectatorId: state.tempControlSpectatorId,
        presentor: state.presentor ? observable(state.presentor) : undefined,
        screen: state.screen ? observable(state.screen) : undefined,
        spectators: state.spectators ? observable(state.spectators) : undefined,
      });

      // Ensure the observable is properly configured
      makeObservable(newRoom);
      this._currentRoom = newRoom;
    } else {
      this._currentRoom = state;
    }
  }
 
  @action
  protected async OnSuccessfullConnection() {
    if (this.connectionState === "connected" && this.connection != null) {
      await this.refreshData(null);
    }
  }
 
  @action
  protected async OnRoomCodeReceived(roomCode: string) {
    if (this.connectionState === "connected" && this.connection != null) {
      console.log(`[${this.hubName}_BASE] OnRoomCodeReceived:`, roomCode);
    }
  }

  @action
  protected async updateCurrentRoom(room: TRRoomDTO | null) {
    if (this.connectionState === "connected" && this.connection != null && room == null) {
      var result = await this.connection.invoke("GetCurrentRoom");
      this.setCurrentRoom(result as TRRoomDTO);
    } else {
      this.setCurrentRoom(room);
    }
  }
  //#endregion

  //#region health monitoring
 
  @action
  private setupHealthMonitoring() {
    // Start health check interval (every 30 seconds)
    this.healthCheckInterval = setInterval(() => {
      this.performHealthCheck();
    }, 30000);

    // Setup Page Visibility API
    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", () => {
        this.isTabVisible = !document.hidden;
        if (this.isTabVisible && this.connectionState === "disconnected") {
          console.log(`[${this.hubName}] Tab became visible, attempting to reconnect...`);
          this.connect().catch(console.error);
        }
      });
    }
  }

  @action
  private stopHealthMonitoring() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
  }
 
  @action
  private async performHealthCheck() {
    console.log(`[${this.hubName}] Performing health check...`);

    if (this.connectionState !== "connected" || !this.connection) {
      return;
    }

    const timeSinceLastActivity = Date.now() - this.lastActivityTime;
    const isStale = timeSinceLastActivity > 120000; // 2 minutes without activity

    if (isStale || !this.isTabVisible) {
      console.log(`[${this.hubName}] Connection appears stale (${timeSinceLastActivity}ms since last activity), reconnecting...`);
      await this.reconnect();
      return;
    }

    // Check if connection is still alive by checking the connection state
    try {
      if (this.connection.state === signalR.HubConnectionState.Connected) {
        this.lastActivityTime = Date.now();
      } else {
        console.warn(`[${this.hubName}] Connection state is not connected: ${this.connection.state}`);
        await this.reconnect();
      }
    } catch (error) {
      console.warn(`[${this.hubName}] Health check failed:`, error);
      await this.reconnect();
    }
  }

  @action
  private async reconnect() {
    if (this.isConnecting) {
      return; // Already reconnecting
    }

    console.log(`[${this.hubName}] Initiating reconnection...`);
    this.stopHealthMonitoring();

    try {
      await this.disconnect();
      await this.connect();
    } catch (error) {
      console.error(`[${this.hubName}] Reconnection failed:`, error);
    }
  }

  //#endregion
}
