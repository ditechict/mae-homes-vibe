# Codespaces Agent Guide — cPanel deploy

This file contains everything a Codespace Copilot agent (or a developer inside Codespaces) needs to build and deploy this repository to a cPanel server without using a local machine.

Prerequisites
- Add the following repository or Codespaces secrets (Repository Settings → Codespaces → Secrets or Organization/Repo Codespaces secrets):
  - SSH_PRIVATE_KEY — the private SSH key (PEM/openssh) matching the public key added to cPanel (no passphrase) 
  - REMOTE_USER — remote SSH username (often the same as cPanel user) or user@host format
  - REMOTE_HOST — remote host (example: cp.example.com)
  - REMOTE_PATH — absolute path on the server to deploy to (example: /home/mckijbol/repositories/mae-home/public_html)

How to use (interactive Codespaces)
1. Open the repository in a GitHub Codespace.
2. Ensure the devcontainer has finished provisioning (if using .devcontainer/). If not using devcontainer, ensure rsync and ssh client are installed in the Codespace container.
3. From the Codespace terminal run:
   - chmod +x scripts/deploy-codespace.sh
   - ./scripts/deploy-codespace.sh

What the script does
- Writes the SSH_PRIVATE_KEY to ~/.ssh/id_rsa (securely in the Codespace) and loads it into ssh-agent.
- Runs npm ci and npm run build to create the dist/ output.
- Ensures the remote directory exists and has correct permissions.
- rsyncs dist/ contents to REMOTE_USER@REMOTE_HOST:REMOTE_PATH (deletes extra files on remote to mirror dist/).

Notes and security
- Store SSH_PRIVATE_KEY in Codespaces secrets, not in the repository. Codespaces secrets are encrypted and only available to Codespaces environments.
- The script disables strict host key checking for convenience. For production, add the remote host to known_hosts instead.
- The deploy uses --delete; remove that flag if you prefer not to automatically delete remote files.

Automation
- You can run the same script manually, or wire it into a Codespaces task or VS Code command palette (a tasks.json is provided).
