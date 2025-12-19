#!/usr/bin/env bash
# Infinitode 2 (Mac App Store / iOS-on-Mac) helper
# ✅ Fixed for your setup: REAL saves are in Data/Library/local/saves (progress.sav etc.)
#
# Usage:
#   ./infinitode2.sh start
#   ./infinitode2.sh backup
#   ./infinitode2.sh restore [PATH_TO_BACKUP_DIR]
#   ./infinitode2.sh list
#   ./infinitode2.sh status
#
# Optional env vars:
#   CONTAINER_ID="C4C8FD65-14E4-475B-8E6D-5B99F2EE91A1"
#   BACKUP_ROOT="$HOME/Desktop/Infinitode2-saves"

set -euo pipefail

APP_NAME="Infinitode 2"
CONTAINER_ID="${CONTAINER_ID:-C4C8FD65-14E4-475B-8E6D-5B99F2EE91A1}"
DATA_ROOT="$HOME/Library/Containers/$CONTAINER_ID/Data"

# ✅ Confirmed by your mtime diff: the game updates Data/Library/local/saves/progress.sav
LOCAL_ROOT="$DATA_ROOT/Library/local"
SAVES_DIR="$LOCAL_ROOT/saves"

BACKUP_ROOT="${BACKUP_ROOT:-$HOME/Desktop/Infinitode2-saves}"
TIMESTAMP="$(date +"%Y%m%d-%H%M%S")"

die() { echo "ERROR: $*" >&2; exit 1; }

is_running() {
  pgrep -f "$APP_NAME" >/dev/null 2>&1
}

require_not_running() {
  if is_running; then
    die "Quit $APP_NAME before this operation (backup/restore while running may be ignored/overwritten)."
  fi
}

start_game() {
  echo "Starting: $APP_NAME"
  open -a "$APP_NAME"
}

validate_paths() {
  [[ -d "$DATA_ROOT" ]] || die "Container Data directory not found: $DATA_ROOT"
  [[ -d "$LOCAL_ROOT" ]] || die "Expected local data directory not found: $LOCAL_ROOT (launch the game once, then try again)"
  [[ -d "$SAVES_DIR" ]] || die "Expected saves directory not found: $SAVES_DIR (launch the game once, then try again)"
  [[ -f "$SAVES_DIR/progress.sav" ]] || echo "WARN: $SAVES_DIR/progress.sav not found yet (maybe no progress, or game hasn't created it yet)."
}

status() {
  echo "App:        $APP_NAME"
  echo "Container:  $CONTAINER_ID"
  echo "Data root:  $DATA_ROOT"
  echo "Local root: $LOCAL_ROOT"
  echo "Saves dir:  $SAVES_DIR"
  echo "Backups:    $BACKUP_ROOT"
  echo -n "Running:    "
  if is_running; then echo "yes"; else echo "no"; fi

  if [[ -d "$SAVES_DIR" ]]; then
    echo
    echo "Save files (most important first):"
    for f in "$SAVES_DIR/progress.sav" "$SAVES_DIR/settings.sav" "$SAVES_DIR/issued-items-log.json"; do
      [[ -e "$f" ]] && ls -lh "$f" | sed "s|$HOME|~|"
    done
    [[ -d "$SAVES_DIR/replays" ]] && echo "Replays: $(find "$SAVES_DIR/replays" -type f 2>/dev/null | wc -l | tr -d ' ') files"
  else
    echo
    echo "Saves directory not found yet. Launch the game once, then run:"
    echo "  $0 status"
  fi
}

list_backups() {
  [[ -d "$BACKUP_ROOT" ]] || die "No backup root found: $BACKUP_ROOT"
  ls -1dt "$BACKUP_ROOT"/local-* 2>/dev/null | sed "s|$HOME|~|" || true
}

backup() {
  require_not_running
  validate_paths

  mkdir -p "$BACKUP_ROOT"
  local dest="$BACKUP_ROOT/local-$TIMESTAMP"

  echo "Creating backup:"
  echo "  From: $LOCAL_ROOT"
  echo "  To:   $dest"

  # Copy the whole LOCAL_ROOT (contains saves/, cache/, levels/, i18n/, logs)
  cp -a "$LOCAL_ROOT" "$dest"

  echo "OK. Backup created."
  echo "  Key file:"
  [[ -f "$dest/saves/progress.sav" ]] && ls -lh "$dest/saves/progress.sav" | sed "s|$HOME|~|"
  echo
  echo "Tip: list backups with:"
  echo "  $0 list"
}

latest_backup_dir() {
  [[ -d "$BACKUP_ROOT" ]] || die "No backup root found: $BACKUP_ROOT"
  local latest
  latest="$(ls -1dt "$BACKUP_ROOT"/local-* 2>/dev/null | head -n 1 || true)"
  [[ -n "${latest:-}" ]] || die "No backups found in: $BACKUP_ROOT"
  echo "$latest"
}

restore() {
  require_not_running
  local src="${1:-}"
  if [[ -z "$src" ]]; then
    src="$(latest_backup_dir)"
  fi

  [[ -d "$src" ]] || die "Backup dir not found: $src"
  [[ -d "$src/saves" ]] || die "Backup does not look valid (missing $src/saves)."
  [[ -f "$src/saves/progress.sav" ]] || echo "WARN: $src/saves/progress.sav not found (restore may still work, but it's unusual)."

  validate_paths

  echo "Restoring backup:"
  echo "  From: $src"
  echo "  To:   $LOCAL_ROOT"

  # Safety: move current local aside
  local prev="${LOCAL_ROOT}.before-restore-$TIMESTAMP"
  echo "Moving current local aside to:"
  echo "  $prev"
  mv "$LOCAL_ROOT" "$prev"

  # Restore
  mkdir -p "$(dirname "$LOCAL_ROOT")"
  cp -a "$src" "$LOCAL_ROOT"

  echo "OK. Restore complete."
  echo "Launching the game..."
  start_game
}

usage() {
  cat <<EOF
Usage:
  $(basename "$0") start
  $(basename "$0") backup
  $(basename "$0") restore [PATH_TO_BACKUP_DIR]
  $(basename "$0") list
  $(basename "$0") status

Defaults:
  CONTAINER_ID=$CONTAINER_ID
  BACKUP_ROOT=$BACKUP_ROOT

Examples:
  $(basename "$0") status
  $(basename "$0") backup
  $(basename "$0") list
  $(basename "$0") restore
  $(basename "$0") restore "$BACKUP_ROOT/local-20251219-173000"
EOF
}

cmd="${1:-}"
case "$cmd" in
  start)   start_game ;;
  backup)  backup ;;
  restore) restore "${2:-}" ;;
  list)    list_backups ;;
  status)  status ;;
  ""|-h|--help|help) usage ;;
  *) die "Unknown command: $cmd (use --help)" ;;
esac
