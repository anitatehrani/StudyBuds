#!/ussr/bin/env bash

set -euo pipefail

echo "$(date '+%F'),$(gh project item-list --format json --owner orangecorporation 1 -L 5000 | jq -f filter.jq)" >> "$INPUT"
cat $INPUT
echo ". + {data: {url: \"$(basename "$INPUT")\", format: \"csv\"}}"
cat plot.yml
yq '.' -ojson plot.yml | jq ". + {data: {url: \"$(basename "$INPUT")\", format: \"csv\"}}" | vl2svg -b "file://$(dirname "$INPUT")" > "$OUTPUT"

echo "DONE"
