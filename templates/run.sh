if [ -z "$1" ]; then
    echo "Usage: npm run generate [module-name]"
    exit 1
fi

SCRIPT_DIR="$( cd -P "$( dirname "$0" )" && pwd )"
node $SCRIPT_DIR/generate.js create-nestjs-module __module__=$1 __ts__=ts

# Define the file paths
APP_MODULE_FILE="src/app.module.ts"
MODULE_NAME=$1
IMPORT_LINE='import { '${MODULE_NAME^}'Module } from "./modules/'$MODULE_NAME'/'$MODULE_NAME'.module";'

# Check if import line already exists
if grep -q "\b${MODULE_NAME^}Module\b" "$APP_MODULE_FILE"; then
    echo "$1 import already exists in $APP_MODULE_FILE"
else
    sed -i '' -e "/imports/ a\\ \\ \\  ${MODULE_NAME^}Module," "$APP_MODULE_FILE"
    echo "${MODULE_NAME^}Module imported and added to the 'imports' array in $APP_MODULE_FILE"
fi

# Check if app module file exists
if [ ! -f "$APP_MODULE_FILE" ]; then
    echo "Error: $APP_MODULE_FILE does not exist."
    exit 1
fi

# Check if import line already exists
if grep -q "$IMPORT_LINE" "$APP_MODULE_FILE"; then
    echo "${MODULE_NAME^}Module import already exists in $APP_MODULE_FILE"
else
  # Add import line if not already present
  if ! grep -q "$IMPORT_LINE" "$APP_MODULE_FILE"; then
    echo "Adding import line to $APP_MODULE_FILE"
    sed -i '' -e "1i\\ $IMPORT_LINE\\" "$APP_MODULE_FILE"
  fi
fi

