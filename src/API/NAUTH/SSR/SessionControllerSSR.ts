import { ExecuteApiRequest, GetSSRDefaultConfig, SSRConfigParameters } from "../API";
import * as NauthApi from "../NauthApi_gen";
import { ApiSessionRevokeDeleteRequest } from "../NauthApi_gen";

export class SessionControllerSSR {
  private getCurrentApi(config: SSRConfigParameters) {
    return new NauthApi.SessionApi(GetSSRDefaultConfig(config));
  }

  public async GetMy(config: SSRConfigParameters) {
    const api = this.getCurrentApi(config);
    const method = api.apiSessionGetMyGet;

    return await ExecuteApiRequest<typeof method>(method.bind(api));
  }

  public async RevokeAllMy(config: SSRConfigParameters) {
    const api = this.getCurrentApi(config);
    const method = api.apiSessionRevokeAllMyDelete;

    return await ExecuteApiRequest<typeof method>(method.bind(api));
  }

  public async Revoke(config: SSRConfigParameters, params: ApiSessionRevokeDeleteRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiSessionRevokeDelete;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }
}
