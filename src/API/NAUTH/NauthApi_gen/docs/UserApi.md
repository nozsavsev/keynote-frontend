# UserApi

All URIs are relative to _http://localhost_

| Method                                                                            | HTTP request                                 | Description |
| --------------------------------------------------------------------------------- | -------------------------------------------- | ----------- |
| [**apiUserActivate2FAPost**](#apiuseractivate2fapost)                             | **POST** /api/User/activate2FA               |             |
| [**apiUserActivateSessionPost**](#apiuseractivatesessionpost)                     | **POST** /api/User/activateSession           |             |
| [**apiUserAdminDeleteUserPost**](#apiuseradmindeleteuserpost)                     | **POST** /api/User/adminDeleteUser           |             |
| [**apiUserAdminDisableUserPost**](#apiuseradmindisableuserpost)                   | **POST** /api/User/adminDisableUser          |             |
| [**apiUserAdminEnableUserPost**](#apiuseradminenableuserpost)                     | **POST** /api/User/adminEnableUser           |             |
| [**apiUserAdminForceUnVerifyEmailPost**](#apiuseradminforceunverifyemailpost)     | **POST** /api/User/adminForceUnVerifyEmail   |             |
| [**apiUserAdminForceVerifyEmailPost**](#apiuseradminforceverifyemailpost)         | **POST** /api/User/adminForceVerifyEmail     |             |
| [**apiUserAdminSetUserEmailPost**](#apiuseradminsetuseremailpost)                 | **POST** /api/User/adminSetUserEmail         |             |
| [**apiUserAdminSetUserPasswordPost**](#apiuseradminsetuserpasswordpost)           | **POST** /api/User/adminSetUserPassword      |             |
| [**apiUserAdminUpdatePermissionsPost**](#apiuseradminupdatepermissionspost)       | **POST** /api/User/adminUpdatePermissions    |             |
| [**apiUserAdminUpdateUserNamePost**](#apiuseradminupdateusernamepost)             | **POST** /api/User/adminUpdateUserName       |             |
| [**apiUserCurrentUserGet**](#apiusercurrentuserget)                               | **GET** /api/User/currentUser                |             |
| [**apiUserDelete2FAWithCodePost**](#apiuserdelete2fawithcodepost)                 | **POST** /api/User/delete2FAWithCode         |             |
| [**apiUserDelete2FAWithRecoveryCodePost**](#apiuserdelete2fawithrecoverycodepost) | **POST** /api/User/delete2FAWithRecoveryCode |             |
| [**apiUserLoginPost**](#apiuserloginpost)                                         | **POST** /api/User/login                     |             |
| [**apiUserLoginWithCodePost**](#apiuserloginwithcodepost)                         | **POST** /api/User/loginWithCode             |             |
| [**apiUserRegisterPost**](#apiuserregisterpost)                                   | **POST** /api/User/register                  |             |
| [**apiUserRevokeAllUserSessionsPost**](#apiuserrevokeallusersessionspost)         | **POST** /api/User/revokeAllUserSessions     |             |
| [**apiUserSetup2FAPost**](#apiusersetup2fapost)                                   | **POST** /api/User/setup2FA                  |             |
| [**apiUserUpdateUserNamePost**](#apiuserupdateusernamepost)                       | **POST** /api/User/updateUserName            |             |

# **apiUserActivate2FAPost**

> Model2FAEntrySetupDTOResponseWrapper apiUserActivate2FAPost()

### Example

```typescript
import { UserApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let code: string; // (optional) (default to undefined)
let _2faId: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiUserActivate2FAPost(code, _2faId);
```

### Parameters

| Name        | Type         | Description | Notes                            |
| ----------- | ------------ | ----------- | -------------------------------- |
| **code**    | [**string**] |             | (optional) defaults to undefined |
| **\_2faId** | [**number**] |             | (optional) defaults to undefined |

### Return type

**Model2FAEntrySetupDTOResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUserActivateSessionPost**

> Model2FAEntrySetupDTOResponseWrapper apiUserActivateSessionPost()

### Example

```typescript
import { UserApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let code: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiUserActivateSessionPost(code);
```

### Parameters

| Name     | Type         | Description | Notes                            |
| -------- | ------------ | ----------- | -------------------------------- |
| **code** | [**string**] |             | (optional) defaults to undefined |

### Return type

**Model2FAEntrySetupDTOResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUserAdminDeleteUserPost**

> UserDTOResponseWrapper apiUserAdminDeleteUserPost()

### Example

```typescript
import { UserApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiUserAdminDeleteUserPost(id);
```

### Parameters

| Name   | Type         | Description | Notes                            |
| ------ | ------------ | ----------- | -------------------------------- |
| **id** | [**number**] |             | (optional) defaults to undefined |

### Return type

**UserDTOResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUserAdminDisableUserPost**

> UserDTOResponseWrapper apiUserAdminDisableUserPost()

### Example

```typescript
import { UserApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiUserAdminDisableUserPost(id);
```

### Parameters

| Name   | Type         | Description | Notes                            |
| ------ | ------------ | ----------- | -------------------------------- |
| **id** | [**number**] |             | (optional) defaults to undefined |

### Return type

**UserDTOResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUserAdminEnableUserPost**

> UserDTOResponseWrapper apiUserAdminEnableUserPost()

### Example

```typescript
import { UserApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiUserAdminEnableUserPost(id);
```

### Parameters

| Name   | Type         | Description | Notes                            |
| ------ | ------------ | ----------- | -------------------------------- |
| **id** | [**number**] |             | (optional) defaults to undefined |

### Return type

**UserDTOResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUserAdminForceUnVerifyEmailPost**

> UserDTOResponseWrapper apiUserAdminForceUnVerifyEmailPost()

### Example

```typescript
import { UserApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiUserAdminForceUnVerifyEmailPost(id);
```

### Parameters

| Name   | Type         | Description | Notes                            |
| ------ | ------------ | ----------- | -------------------------------- |
| **id** | [**number**] |             | (optional) defaults to undefined |

### Return type

**UserDTOResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUserAdminForceVerifyEmailPost**

> UserDTOResponseWrapper apiUserAdminForceVerifyEmailPost()

### Example

```typescript
import { UserApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiUserAdminForceVerifyEmailPost(id);
```

### Parameters

| Name   | Type         | Description | Notes                            |
| ------ | ------------ | ----------- | -------------------------------- |
| **id** | [**number**] |             | (optional) defaults to undefined |

### Return type

**UserDTOResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUserAdminSetUserEmailPost**

> UserDTOResponseWrapper apiUserAdminSetUserEmailPost()

### Example

```typescript
import { UserApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: number; // (optional) (default to undefined)
let email: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiUserAdminSetUserEmailPost(id, email);
```

### Parameters

| Name      | Type         | Description | Notes                            |
| --------- | ------------ | ----------- | -------------------------------- |
| **id**    | [**number**] |             | (optional) defaults to undefined |
| **email** | [**string**] |             | (optional) defaults to undefined |

### Return type

**UserDTOResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUserAdminSetUserPasswordPost**

> UserDTOResponseWrapper apiUserAdminSetUserPasswordPost()

### Example

```typescript
import { UserApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: number; // (optional) (default to undefined)
let password: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiUserAdminSetUserPasswordPost(id, password);
```

### Parameters

| Name         | Type         | Description | Notes                            |
| ------------ | ------------ | ----------- | -------------------------------- |
| **id**       | [**number**] |             | (optional) defaults to undefined |
| **password** | [**string**] |             | (optional) defaults to undefined |

### Return type

**UserDTOResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUserAdminUpdatePermissionsPost**

> UserDTOResponseWrapper apiUserAdminUpdatePermissionsPost()

### Example

```typescript
import { UserApi, Configuration, UserDTO } from "./api";

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let userDTO: UserDTO; // (optional)

const { status, data } = await apiInstance.apiUserAdminUpdatePermissionsPost(userDTO);
```

### Parameters

| Name        | Type        | Description | Notes |
| ----------- | ----------- | ----------- | ----- |
| **userDTO** | **UserDTO** |             |       |

### Return type

**UserDTOResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json, text/json, application/\*+json
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUserAdminUpdateUserNamePost**

> UserDTOResponseWrapper apiUserAdminUpdateUserNamePost()

### Example

```typescript
import { UserApi, Configuration, AdminUpdateUserNameDTO } from "./api";

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let adminUpdateUserNameDTO: AdminUpdateUserNameDTO; // (optional)

const { status, data } = await apiInstance.apiUserAdminUpdateUserNamePost(adminUpdateUserNameDTO);
```

### Parameters

| Name                       | Type                       | Description | Notes |
| -------------------------- | -------------------------- | ----------- | ----- |
| **adminUpdateUserNameDTO** | **AdminUpdateUserNameDTO** |             |       |

### Return type

**UserDTOResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json, text/json, application/\*+json
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUserCurrentUserGet**

> UserDTOResponseWrapper apiUserCurrentUserGet()

### Example

```typescript
import { UserApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

const { status, data } = await apiInstance.apiUserCurrentUserGet();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**UserDTOResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUserDelete2FAWithCodePost**

> Model2FAEntrySetupDTOResponseWrapper apiUserDelete2FAWithCodePost()

### Example

```typescript
import { UserApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let code: string; // (optional) (default to undefined)
let _2faId: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiUserDelete2FAWithCodePost(code, _2faId);
```

### Parameters

| Name        | Type         | Description | Notes                            |
| ----------- | ------------ | ----------- | -------------------------------- |
| **code**    | [**string**] |             | (optional) defaults to undefined |
| **\_2faId** | [**number**] |             | (optional) defaults to undefined |

### Return type

**Model2FAEntrySetupDTOResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUserDelete2FAWithRecoveryCodePost**

> Model2FAEntrySetupDTOResponseWrapper apiUserDelete2FAWithRecoveryCodePost()

### Example

```typescript
import { UserApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let code: string; // (optional) (default to undefined)
let _2faId: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiUserDelete2FAWithRecoveryCodePost(code, _2faId);
```

### Parameters

| Name        | Type         | Description | Notes                            |
| ----------- | ------------ | ----------- | -------------------------------- |
| **code**    | [**string**] |             | (optional) defaults to undefined |
| **\_2faId** | [**number**] |             | (optional) defaults to undefined |

### Return type

**Model2FAEntrySetupDTOResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUserLoginPost**

> StringResponseWrapper apiUserLoginPost()

### Example

```typescript
import { UserApi, Configuration, CreateUserDTO } from "./api";

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let createUserDTO: CreateUserDTO; // (optional)

const { status, data } = await apiInstance.apiUserLoginPost(createUserDTO);
```

### Parameters

| Name              | Type              | Description | Notes |
| ----------------- | ----------------- | ----------- | ----- |
| **createUserDTO** | **CreateUserDTO** |             |       |

### Return type

**StringResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json, text/json, application/\*+json
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUserLoginWithCodePost**

> StringResponseWrapper apiUserLoginWithCodePost()

### Example

```typescript
import { UserApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let email: string; // (optional) (default to undefined)
let code: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiUserLoginWithCodePost(email, code);
```

### Parameters

| Name      | Type         | Description | Notes                            |
| --------- | ------------ | ----------- | -------------------------------- |
| **email** | [**string**] |             | (optional) defaults to undefined |
| **code**  | [**number**] |             | (optional) defaults to undefined |

### Return type

**StringResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUserRegisterPost**

> UserDTOResponseWrapper apiUserRegisterPost()

### Example

```typescript
import { UserApi, Configuration, CreateUserDTO } from "./api";

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let createUserDTO: CreateUserDTO; // (optional)

const { status, data } = await apiInstance.apiUserRegisterPost(createUserDTO);
```

### Parameters

| Name              | Type              | Description | Notes |
| ----------------- | ----------------- | ----------- | ----- |
| **createUserDTO** | **CreateUserDTO** |             |       |

### Return type

**UserDTOResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json, text/json, application/\*+json
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUserRevokeAllUserSessionsPost**

> UserDTOResponseWrapper apiUserRevokeAllUserSessionsPost()

### Example

```typescript
import { UserApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiUserRevokeAllUserSessionsPost(id);
```

### Parameters

| Name   | Type         | Description | Notes                            |
| ------ | ------------ | ----------- | -------------------------------- |
| **id** | [**number**] |             | (optional) defaults to undefined |

### Return type

**UserDTOResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUserSetup2FAPost**

> Model2FAEntrySetupDTOResponseWrapper apiUserSetup2FAPost()

### Example

```typescript
import { UserApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let code: string; // (optional) (default to undefined)
let name: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiUserSetup2FAPost(code, name);
```

### Parameters

| Name     | Type         | Description | Notes                            |
| -------- | ------------ | ----------- | -------------------------------- |
| **code** | [**string**] |             | (optional) defaults to undefined |
| **name** | [**string**] |             | (optional) defaults to undefined |

### Return type

**Model2FAEntrySetupDTOResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiUserUpdateUserNamePost**

> UserDTOResponseWrapper apiUserUpdateUserNamePost()

### Example

```typescript
import { UserApi, Configuration, UpdateNameDTO } from "./api";

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let updateNameDTO: UpdateNameDTO; // (optional)

const { status, data } = await apiInstance.apiUserUpdateUserNamePost(updateNameDTO);
```

### Parameters

| Name              | Type              | Description | Notes |
| ----------------- | ----------------- | ----------- | ----- |
| **updateNameDTO** | **UpdateNameDTO** |             |       |

### Return type

**UserDTOResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json, text/json, application/\*+json
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
