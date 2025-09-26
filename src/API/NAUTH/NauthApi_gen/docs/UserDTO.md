# UserDTO

## Properties

| Name                     | Type                                                       | Description | Notes                             |
| ------------------------ | ---------------------------------------------------------- | ----------- | --------------------------------- |
| **id**                   | **number**                                                 |             | [optional] [default to undefined] |
| **name**                 | **string**                                                 |             | [optional] [default to undefined] |
| **email**                | **string**                                                 |             | [optional] [default to undefined] |
| **isEmailVerified**      | **boolean**                                                |             | [optional] [default to undefined] |
| **createdAt**            | **string**                                                 |             | [optional] [default to undefined] |
| **emailActions**         | [**Array&lt;EmailActionDTO&gt;**](EmailActionDTO.md)       |             | [optional] [default to undefined] |
| **sessions**             | [**Array&lt;SessionDTO&gt;**](SessionDTO.md)               |             | [optional] [default to undefined] |
| **permissions**          | [**Array&lt;UserPermissionDTO&gt;**](UserPermissionDTO.md) |             | [optional] [default to undefined] |
| **services**             | [**Array&lt;ServiceDTO&gt;**](ServiceDTO.md)               |             | [optional] [default to undefined] |
| **twoFactorAuthEntries** | [**Array&lt;Model2FAEntryDTO&gt;**](Model2FAEntryDTO.md)   |             | [optional] [default to undefined] |

## Example

```typescript
import { UserDTO } from "./api";

const instance: UserDTO = {
  id,
  name,
  email,
  isEmailVerified,
  createdAt,
  emailActions,
  sessions,
  permissions,
  services,
  twoFactorAuthEntries,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
