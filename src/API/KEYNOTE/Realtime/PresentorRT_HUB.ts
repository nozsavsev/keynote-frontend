import * as signalR from "@microsoft/signalr";
import { AppENVConfig } from "@/pages/_app";
import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";
import { KEYNOTE_API } from "../API";
import { TRPresentorDTO, TRRoomDTO, TRScreenDTO } from "../KeynoteApi_gen/models";
import { KeynoteRealtimeBase } from "./HubBase";


export class PresentorRT_HUB extends KeynoteRealtimeBase<TRPresentorDTO> {

  protected override async OnSuccessfullConnection() {
    await super.OnSuccessfullConnection();

    if (this.currentRoom == null) {
      await this.CreateRoom();
    } 
  }

  constructor() {
    super("presentorHub");
    makeObservable(this);
  }

  @observable private _isCreatingRoom: boolean = false;

  @computed
  public get isCreatingRoom() {
    return this._isCreatingRoom;
  }

  @action
  private setIsCreatingRoom(state: boolean) {
    this._isCreatingRoom = state;
  }

  @action
  public async CreateRoom(): Promise<boolean> {
    this.setIsCreatingRoom(true);
    if (this.connectionState === "connected" && this.connection != null) {
      var result = await this.connection.invoke("CreateRoom");
      if (result != null) {
        this.setCurrentRoom(result as TRRoomDTO);
        this.setIsCreatingRoom(false);
        return true;
      }
    }
    setTimeout(() => {
      this.setIsCreatingRoom(false);
    }, 5000);
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
  public async TakeTempControl(): Promise<boolean> {
    if (this.connectionState === "connected" && this.connection != null) {
      var result = await this.connection.invoke("TakeTempControl");
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

  @action
  async SetPresentorName(name: string) {
    console.log(`SetPresentorName: ${name}`);
    if (this.connectionState === "connected" && this.connection != null) {
      var result = await this.connection.invoke("SetPresentorName", name);
      if (result != null) {
        this.setMe(result as TRPresentorDTO);
      }
    }
  }

  @action
  async RemoveSpectator(identifier: string) {
    if (this.connectionState === "connected" && this.connection != null) {
      var result = await this.connection.invoke("RemoveSpectator", identifier);
      if (result != null) {
        this.setCurrentRoom(result as TRRoomDTO);
      }
    }
  }

  @action
  async RemoveScreen(identifier: string) {
    if (this.connectionState === "connected" && this.connection != null) {
      var result = await this.connection.invoke("RemoveScreen", identifier);
      if (result != null) {
        this.setCurrentRoom(result as TRRoomDTO);
      }
    }
  }

  //#endregion


}
