import { ExecuteApiRequest, GetDefaultConfig } from "../API";
import * as KeynoteApi from "../KeynoteApi_gen";

export class SessionControllerClient {
  private getCurrentApi() {
    return new KeynoteApi.SessionApi(GetDefaultConfig());
  }

  public async GetScreenSession() {
    const api = this.getCurrentApi();
    const method = api.apiSessionGetScreenSessionGet;
    return await ExecuteApiRequest<typeof method>(method.bind(api), {});
  }

  public async GetSpectatorSession() {
    const api = this.getCurrentApi();
    const method = api.apiSessionGetSpectatorSessionGet;
    return await ExecuteApiRequest<typeof method>(method.bind(api), {});
  }
}
