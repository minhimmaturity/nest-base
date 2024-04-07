if [ -z "$1" ]; then
    echo "Usage: npm run generate [module-name]"
    exit 1
fi

SCRIPT_DIR="$( cd -P "$( dirname "$0" )" && pwd )"
node $SCRIPT_DIR/generate.js create-nestjs-module __module__=$1 __ts__=ts