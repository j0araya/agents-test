#!/usr/bin/env bash
# Usage:
#   ./docker.sh start:dev    — build & start with local MongoDB
#   ./docker.sh start:prod   — build & start pointing to Atlas
#   ./docker.sh stop         — stop all containers
#   ./docker.sh logs         — follow logs from all containers

set -euo pipefail

BASE="-f docker-compose.yml"
DEV="-f docker-compose.dev.yml"
PROD="-f docker-compose.prod.yml"

CMD="${1:-}"

case "$CMD" in
  start:dev)
    echo "[docker] Starting dev stack (local MongoDB)..."
    docker compose $BASE $DEV up --build --remove-orphans
    ;;
  start:prod)
    echo "[docker] Starting prod stack (MongoDB Atlas)..."
    docker compose $BASE $PROD up --build --remove-orphans
    ;;
  stop)
    echo "[docker] Stopping all containers..."
    docker compose $BASE $DEV down --remove-orphans 2>/dev/null || true
    docker compose $BASE $PROD down --remove-orphans 2>/dev/null || true
    ;;
  logs)
    echo "[docker] Following logs (Ctrl+C to exit)..."
    docker compose $BASE $DEV logs -f 2>/dev/null || docker compose $BASE $PROD logs -f
    ;;
  *)
    echo "Usage: $0 {start:dev|start:prod|stop|logs}"
    exit 1
    ;;
esac
