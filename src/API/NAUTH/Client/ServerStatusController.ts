import { ExecuteApiRequest, GetDefaultConfig } from "../API";
import * as NauthApi from "../NauthApi_gen";

export class StatusControllerClient {
  private getCurrentApi() {
    return new NauthApi.StatusApi(GetDefaultConfig());
  }

  public async Status() {
    const api = this.getCurrentApi();
    const method = api.statusGet;
    return await ExecuteApiRequest<typeof method>(method.bind(api));
  }
}
