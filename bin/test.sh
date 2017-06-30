#!/bin/sh
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

sh $DIR/build.sh
$DIR/../node_modules/mocha/bin/mocha