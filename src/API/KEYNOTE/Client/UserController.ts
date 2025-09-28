import { ExecuteApiRequest, GetDefaultConfig } from "../API";
import * as KeynoteApi from "../KeynoteApi_gen";

export class UserControllerClient {
  private getCurrentApi() {
    return new KeynoteApi.UserApi(GetDefaultConfig());
  }

  public async CurrentUser() {
    const api = this.getCurrentApi();
    const method = api.apiUserCurrentUserGet;
    var result = await ExecuteApiRequest<typeof method>(method.bind(api), {});
    console.log("result", result);
    return result;
  }
}
