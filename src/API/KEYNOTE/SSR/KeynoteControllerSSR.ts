import { ExecuteApiRequest, GetDefaultConfig, SSRConfigParameters } from "../API";
import { GetSSRDefaultConfig } from "../API";
import * as KeynoteApi from "../KeynoteApi_gen";
import { ApiKeynoteCreateKeynotePostRequest, ApiKeynoteDeleteKeynoteDeleteRequest } from "../KeynoteApi_gen";

export class KeynoteControllerSSR {
  private getCurrentApi(params: SSRConfigParameters) {
    return new KeynoteApi.KeynoteApi(GetSSRDefaultConfig(params));
  }

  public async CreateKeynote(params: ApiKeynoteCreateKeynotePostRequest & SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiKeynoteCreateKeynotePost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async DeleteKeynote(params: ApiKeynoteDeleteKeynoteDeleteRequest & SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiKeynoteDeleteKeynoteDelete;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }
}
