import { ExecuteApiRequest, GetSSRDefaultConfig, SSRConfigParameters } from "../API";
import * as KeynoteApi from "../KeynoteApi_gen";

export class SessionControllerSSR {
  private getCurrentApi(params: SSRConfigParameters) {
    return new KeynoteApi.SessionApi(GetSSRDefaultConfig(params));
  }

  public async GetScreenSession(params: SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiSessionGetScreenSessionGet;
    return await ExecuteApiRequest<typeof method>(method.bind(api), {});
  }

  public async GetSpectatorSession(params: SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiSessionGetSpectatorSessionGet;
    return await ExecuteApiRequest<typeof method>(method.bind(api), {});
  }
}
