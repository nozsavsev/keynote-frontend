import * as signalR from "@microsoft/signalr";
import { action, makeAutoObservable, observable } from "mobx";
import { AppENVConfig } from "@/pages/_app";
import { SessionDTO } from "./NauthApi_gen";

const dev = process.env.NODE_ENV !== "production";

export class NauthRealtime {
  private connection: signalR.HubConnection | null = null;

  private sessions: SessionDTO[] = [];

  public get Sessions() {
    return this.sessions;
  }

  private set Sessions(sessions: SessionDTO[]) {
    this.sessions = sessions;
  }

  constructor() {
    makeAutoObservable(this);
  }

  @observable private refreshData: () => void = () => {};

  @action
  public set RefreshData(refreshData: () => void) {
    this.refreshData = refreshData;
  }

  @action public async onLogout() {
    console.log("onLogout");
    //@ts-ignore
    if (!window.noLogoutRedirect) window.location.replace(new URL("/auth/revoked", AppENVConfig.NAUTH_FRONTEND_BASE).toString());
  }

  @action public async onDeleted() {
    console.log("onDeleted");
    window.location.replace(new URL("/auth/deleted", AppENVConfig.NAUTH_FRONTEND_BASE).toString());
  }

  @action public async onRefreshData() {
    console.log("onRefreshData");
    this.refreshData();
  }

  public async connect() {
    try {
      await this.disconnect();

      this.connection = new signalR.HubConnectionBuilder()

        .withUrl(AppENVConfig.NAUTH_API_BASE_REALTIME, {
          transport: signalR.HttpTransportType.WebSockets,
        })
        .withAutomaticReconnect()
        .build();

      this.connection.on("Logout", this.onLogout.bind(this));
      this.connection.on("Deleted", this.onDeleted.bind(this));
      this.connection.on("RefreshData", this.onRefreshData.bind(this));

      await this.connection
        .start()
        .then(this.onRefreshData.bind(this))
        .catch((e) => {});
    } catch (e) {}
  }

  public async disconnect() {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
    }
  }
}
