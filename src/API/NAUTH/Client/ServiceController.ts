import { ExecuteApiRequest, GetDefaultConfig } from "../API";
import * as NauthApi from "../NauthApi_gen";
import {
  ApiServiceCreatePostRequest,
  ApiServiceDeletePostRequest,
  ApiServiceGetbyIdGetRequest,
  ApiServiceGetSessionPostRequest,
  ApiServiceUpdatePostRequest,
} from "../NauthApi_gen";

export class ServiceControllerClient {
  private getCurrentApi() {
    return new NauthApi.ServiceApi(GetDefaultConfig());
  }

  public async Create(params: ApiServiceCreatePostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiServiceCreatePost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async GetById(params: ApiServiceGetbyIdGetRequest) {
    const api = this.getCurrentApi();
    const method = api.apiServiceGetbyIdGet;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async Delete(params: ApiServiceDeletePostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiServiceDeletePost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async GetAllGlobal() {
    const api = this.getCurrentApi();
    const method = api.apiServiceGetAllGlobalGet;

    return await ExecuteApiRequest<typeof method>(method.bind(api));
  }

  public async GetAllOwned() {
    const api = this.getCurrentApi();
    const method = api.apiServiceGetAllOwnedGet;

    return await ExecuteApiRequest<typeof method>(method.bind(api));
  }

  public async GetSession(params: ApiServiceGetSessionPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiServiceGetSessionPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async Update(params: ApiServiceUpdatePostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiServiceUpdatePost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }
}
