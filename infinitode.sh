#!/usr/bin/env bash
# Infinitode 2 (Mac App Store / iOS-on-Mac) helper
# ✅ Fixed for your setup: REAL saves are in Data/Library/local/saves (progress.sav etc.)
#
# Usage:
#   ./infinitode2.sh <SAVE_NAME>   # toggle backup/restore by that name
#   ./infinitode2.sh start
#   ./infinitode2.sh delete
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
sanitize_name() {
  local raw="${1:-}"
  local safe
  safe="$(echo "$raw" | tr -cs '[:alnum:]_.-' '-' | sed 's/^-\\+//;s/-\\+$//' || true)"
  echo "$safe"
}

named_backup_path() {
  local raw_name="${1:-}"
  local safe
  safe="$(sanitize_name "$raw_name")"
  [[ -n "$safe" ]] || die "Provided name '$raw_name' is empty after sanitizing."
  mkdir -p "$BACKUP_ROOT"
  echo "$BACKUP_ROOT/$safe"
}

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
  if [[ ! -d "$BACKUP_ROOT" ]]; then
    echo "No backups yet ($BACKUP_ROOT)."
    return 0
  fi

  local found=0
  for dir in "$BACKUP_ROOT"/*; do
    [[ -d "$dir" ]] || continue
    found=1
    echo "$(basename "$dir")"
  done

  if [[ $found -eq 0 ]]; then
    echo "No backups yet ($BACKUP_ROOT)."
  fi
}

create_named_backup() {
  local label="$1"
  local dest="$2"

  require_not_running
  validate_paths

  [[ ! -e "$dest" ]] || die "Backup '$label' already exists (refusing to overwrite)."

  echo "Creating backup '$label':"
  echo "  From: $LOCAL_ROOT"
  echo "  To:   $dest"

  cp -a "$LOCAL_ROOT" "$dest"

  echo "OK. Backup created."
  [[ -f "$dest/saves/progress.sav" ]] && ls -lh "$dest/saves/progress.sav" | sed "s|$HOME|~|"
}

restore_named_backup() {
  local label="$1"
  local src="$2"

  require_not_running

  [[ -d "$src" ]] || die "Backup '$label' not found at: $src"
  [[ -d "$src/saves" ]] || die "Backup '$label' is missing a saves directory."
  [[ -f "$src/saves/progress.sav" ]] || echo "WARN: $src/saves/progress.sav not found (restore may still work)."

  validate_paths

  echo "Restoring backup '$label':"
  echo "  From: $src"
  echo "  To:   $LOCAL_ROOT"

  local prev="${LOCAL_ROOT}.before-restore-$TIMESTAMP"
  echo "Moving current local aside to:"
  echo "  $prev"
  mv "$LOCAL_ROOT" "$prev"

  mkdir -p "$(dirname "$LOCAL_ROOT")"
  cp -a "$src" "$LOCAL_ROOT"

  echo "OK. Restore complete."
  echo "Launching the game..."
  start_game
}

toggle_backup_for_name() {
  local raw_name="$1"
  local path
  path="$(named_backup_path "$raw_name")"

  if [[ -d "$path" ]]; then
    restore_named_backup "$raw_name" "$path"
  else
    create_named_backup "$raw_name" "$path"
  fi
}

delete_saves() {
  require_not_running
  validate_paths

  local tomb="$SAVES_DIR.deleted-$TIMESTAMP"
  echo "Purging saves by moving current saves to:"
  echo "  $tomb"
  mv "$SAVES_DIR" "$tomb"
  mkdir -p "$SAVES_DIR"
  echo "Done. Old saves preserved at: $tomb"
}

usage() {
  cat <<EOF
Usage:
  $(basename "$0") <SAVE_NAME>
  $(basename "$0") start
  $(basename "$0") delete
  $(basename "$0") list
  $(basename "$0") status

<SAVE_NAME> behavior:
  - If no backup exists for that name, capture the current saves.
  - If it already exists, restore it (after moving current saves aside).

Defaults:
  CONTAINER_ID=$CONTAINER_ID
  BACKUP_ROOT=$BACKUP_ROOT

Examples:
  $(basename "$0") boss-prep          # creates named backup if missing, otherwise restores it
  $(basename "$0") status
  $(basename "$0") list
  $(basename "$0") delete             # purge saves (moves old saves aside)
EOF
}

cmd="${1:-}"
case "$cmd" in
  start)   start_game ;;
  delete)  delete_saves ;;
  list)    list_backups ;;
  status)  status ;;
  ""|-h|--help|help) usage ;;
  *) toggle_backup_for_name "$cmd" ;;
esac
