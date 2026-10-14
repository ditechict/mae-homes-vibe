#!/usr/bin/env bash
set -euo pipefail

# scripts/deploy-codespace.sh
# Build locally inside Codespaces and deploy to cPanel via SSH+rsync.

if [ -z "${SSH_PRIVATE_KEY:-}" ] || [ -z "${REMOTE_USER:-}" ] || [ -z "${REMOTE_HOST:-}" ] || [ -z "${REMOTE_PATH:-}" ]; then
  echo "One or more required environment variables are missing."
  echo "Set SSH_PRIVATE_KEY, REMOTE_USER, REMOTE_HOST, REMOTE_PATH as Codespaces secrets or environment variables."
  exit 1
fi

echo "Preparing SSH key..."
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Write key
printf '%s' "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

# Start ssh-agent and add key
if ! pgrep -u "$USER" ssh-agent >/dev/null 2>&1; then
  eval "$(ssh-agent -s)"
fi
ssh-add ~/.ssh/id_rsa >/dev/null

# Ensure rsync is installed
if ! command -v rsync >/dev/null 2>&1; then
  echo "rsync not found — attempting to install (requires sudo)..."
  sudo apt-get update && sudo apt-get install -y rsync || true
fi

# Build the project
echo "Installing dependencies..."
npm ci --no-audit --prefer-offline || true

echo "Building project..."
npm run build

# Ensure remote path exists
SSH_OPTS='-o StrictHostKeyChecking=no -o UserKnownHostsFile=/tmp/known_hosts'

echo "Ensuring remote path exists: ${REMOTE_PATH}"
ssh $SSH_OPTS "${REMOTE_USER}@${REMOTE_HOST}" "mkdir -p '${REMOTE_PATH}' && chmod 755 '${REMOTE_PATH}'"

# Sync dist/ to remote
echo "Syncing dist/ -> ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}"
rsync -az --delete --exclude='.git' dist/ "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}"

echo "Deployment finished."
