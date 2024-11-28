#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail

PWD="$(dirname "$(readlink -f -- "$0")")"

CHANNEL=""
VERSION=""

function help() {
  local to
  to="$1"

  echo "Usage: $0 <flags>" 1>&"$to"
  echo 1>&"$to"
  echo "flags:" 1>&"$to"
  echo "	--version                                            release version." 1>&"$to"
  echo "	--dist                                               path to store artifacts in." 1>&"$to"
  echo "	--channel                                            the channel to use for the release (release | nightly)." 1>&"$to"
  echo "	--help                                               display this message." 1>&"$to"
}

function error() {
  echo "error: $*" 1>&2
  echo 1>&2
  help 2
  exit 1
}

function info() {
  echo "$@"
}

CONFIG_PATH=""
DIST="release"

function tauri() {
  (cd "$PWD/.." && pnpm dlx @tauri-apps/cli "$@")
}

while [[ $# -gt 0 ]]; do
  case "$1" in
  --help)
    help 1
    exit 1
    ;;
  --version)
    VERSION="$2"
    shift
    shift
    ;;
  --dist)
    DIST="$2"
    shift
    shift
    ;;
  --channel)
    CHANNEL="$2"
    shift
    shift
    ;;
  *)
    error "unknown flag $1"
    ;;
  esac
done

[ -z "${VERSION-}" ] && error "--version is not set"

if [ "$CHANNEL" != "release" ] && [ "$CHANNEL" != "dev" ]; then
  error "--channel must be either 'release' or 'dev'"
fi

info "building:"
info "	channel: $CHANNEL"
info "	version: $VERSION"
info "	dist: $DIST"

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' exit

if [ "$CHANNEL" == "release" ]; then
  CONFIG_PATH=$(readlink -f "$PWD/../crates/seminar-assess-tauri/tauri.conf.release.json")
else
  CONFIG_PATH=$(readlink -f "$PWD/../crates/seminar-assess-tauri/tauri.conf.json")
fi

jq '.version="'"$VERSION"'"' "$CONFIG_PATH" >"$TMP_DIR/tauri.conf.json"

tauri android build \
  --apk \
  --config "$TMP_DIR/tauri.conf.json"

BUNDLE_DIR=$(readlink -f "$PWD/../crates/seminar-assess-tauri/gen/android/app/build/outputs/")
RELEASE_DIR="$DIST/android"
mkdir -p "$RELEASE_DIR"

APKS="$(find "$BUNDLE_DIR/apk" -name "*release.apk")"
if [ -n "$APKS" ]; then
  for APK in $APKS; do
    cp "$APK" "$RELEASE_DIR"
    info "built:"
    info "	- $RELEASE_DIR/$(basename "$APK")"
  done
else
  error "No APKs found in $BUNDLE_DIR"
fi
