# DecodedEmailActionDTO

## Properties

| Name          | Type                                      | Description | Notes                             |
| ------------- | ----------------------------------------- | ----------- | --------------------------------- |
| **id**        | **number**                                |             | [optional] [default to undefined] |
| **user**      | [**UserBasicDTO**](UserBasicDTO.md)       |             | [optional] [default to undefined] |
| **data**      | **string**                                |             | [optional] [default to undefined] |
| **type**      | [**EmailActionType**](EmailActionType.md) |             | [optional] [default to undefined] |
| **expiresAt** | **string**                                |             | [optional] [default to undefined] |
| **createdAt** | **string**                                |             | [optional] [default to undefined] |

## Example

```typescript
import { DecodedEmailActionDTO } from "./api";

const instance: DecodedEmailActionDTO = {
  id,
  user,
  data,
  type,
  expiresAt,
  createdAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
