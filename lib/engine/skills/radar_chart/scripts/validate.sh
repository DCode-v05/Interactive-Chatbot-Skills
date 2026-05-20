#!/usr/bin/env bash
# Validate this skill's example widget against the shared structural rules.
# Cross-platform: bash, Git Bash on Windows, WSL. From PowerShell on Windows:
#   bash scripts/validate.sh
set -e
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
REPO_ROOT="$(cd "$SKILL_DIR/../../../.." && pwd)"
exec npx --prefix "$REPO_ROOT" tsx "$REPO_ROOT/eval/validate-skill.ts" "$SKILL_DIR"
