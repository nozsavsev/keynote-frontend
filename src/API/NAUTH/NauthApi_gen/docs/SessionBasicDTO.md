# SessionBasicDTO

## Properties

| Name               | Type        | Description | Notes                             |
| ------------------ | ----------- | ----------- | --------------------------------- |
| **id**             | **number**  |             | [optional] [default to undefined] |
| **userId**         | **number**  |             | [optional] [default to undefined] |
| **serviceId**      | **number**  |             | [optional] [default to undefined] |
| **is2FAConfirmed** | **boolean** |             | [optional] [default to undefined] |
| **expiresAt**      | **string**  |             | [optional] [default to undefined] |
| **createdAt**      | **string**  |             | [optional] [default to undefined] |
| **ipAddress**      | **string**  |             | [optional] [default to undefined] |
| **device**         | **string**  |             | [optional] [default to undefined] |
| **browser**        | **string**  |             | [optional] [default to undefined] |
| **os**             | **string**  |             | [optional] [default to undefined] |

## Example

```typescript
import { SessionBasicDTO } from "./api";

const instance: SessionBasicDTO = {
  id,
  userId,
  serviceId,
  is2FAConfirmed,
  expiresAt,
  createdAt,
  ipAddress,
  device,
  browser,
  os,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
