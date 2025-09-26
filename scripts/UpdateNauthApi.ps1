# PI.ps1
Invoke-WebRequest -URI "http://localhost:5035/swagger/v1/swagger.yaml" -OutFile ./Nauth.yaml

yarn openapi-generator-cli generate -i Nauth.yaml -g typescript-fetch -o .\src\API\NauthApi_gen --additional-properties=useBigIntForInt64=true
