#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")"

docker compose up -d --build --force-recreate backend postgres unigelogin unigeapi duckdns caddy
docker compose run --rm --build database-data
docker system prune -af
