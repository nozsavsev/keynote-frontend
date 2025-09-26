# EmailActionDTO

## Properties

| Name          | Type                                      | Description | Notes                             |
| ------------- | ----------------------------------------- | ----------- | --------------------------------- |
| **id**        | **number**                                |             | [optional] [default to undefined] |
| **userId**    | **number**                                |             | [optional] [default to undefined] |
| **data**      | **string**                                |             | [optional] [default to undefined] |
| **type**      | [**EmailActionType**](EmailActionType.md) |             | [optional] [default to undefined] |
| **expiresAt** | **string**                                |             | [optional] [default to undefined] |
| **createdAt** | **string**                                |             | [optional] [default to undefined] |

## Example

```typescript
import { EmailActionDTO } from "./api";

const instance: EmailActionDTO = {
  id,
  userId,
  data,
  type,
  expiresAt,
  createdAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
