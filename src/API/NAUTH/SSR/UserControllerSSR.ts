import { ExecuteApiRequest, GetSSRDefaultConfig, SSRConfigParameters } from "../API";
import * as NauthApi from "../NauthApi_gen";
import {
  ApiUserActivate2FAPostRequest,
  ApiUserActivateSessionPostRequest,
  ApiUserDelete2FAWithCodePostRequest,
  ApiUserDelete2FAWithRecoveryCodePostRequest,
  ApiUserLoginPostRequest,
  ApiUserLoginWithCodePostRequest,
  ApiUserRegisterPostRequest,
  ApiUserSetup2FAPostRequest,
  ApiUserUpdateUserNamePostRequest,
} from "../NauthApi_gen";

export class UserControllerSSR {
  private getCurrentApi(config: SSRConfigParameters) {
    return new NauthApi.UserApi(GetSSRDefaultConfig(config));
  }

  public async Activate2FA(config: SSRConfigParameters, params: ApiUserActivate2FAPostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiUserActivate2FAPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async ActivateSession(config: SSRConfigParameters, params: ApiUserActivateSessionPostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiUserActivateSessionPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async CurrentUser(config: SSRConfigParameters) {
    const api = this.getCurrentApi(config);
    const method = api.apiUserCurrentUserGet;
    return await ExecuteApiRequest<typeof method>(method.bind(api));
  }

  public async Delete2FAWithCode(config: SSRConfigParameters, params: ApiUserDelete2FAWithCodePostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiUserDelete2FAWithCodePost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async Delete2FAWithRecoveryCode(config: SSRConfigParameters, params: ApiUserDelete2FAWithRecoveryCodePostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiUserDelete2FAWithRecoveryCodePost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async Login(config: SSRConfigParameters, params: ApiUserLoginPostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiUserLoginPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async LoginWithCode(config: SSRConfigParameters, params: ApiUserLoginWithCodePostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiUserLoginWithCodePost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async Register(config: SSRConfigParameters, params: ApiUserRegisterPostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiUserRegisterPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async Setup2FA(config: SSRConfigParameters, params: ApiUserSetup2FAPostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiUserSetup2FAPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async UpdateUserName(config: SSRConfigParameters, params: ApiUserUpdateUserNamePostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiUserUpdateUserNamePost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }
}
