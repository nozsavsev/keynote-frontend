# ServiceApi

All URIs are relative to _http://localhost_

| Method                                                      | HTTP request                      | Description |
| ----------------------------------------------------------- | --------------------------------- | ----------- |
| [**apiServiceCreatePost**](#apiservicecreatepost)           | **POST** /api/Service/create      |             |
| [**apiServiceDeletePost**](#apiservicedeletepost)           | **POST** /api/Service/delete      |             |
| [**apiServiceGetAllGlobalGet**](#apiservicegetallglobalget) | **GET** /api/Service/getAllGlobal |             |
| [**apiServiceGetAllOwnedGet**](#apiservicegetallownedget)   | **GET** /api/Service/getAllOwned  |             |
| [**apiServiceUpdatePost**](#apiserviceupdatepost)           | **POST** /api/Service/update      |             |

# **apiServiceCreatePost**

> ServiceDTOResponseWrapper apiServiceCreatePost()

### Example

```typescript
import { ServiceApi, Configuration, CreateServiceDTO } from "./api";

const configuration = new Configuration();
const apiInstance = new ServiceApi(configuration);

let createServiceDTO: CreateServiceDTO; // (optional)

const { status, data } = await apiInstance.apiServiceCreatePost(createServiceDTO);
```

### Parameters

| Name                 | Type                 | Description | Notes |
| -------------------- | -------------------- | ----------- | ----- |
| **createServiceDTO** | **CreateServiceDTO** |             |       |

### Return type

**ServiceDTOResponseWrapper**

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

# **apiServiceDeletePost**

> StringResponseWrapper apiServiceDeletePost()

### Example

```typescript
import { ServiceApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new ServiceApi(configuration);

let id: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiServiceDeletePost(id);
```

### Parameters

| Name   | Type         | Description | Notes                            |
| ------ | ------------ | ----------- | -------------------------------- |
| **id** | [**number**] |             | (optional) defaults to undefined |

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

# **apiServiceGetAllGlobalGet**

> ServiceDTOListResponseWrapper apiServiceGetAllGlobalGet()

### Example

```typescript
import { ServiceApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new ServiceApi(configuration);

const { status, data } = await apiInstance.apiServiceGetAllGlobalGet();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**ServiceDTOListResponseWrapper**

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

# **apiServiceGetAllOwnedGet**

> ServiceDTOListResponseWrapper apiServiceGetAllOwnedGet()

### Example

```typescript
import { ServiceApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new ServiceApi(configuration);

const { status, data } = await apiInstance.apiServiceGetAllOwnedGet();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**ServiceDTOListResponseWrapper**

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

# **apiServiceUpdatePost**

> ServiceDTOResponseWrapper apiServiceUpdatePost()

### Example

```typescript
import { ServiceApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new ServiceApi(configuration);

let id: number; // (optional) (default to undefined)
let name: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiServiceUpdatePost(id, name);
```

### Parameters

| Name     | Type         | Description | Notes                            |
| -------- | ------------ | ----------- | -------------------------------- |
| **id**   | [**number**] |             | (optional) defaults to undefined |
| **name** | [**string**] |             | (optional) defaults to undefined |

### Return type

**ServiceDTOResponseWrapper**

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
