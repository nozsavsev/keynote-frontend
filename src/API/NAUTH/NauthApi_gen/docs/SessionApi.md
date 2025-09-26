# SessionApi

All URIs are relative to _http://localhost_

| Method                                                      | HTTP request                      | Description |
| ----------------------------------------------------------- | --------------------------------- | ----------- |
| [**apiSessionGetMyGet**](#apisessiongetmyget)               | **GET** /api/Session/getMy        |             |
| [**apiSessionRevokeAllMyPost**](#apisessionrevokeallmypost) | **POST** /api/Session/revokeAllMy |             |
| [**apiSessionRevokePost**](#apisessionrevokepost)           | **POST** /api/Session/revoke      |             |

# **apiSessionGetMyGet**

> SessionDTOListResponseWrapper apiSessionGetMyGet()

### Example

```typescript
import { SessionApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new SessionApi(configuration);

const { status, data } = await apiInstance.apiSessionGetMyGet();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**SessionDTOListResponseWrapper**

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

# **apiSessionRevokeAllMyPost**

> StringResponseWrapper apiSessionRevokeAllMyPost()

### Example

```typescript
import { SessionApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new SessionApi(configuration);

const { status, data } = await apiInstance.apiSessionRevokeAllMyPost();
```

### Parameters

This endpoint does not have any parameters.

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

# **apiSessionRevokePost**

> StringResponseWrapper apiSessionRevokePost()

### Example

```typescript
import { SessionApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new SessionApi(configuration);

let sessionId: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiSessionRevokePost(sessionId);
```

### Parameters

| Name          | Type         | Description | Notes                            |
| ------------- | ------------ | ----------- | -------------------------------- |
| **sessionId** | [**number**] |             | (optional) defaults to undefined |

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
