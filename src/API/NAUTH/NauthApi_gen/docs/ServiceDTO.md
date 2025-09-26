# ServiceDTO

## Properties

| Name            | Type                                                         | Description | Notes                             |
| --------------- | ------------------------------------------------------------ | ----------- | --------------------------------- |
| **id**          | **number**                                                   |             | [optional] [default to undefined] |
| **name**        | **string**                                                   |             | [optional] [default to undefined] |
| **userId**      | **number**                                                   |             | [optional] [default to undefined] |
| **createdAt**   | **string**                                                   |             | [optional] [default to undefined] |
| **sessions**    | [**Array&lt;SessionBasicDTO&gt;**](SessionBasicDTO.md)       |             | [optional] [default to undefined] |
| **permissions** | [**Array&lt;PermissionBasicDTO&gt;**](PermissionBasicDTO.md) |             | [optional] [default to undefined] |

## Example

```typescript
import { ServiceDTO } from "./api";

const instance: ServiceDTO = {
  id,
  name,
  userId,
  createdAt,
  sessions,
  permissions,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
