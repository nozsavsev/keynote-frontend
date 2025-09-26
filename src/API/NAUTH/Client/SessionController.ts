import { ExecuteApiRequest, GetDefaultConfig } from "../API";
import * as NauthApi from "../NauthApi_gen";
import { ApiSessionRevokeDeleteRequest } from "../NauthApi_gen";

export class SessionControllerClient {
  private getCurrentApi() {
    return new NauthApi.SessionApi(GetDefaultConfig());
  }

  public async RevokeCurrentNo2FA() {
    const api = this.getCurrentApi();
    const method = api.apiSessionRevokeCurrentDelete;

    return await ExecuteApiRequest<typeof method>(method.bind(api));
  }

  public async GetMy() {
    const api = this.getCurrentApi();
    const method = api.apiSessionGetMyGet;

    return await ExecuteApiRequest<typeof method>(method.bind(api));
  }

  public async RevokeAllMy() {
    const api = this.getCurrentApi();
    const method = api.apiSessionRevokeAllMyDelete;

    return await ExecuteApiRequest<typeof method>(method.bind(api));
  }

  public async Revoke(params: ApiSessionRevokeDeleteRequest) {
    const api = this.getCurrentApi();
    const method = api.apiSessionRevokeDelete;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }
}
