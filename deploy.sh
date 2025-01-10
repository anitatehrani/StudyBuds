#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")"

docker compose up -d --build --force-recreate backend postgres unigelogin unigeapi database-data duckdns caddy
docker system prune -af
