import { ExecuteApiRequest, GetSSRDefaultConfig, SSRConfigParameters } from "../API";
import * as NauthApi from "../NauthApi_gen";
import { ApiServiceCreatePostRequest, ApiServiceDeletePostRequest, ApiServiceGetbyIdGetRequest, ApiServiceUpdatePostRequest } from "../NauthApi_gen";

export class ServiceControllerSSR {
  private getCurrentApi(config: SSRConfigParameters) {
    return new NauthApi.ServiceApi(GetSSRDefaultConfig(config));
  }

  public async Create(config: SSRConfigParameters, params: ApiServiceCreatePostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiServiceCreatePost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async GetById(params: ApiServiceGetbyIdGetRequest & SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiServiceGetbyIdGet;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async Delete(config: SSRConfigParameters, params: ApiServiceDeletePostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiServiceDeletePost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async GetAllGlobal(config: SSRConfigParameters) {
    const api = this.getCurrentApi(config);
    const method = api.apiServiceGetAllGlobalGet;

    return await ExecuteApiRequest<typeof method>(method.bind(api));
  }

  public async GetAllOwned(config: SSRConfigParameters) {
    const api = this.getCurrentApi(config);
    const method = api.apiServiceGetAllOwnedGet;

    return await ExecuteApiRequest<typeof method>(method.bind(api));
  }

  public async Update(config: SSRConfigParameters, params: ApiServiceUpdatePostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiServiceUpdatePost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }
}
