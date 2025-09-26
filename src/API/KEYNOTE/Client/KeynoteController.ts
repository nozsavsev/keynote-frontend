import { ExecuteApiRequest, GetDefaultConfig } from "../API";
import * as KeynoteApi from "../KeynoteApi_gen";
import { ApiKeynoteCreateKeynotePostRequest, ApiKeynoteDeleteKeynoteDeleteRequest } from "../KeynoteApi_gen";

export class KeynoteControllerClient {
  private getCurrentApi() {
    return new KeynoteApi.KeynoteApi(GetDefaultConfig());
  }

  public async CreateKeynote(params: ApiKeynoteCreateKeynotePostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiKeynoteCreateKeynotePost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async DeleteKeynote(params: ApiKeynoteDeleteKeynoteDeleteRequest) {
    const api = this.getCurrentApi();
    const method = api.apiKeynoteDeleteKeynoteDelete;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }
}
