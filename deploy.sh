#!/bin/bash

set -eu -o pipefail

if [ -z "${RESOURCE_GROUP:-}" ]; then
    echo "set RESOURCE_GROUP variable" && exit 1
fi

REGION=northeurope

APP_NAME="$RESOURCE_GROUP-functions-js"

az group create --name "$RESOURCE_GROUP" --location "$REGION"
az storage account create --name "$RESOURCE_GROUP" --location "$REGION" --resource-group "$RESOURCE_GROUP" --sku Standard_LRS
az functionapp create --resource-group "$RESOURCE_GROUP" --consumption-plan-location="$REGION" --runtime node \
    --runtime-version 18 --functions-version 4 --name "$APP_NAME" --storage-account "$RESOURCE_GROUP"
func azure functionapp publish "$APP_NAME"

az functionapp config appsettings set --name "$APP_NAME" \
--resource-group "$RESOURCE_GROUP" \
--settings SCALE_CONTROLLER_LOGGING_ENABLED=AppInsights:Verbose