#!/ussr/bin/env bash

set -euo pipefail

echo "$(date '+%F'),$(gh project item-list --format json --owner orangecorporation 1 -L 5000 | jq -f filter.jq)" >> sprint-data.csv
yq '. + {data: {url: "sprint-data.csv", format: "csv"}}' plot.yml | vl2svg -b "file://$(pwd)" > spint-plot.svg

