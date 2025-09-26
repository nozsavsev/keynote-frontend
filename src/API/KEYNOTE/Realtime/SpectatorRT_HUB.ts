import * as signalR from "@microsoft/signalr";
import { AppENVConfig } from "@/pages/_app";
import { action, computed, makeAutoObservable, observable } from "mobx";
import { KEYNOTE_API } from "../API";
import { TRPresentorDTO, TRRoomDTO, TRSpectatorDTO } from "../KeynoteApi_gen";

export type ConnectionState = "disconnected" | "connecting" | "connected";

export class SpectatorRT_HUB {
  //#region default
 
  @observable private _connectionState: ConnectionState = "disconnected";
  private connection: signalR.HubConnection | null = null;
  private isConnecting: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @computed
  public get connectionState() {
    return this._connectionState;
  }

  @action
  private setConnectionState(state: ConnectionState) {
    this._connectionState = state;
  }

  public async connect() {
    // Prevent multiple simultaneous connection attempts
    if (this.isConnecting || this._connectionState === "connected") {
      console.log("[SpectatorRT_HUB] Connection already in progress or connected, skipping");
      return;
    }

    this.isConnecting = true;

    try {
      await this.disconnect();
      this.setConnectionState("connecting");

      try {
        await KEYNOTE_API.Client.Session.GetSpectatorSession();
      } catch (sessionError) {
        console.warn("[SpectatorRT_HUB] Failed to get spectator session, proceeding anyway:", sessionError);
      }

      const hubUrl = new URL("/spectatorHub", AppENVConfig.API_BASE_REALTIME).toString();
      console.log(`[SpectatorRT_HUB] Connecting to: ${hubUrl}`);

      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl, {
          transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling,
          skipNegotiation: false,
          withCredentials: true,
        })
        .withAutomaticReconnect([0, 2000, 10000, 30000])
        .configureLogging(signalR.LogLevel.Information)
        .build();

      this.connection.onclose((error) => {
        console.log("[SpectatorRT_HUB] Connection closed:", error);
        this.setConnectionState("disconnected");
        this.isConnecting = false;
      });

      this.connection.onreconnecting((error) => {
        console.log("[SpectatorRT_HUB] Reconnecting:", error);
        this.setConnectionState("connecting");
      });

      this.connection.onreconnected((connectionId) => {
        console.log("[SpectatorRT_HUB] Reconnected with connection ID:", connectionId);
        this.setConnectionState("connected");
        this.isConnecting = false;
      });

      this.connection.on("Connected", () => {
        console.log("[SpectatorRT_HUB] Hub Connected event received");
        this.setConnectionState("connected");
        this.isConnecting = false;
      });

      this.connection.on("Disconnected", () => {
        console.log("[SpectatorRT_HUB] Hub Disconnected event received");
        this.setConnectionState("disconnected");
        this.isConnecting = false;
      });

      this.connection.on("Refresh", this.refreshData.bind(this));

      await this.connection
        .start()
        .then(
          (async () => {
            console.log("[SpectatorRT_HUB] Connection started successfully");
            this.setConnectionState("connected");
            this.isConnecting = false;
            await this.refreshData();
          }).bind(this),
        )
        .catch((e) => {
          this.setConnectionState("disconnected");
          this.isConnecting = false;
          this.clearData();
        });
    } catch (e) {
      this.setConnectionState("disconnected");
      this.isConnecting = false;
    }
  }

  public async disconnect() {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
      this.setConnectionState("disconnected");
    }
  }
   //#endregion

  //#region me and room
  private async refreshData() {
    await this.updateMe();
    await this.updateCurrentRoom();
  }

  private async clearData() {
    this.setMe(null);
    this.setCurrentRoom(null);
  }

  @observable private _me: TRSpectatorDTO | null = null;

  @computed
  public get me() {
    return this._me;
  }

  @action
  private setMe(state: TRSpectatorDTO | null) {
    this._me = state;
  }

  @action
  private async updateMe() {
    if (this.connectionState === "connected" && this.connection != null) {
      await this.connection.invoke("Me").then(
        ((response: TRSpectatorDTO) => {
          this.setMe(response);
        }).bind(this),
      );
    }
  }

  @observable private _currentRoom: TRRoomDTO | null = null;

  @computed
  public get currentRoom() {
    return this._currentRoom;
  }

  @action
  private setCurrentRoom(state: TRRoomDTO | null) {
    this._currentRoom = state;
  }

  @action
  private async updateCurrentRoom() {
    if (this.connectionState === "connected" && this.connection != null) {
      await this.connection.invoke("GetCurrentRoom").then(
        ((response: TRRoomDTO) => {
          this.setCurrentRoom(response);
        }).bind(this),
      );
    }
  }
  //#endregion

  //#region actions

  @action
  public async JoinRoom(roomCode: string): Promise<boolean> {
    if (this.connectionState === "connected" && this.connection != null) {
      var result = await this.connection.invoke("JoinRoom", roomCode);
      if (result != null) {
        this.setCurrentRoom(result as TRRoomDTO);
        return true;
      }
    }
    return false;
  }


  @action
  public async SetPage(page: number): Promise<boolean> {
    if (this.connectionState === "connected" && this.connection != null) {
      var result = await this.connection.invoke("SetPage", page);
      if (result != null) {
        this.setCurrentRoom(result as TRRoomDTO);
        return true;
      }
    }
    return false;
  }

  

  //#endregion


  }
