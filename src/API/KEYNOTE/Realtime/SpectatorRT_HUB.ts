import * as signalR from "@microsoft/signalr";
import { AppENVConfig } from "@/pages/_app";
import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";
import { KEYNOTE_API } from "../API";
import { TRPresentorDTO, TRRoomDTO, TRSpectatorDTO } from "../KeynoteApi_gen";
import { KeynoteRealtimeBase } from "./HubBase";
import { toast } from "react-toastify";

export class SpectatorRT_HUB extends KeynoteRealtimeBase<TRSpectatorDTO> {
  protected override async OnSuccessfullConnection() {
    await super.OnSuccessfullConnection();
    // SpectatorRT doesn't need any additional setup after connection
  }

  constructor() {
    super("spectatorHub");
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
  public async JoinRoom(roomCode: string): Promise<boolean> {
    this.setIsJoiningRoom(true);
    if (this.connectionState === "connected" && this.connection != null) {
      var result = await this.connection.invoke("JoinRoom", roomCode);
      if (result != null) {
        this.setCurrentRoom(result as TRRoomDTO);
        this.setIsJoiningRoom(false);
        return true;
      }
    }
    setTimeout(() => {
      this.setIsJoiningRoom(false);
      toast.error("Failed to join room");
    }, 5000);
    return false;
  }

  @action
  public async LeaveRoom(): Promise<boolean> {
    this.setIsJoiningRoom(true);
    if (this.connectionState === "connected" && this.connection != null) {
      var result = await this.connection.invoke("LeaveRoom");
      this.setCurrentRoom(null);
      setTimeout(async () => {
        await this.refreshData(null);
        this.setIsJoiningRoom(false);
      }, 2000);
      return true;
    }
    this.setIsJoiningRoom(false);
    return false;
  }

  @action
  public async SetName(name: string): Promise<boolean> {
    if (this.connectionState === "connected" && this.connection != null) {
      var result = await this.connection.invoke("SetName", name);
      if (result != null) {
        this.setCurrentRoom(result as TRRoomDTO);
        return true;
      }
    }
    return false;
  }

  @action
  public async SetHandRaised(raised: boolean): Promise<boolean> {
    if (this.connectionState === "connected" && this.connection != null) {
      var result = await this.connection.invoke("SetHandRaised", raised);
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
