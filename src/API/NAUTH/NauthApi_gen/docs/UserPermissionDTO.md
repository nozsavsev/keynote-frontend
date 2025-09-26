# UserPermissionDTO

## Properties

| Name             | Type                                            | Description | Notes                             |
| ---------------- | ----------------------------------------------- | ----------- | --------------------------------- |
| **id**           | **number**                                      |             | [optional] [default to undefined] |
| **permissionId** | **number**                                      |             | [optional] [default to undefined] |
| **userId**       | **number**                                      |             | [optional] [default to undefined] |
| **createdAt**    | **string**                                      |             | [optional] [default to undefined] |
| **permission**   | [**PermissionBasicDTO**](PermissionBasicDTO.md) |             | [optional] [default to undefined] |

## Example

```typescript
import { UserPermissionDTO } from "./api";

const instance: UserPermissionDTO = {
  id,
  permissionId,
  userId,
  createdAt,
  permission,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
