import * as signalR from "@microsoft/signalr";
import { AppENVConfig } from "@/pages/_app";
import { action, computed, makeAutoObservable, observable } from "mobx";
import { KEYNOTE_API } from "../API";
import { TRPresentorDTO, TRRoomDTO, TRScreenDTO } from "../KeynoteApi_gen/models";

export type ConnectionState = "disconnected" | "connecting" | "connected";

export class PresentorRT_HUB {
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
      console.log("[PresentorRT_HUB] Connection already in progress or connected, skipping");
      return;
    }

    this.isConnecting = true;

    try {
      await this.disconnect();
      this.setConnectionState("connecting");

      const hubUrl = new URL("/presentorHub", AppENVConfig.API_BASE_REALTIME).toString();
      console.log(`[PresentorRT_HUB] Connecting to: ${hubUrl}`);

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
        console.log("[PresentorRT_HUB] Connection closed:", error);
        this.setConnectionState("disconnected");
        this.isConnecting = false;
      });

      this.connection.onreconnecting((error) => {
        console.log("[PresentorRT_HUB] Reconnecting:", error);
        this.setConnectionState("connecting");
      });

      this.connection.onreconnected((connectionId) => {
        console.log("[PresentorRT_HUB] Reconnected with connection ID:", connectionId);
        this.setConnectionState("connected");
        this.isConnecting = false;
      });

      this.connection.on("Connected", () => {
        console.log("[PresentorRT_HUB] Hub Connected event received");
        this.setConnectionState("connected");
        this.isConnecting = false;
      });

      this.connection.on("Disconnected", () => {
        console.log("[PresentorRT_HUB] Hub Disconnected event received");
        this.setConnectionState("disconnected");
        this.isConnecting = false;
      });

      this.connection.on("Refresh", this.refreshData.bind(this));

      await this.connection
        .start()
        .then(
          (async () => {
            console.log("[PresentorRT_HUB] Connection started successfully");
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

  @observable private _me: TRPresentorDTO | null = null;

  @computed
  public get me() {
    return this._me;
  }

  @action
  private setMe(state: TRPresentorDTO | null) {
    this._me = state;
  }

  @action
  private async updateMe() {
    if (this.connectionState === "connected" && this.connection != null) {
      var result = await this.connection.invoke("Me");
      this.setMe(result as TRPresentorDTO);
     
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
      var result = await this.connection.invoke("GetCurrentRoom");
      this.setCurrentRoom(result as TRRoomDTO);
    }
  }
  //#endregion

  //#region actions

  @action
  public async CreateRoom(): Promise<boolean> {
    if (this.connectionState === "connected" && this.connection != null) {
      var result = await this.connection.invoke("CreateRoom");
      if (result != null) {
        this.setCurrentRoom(result as TRRoomDTO);
        return true;
      }
    }
    return false;
  }

  @action
  public async SetKeynote(keynoteId: string): Promise<boolean> {
    if (this.connectionState === "connected" && this.connection != null) {
      var result = await this.connection.invoke("SetKeynote", keynoteId);
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

  @action
  public async SetShowSpectatorQR(show: boolean): Promise<boolean> {
    if (this.connectionState === "connected" && this.connection != null) {
      var result = await this.connection.invoke("SetShowSpectatorQR", show);
      if (result != null) {
        this.setCurrentRoom(result as TRRoomDTO);
        return true;
      }
    }
    return false;
  }

  @action
  public async GiveTempControl(spectatorId: string): Promise<boolean> {
    if (this.connectionState === "connected" && this.connection != null) {
      var result = await this.connection.invoke("GiveTempControl", spectatorId);
      if (result != null) {
        this.setCurrentRoom(result as TRRoomDTO);
        return true;
      }
    }
    return false;
  }

  @action
  public async TakeTempControl(spectatorId: string): Promise<boolean> {
    if (this.connectionState === "connected" && this.connection != null) {
      var result = await this.connection.invoke("TakeTempControl", spectatorId);
      if (result != null) {
        this.setCurrentRoom(result as TRRoomDTO);
        return true;
      }
    }
    return false;
  }

  @action
  public async SendRoomCodeToScreen(roomCode: string, tempid: string) {
    if (this.connectionState === "connected" && this.connection != null) {
      await this.connection.invoke("SendRoomCodeToScreen", roomCode, tempid);
    }
  }

  @action async SetPresentorName(name: string) {
    if (this.connectionState === "connected" && this.connection != null) {
      var result = await this.connection.invoke("SetPresentorName", name);
      if (result != null) {
        this.setMe(result as TRPresentorDTO);
      }
    }
  }

  //#endregion


}
