# NauthApi

All URIs are relative to _http://localhost_

| Method                                                                  | HTTP request                            | Description |
| ----------------------------------------------------------------------- | --------------------------------------- | ----------- |
| [**apiNauthAddUserPermissionGet**](#apinauthadduserpermissionget)       | **GET** /api/Nauth/addUserPermission    |             |
| [**apiNauthDecodeAuthTokenGet**](#apinauthdecodeauthtokenget)           | **GET** /api/Nauth/decodeAuthToken      |             |
| [**apiNauthRemoveUserPermissionGet**](#apinauthremoveuserpermissionget) | **GET** /api/Nauth/removeUserPermission |             |

# **apiNauthAddUserPermissionGet**

> UserDTOResponseWrapper apiNauthAddUserPermissionGet()

### Example

```typescript
import { NauthApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new NauthApi(configuration);

let permissionId: number; // (optional) (default to undefined)
let userId: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiNauthAddUserPermissionGet(permissionId, userId);
```

### Parameters

| Name             | Type         | Description | Notes                            |
| ---------------- | ------------ | ----------- | -------------------------------- |
| **permissionId** | [**number**] |             | (optional) defaults to undefined |
| **userId**       | [**number**] |             | (optional) defaults to undefined |

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

# **apiNauthDecodeAuthTokenGet**

> FullSessionDTOResponseWrapper apiNauthDecodeAuthTokenGet()

### Example

```typescript
import { NauthApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new NauthApi(configuration);

let token: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiNauthDecodeAuthTokenGet(token);
```

### Parameters

| Name      | Type         | Description | Notes                            |
| --------- | ------------ | ----------- | -------------------------------- |
| **token** | [**string**] |             | (optional) defaults to undefined |

### Return type

**FullSessionDTOResponseWrapper**

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

# **apiNauthRemoveUserPermissionGet**

> UserDTOResponseWrapper apiNauthRemoveUserPermissionGet()

### Example

```typescript
import { NauthApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new NauthApi(configuration);

let permissionId: number; // (optional) (default to undefined)
let userId: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiNauthRemoveUserPermissionGet(permissionId, userId);
```

### Parameters

| Name             | Type         | Description | Notes                            |
| ---------------- | ------------ | ----------- | -------------------------------- |
| **permissionId** | [**number**] |             | (optional) defaults to undefined |
| **userId**       | [**number**] |             | (optional) defaults to undefined |

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
