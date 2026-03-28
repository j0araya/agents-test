#!/usr/bin/env bash
# Usage:
#   ./docker.sh start:dev    — build & start with local MongoDB (detached)
#   ./docker.sh start:prod   — build & start pointing to Atlas (detached)
#   ./docker.sh stop         — stop all containers
#   ./docker.sh logs         — follow logs from all containers
#   ./docker.sh seed:dev     — seed local MongoDB (requires dev stack running)
#   ./docker.sh seed:prod    — seed MongoDB Atlas directly

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE="-f docker-compose.yml"
DEV="-f docker-compose.dev.yml"
PROD="-f docker-compose.prod.yml"

CMD="${1:-}"

_export_regions_json() {
  cd "$SCRIPT_DIR/backend"
  NODE_PATH=./node_modules node_modules/.bin/ts-node --project tsconfig.json -e \
    "import { regions } from './src/data/regions'; console.log(JSON.stringify(regions));" \
    2>/dev/null
}

_mongosh_upsert() {
  local json="$1"
  mongosh "$2" --quiet --eval "
    const data = JSON.parse('$json'.replace(/'/g, \"'\"));
    let n = 0;
    for (const r of data) {
      const { id, ...doc } = r;
      db.regions.updateOne({ slug: doc.slug }, { \\\$set: doc }, { upsert: true });
      n++;
    }
    print('Seeded ' + n + ' regions. Total:', db.regions.countDocuments());
  " 2>/dev/null
}

case "$CMD" in
  start:dev)
    echo "[docker] Starting dev stack (local MongoDB)..."
    docker compose $BASE $DEV up --build --remove-orphans -d
    echo "[docker] Dev stack running. Use './docker.sh logs' to follow logs."
    ;;
  start:prod)
    echo "[docker] Starting prod stack (MongoDB Atlas)..."
    docker compose $BASE $PROD up --build --remove-orphans -d
    echo "[docker] Prod stack running. Use './docker.sh logs' to follow logs."
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
  seed:dev)
    echo "[docker] Seeding local MongoDB via container..."
    cd "$SCRIPT_DIR/backend"
    NODE_PATH=./node_modules node_modules/.bin/ts-node --project tsconfig.json -e \
      "import { regions } from './src/data/regions'; console.log(JSON.stringify(regions));" \
      2>/dev/null > /tmp/regions_seed.json
    docker cp /tmp/regions_seed.json chile_atlas_mongo_dev:/tmp/regions.json
    docker exec chile_atlas_mongo_dev mongosh chile_atlas --quiet --eval "
      const data = JSON.parse(require('fs').readFileSync('/tmp/regions.json', 'utf8'));
      let n = 0;
      for (const r of data) {
        const { id, ...doc } = r;
        db.regions.updateOne({ slug: doc.slug }, { \$set: doc }, { upsert: true });
        n++;
      }
      print('Seeded ' + n + ' regions. Total in DB: ' + db.regions.countDocuments());
    "
    ;;
  seed:prod)
    echo "[docker] Seeding MongoDB Atlas..."
    cd "$SCRIPT_DIR/backend"
    MONGODB_URI="${MONGODB_URI:-$(grep MONGODB_URI .env.prod 2>/dev/null | cut -d= -f2-)}"
    if [ -z "$MONGODB_URI" ]; then
      echo "Error: MONGODB_URI not set. Export it or ensure backend/.env.prod exists."
      exit 1
    fi
    NODE_PATH=./node_modules MONGODB_URI="$MONGODB_URI" \
      node_modules/.bin/ts-node --project ../tsconfig.seed.json ../DB/seed.ts
    ;;
  *)
    echo "Usage: $0 {start:dev|start:prod|stop|logs|seed:dev|seed:prod}"
    exit 1
    ;;
esac
