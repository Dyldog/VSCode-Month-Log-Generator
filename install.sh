#!/bin/bash

pushd "$(dirname "$0")"

rm ./*.vsix

vsce package

code --install-extension $(ls monthgenerator-*.vsix)

popd
