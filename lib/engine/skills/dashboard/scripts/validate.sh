#!/usr/bin/env bash
# Validate a dashboard widget JSON file before sending it to the host.
# Usage: bash validate.sh path/to/output.json
set -euo pipefail
if [ $# -ne 1 ]; then echo "Usage: bash validate.sh <path-to-json>" >&2; exit 1; fi
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
REPO_ROOT="$(cd "$SKILL_DIR/../../../.." && pwd)"
exec npx --prefix "$REPO_ROOT" tsx "$REPO_ROOT/eval/validate-skill-json.ts" dashboard "$1"
