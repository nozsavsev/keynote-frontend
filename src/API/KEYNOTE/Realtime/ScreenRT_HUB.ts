import * as signalR from "@microsoft/signalr";
import { AppENVConfig } from "@/pages/_app";
import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";
import { KEYNOTE_API } from "../API";
import { TRScreenDTO, TRRoomDTO } from "../KeynoteApi_gen";
import { toast } from "react-toastify";
import { KeynoteRealtimeBase } from "./HubBase";

export class ScreenRT_HUB extends KeynoteRealtimeBase<TRScreenDTO> {
  @observable private _roomCode: string = "";

  @computed
  public get roomCode() {
    return this._roomCode;
  }

  @action
  public setRoomCode(state: string) {
    this._roomCode = state;
  }

  public override async OnRoomCodeReceived(roomCode: string) {
    console.log(`[ScreenRT_HUB] OnRoomCodeReceived:`, roomCode);
    this.setRoomCode(roomCode);
  }

  protected override async OnSuccessfullConnection() {
    await super.OnSuccessfullConnection();
    // ScreenRT doesn't need any additional setup after connection
    // It will wait for room codes via OnRoomCodeReceived
  }

  constructor() {
    super("screenHub");
    makeObservable(this);
  }

  //#region actions

  @observable private _isJoiningRoom: boolean = false;

  @computed
  public get isJoiningRoom() {
    return this._isJoiningRoom;
  }

  @action
  private setIsJoiningRoom(state: boolean) {
    this._isJoiningRoom = state;
  }

  @action
  public async WaitRoomAsScreen(): Promise<string> {
    if (this.connectionState === "connected" && this.connection != null) {
      var result = await this.connection.invoke("WaitRoomAsScreen");
      return result as string;
    }
    return "";
  }

  @action
  public async JoinRoomAsScreen(RoomCode: string): Promise<boolean> {
    this.setIsJoiningRoom(true);
    this.setRoomCode("");
    try {
      if (this.connectionState === "connected" && this.connection != null) {
        var result = (await this.connection.invoke("JoinRoomAsScreen", RoomCode)) as TRRoomDTO;
        if (result != null) {
          this.setCurrentRoom(result);
          this.setIsJoiningRoom(false);
          return true;
        }
      } else {
        console.warn(
          `ScreenRT_HUB: Cannot join room - connection state: ${this.connectionState}, connection: ${this.connection ? "exists" : "null"}`,
        );
      }
    } catch (error) {
      console.error(`ScreenRT_HUB: Failed to invoke JoinRoomAsScreen:`, error);
      toast.error(`Failed to join room: ${error instanceof Error ? error.message : "Unknown error"}`);
    }

    setTimeout(() => {
      this.setIsJoiningRoom(false);
      toast.error("Failed to join room");
    }, 5000);

    return false;
  }

  @action
  public async SetPage(page: number): Promise<boolean> {
    if (this.connectionState === "connected" && this.connection != null) {
      var result = (await this.connection.invoke("SetPage", page)) as TRRoomDTO;
      if (result != null) {
        this.setCurrentRoom(result);
        return true;
      }
    }
    return false;
  }

  @action
  public async LeaveRoom() {
    if (this.connectionState === "connected" && this.connection != null) {
      await this.connection.invoke("LeaveRoom");
    }
  }

  //#endregion
}
