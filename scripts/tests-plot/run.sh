#!/usr/bin/env bash

set -euo pipefail

total="$(pnpm exec cucumber-js --require-module ts-node/register --require 'steps/*.ts' -f summary | tail -n 3 | head -n 1 | cut -d' ' -f1)"
passed="$(pnpm exec cucumber-js --require-module ts-node/register --require 'steps/*.ts' -f summary | tail -n 3 | head -n 1 | grep -o '[0-9]\+ passed')"
