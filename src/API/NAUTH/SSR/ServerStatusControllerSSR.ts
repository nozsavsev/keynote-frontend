import { ExecuteApiRequest, GetSSRDefaultConfig, SSRConfigParameters } from "../API";
import * as NauthApi from "../NauthApi_gen";

export class ServerStatusControllerSSR {
  private getCurrentApi(config: SSRConfigParameters) {
    return new NauthApi.StatusApi(GetSSRDefaultConfig(config));
  }

  public async Status(config: SSRConfigParameters) {
    const api = this.getCurrentApi(config);
    const method = api.statusGet;
    return await ExecuteApiRequest<typeof method>(method.bind(api));
  }
}
