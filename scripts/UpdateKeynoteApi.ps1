# PI.ps1
Invoke-WebRequest -URI "http://localhost:5000/swagger/v1/swagger.yaml" -OutFile ./Keynote.yaml

yarn openapi-generator-cli generate -i Keynote.yaml -g typescript-fetch -o .\src\API\KEYNOTE\KeynoteApi_gen --additional-properties=useBigIntForInt64=true
