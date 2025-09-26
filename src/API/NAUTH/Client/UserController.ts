import { ExecuteApiRequest, GetDefaultConfig } from "../API";
import * as NauthApi from "../NauthApi_gen";
import {
  ApiUserActivate2FAPostRequest,
  ApiUserActivateSessionPostRequest,
  ApiUserContinueWithGoogleGetRequest,
  ApiUserDelete2FAWithCodePostRequest,
  ApiUserDelete2FAWithRecoveryCodePostRequest,
  ApiUserLoginPostRequest,
  ApiUserLoginWithCodePostRequest,
  ApiUserRegisterPostRequest,
  ApiUserSetup2FAPostRequest,
  ApiUserUpdateUserNamePostRequest,
  ApiUserUploadAvatarPostRequest,
} from "../NauthApi_gen";

export class UserControllerClient {
  private getCurrentApi() {
    return new NauthApi.UserApi(GetDefaultConfig());
  }

  public async ContinueWithGoogle(params: ApiUserContinueWithGoogleGetRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserContinueWithGoogleGet;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async UploadAvatar(params: ApiUserUploadAvatarPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserUploadAvatarPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async Activate2FA(params: ApiUserActivate2FAPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserActivate2FAPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async ActivateSession(params: ApiUserActivateSessionPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserActivateSessionPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async CurrentUser() {
    const api = this.getCurrentApi();
    const method = api.apiUserCurrentUserGet;
    return await ExecuteApiRequest<typeof method>(method.bind(api));
  }

  public async Delete2FAWithCode(params: ApiUserDelete2FAWithCodePostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserDelete2FAWithCodePost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async Delete2FAWithRecoveryCode(params: ApiUserDelete2FAWithRecoveryCodePostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserDelete2FAWithRecoveryCodePost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async Login(params: ApiUserLoginPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserLoginPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async LoginWithCode(params: ApiUserLoginWithCodePostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserLoginWithCodePost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async Register(params: ApiUserRegisterPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserRegisterPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async Setup2FA(params: ApiUserSetup2FAPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserSetup2FAPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async UpdateUserName(params: ApiUserUpdateUserNamePostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserUpdateUserNamePost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }
}
