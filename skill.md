# cPanel Deployment Skill

This file describes a reusable workflow and helper scripts you can add to any repository to automatically build and deploy a static site (Vite, CRA, Next static export, etc.) to a cPanel account. It is written so you or an automation (CI) can run it whenever a new repository is added.

---

## Purpose
- Provide a single place with instructions, a GitHub Actions workflow, and a local deploy script so any repo can be deployed to cPanel with minimal setup.
- Prefer static build + rsync (build in CI or locally) — avoids running npm install on low-resource shared hosts.

---

## Prerequisites
1. cPanel account with SSH access enabled.
2. A directory on the cPanel account that will be the web root for the site (example: `/home/mckijbol/public_html/mae-home` or `/home/mckijbol/repositories/mae-home/public_html`).
3. An SSH keypair for CI (private key stored as GitHub secret, public key added in cPanel → SSH Access → Manage SSH Keys).
4. GitHub repository secrets (for the CI workflow):
   - SSH_PRIVATE_KEY — the private SSH key (multi-line). Use the public key added to cPanel.
   - REMOTE_USER — the cPanel account username (or user@host login user if different).
   - REMOTE_HOST — hostname or IP of the server (example: cp.example.com).
   - REMOTE_PATH — full absolute path to the target folder on the cPanel account (example: /home/mckijbol/public_html/mae-home)

---

## Recommended approach (one-time setup)
1. Create or confirm the target directory on cPanel (either make it the domain document root or create an addon domain/subdomain pointing to it).
2. Add the public SSH key used by CI to cPanel (SSH Access).
3. Add the private SSH key and other values as GitHub repository secrets.
4. Copy this file (skill.md) into new repositories or include the Actions workflow file below.

---

## GitHub Actions workflow (copy to .github/workflows/deploy-to-cpanel.yml)
This workflow builds the project and uses rsync over SSH to upload the build artifacts to the remote path.

```yaml
name: Build and Deploy to cPanel
on:
  push:
    branches: [ main ]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Start SSH agent
        uses: webfactory/ssh-agent@v0.8.1
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

      - name: Ensure remote path exists
        run: ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} "mkdir -p ${REMOTE_PATH} && chmod 755 ${REMOTE_PATH}"
        env:
          REMOTE_USER: ${{ secrets.REMOTE_USER }}
          REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
          REMOTE_PATH: ${{ secrets.REMOTE_PATH }}

      - name: Sync dist/ to remote
        run: |
          rsync -az --delete --exclude='.git' dist/ ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}
        env:
          REMOTE_USER: ${{ secrets.REMOTE_USER }}
          REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
          REMOTE_PATH: ${{ secrets.REMOTE_PATH }}
```

Notes:
- The `--delete` flag keeps the remote directory in sync with the artifact (removes old files). Remove it if you prefer not to delete.
- The workflow assumes `npm run build` writes to `dist/`. Adjust paths for other tools.

---

## Local deploy script (deploy.sh)
Place this in the repo root (chmod +x deploy.sh). It builds locally and uploads via rsync.

```bash
#!/usr/bin/env bash
set -euo pipefail

# Usage: ./deploy.sh user@host /remote/path
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 user@host /remote/path"
  exit 1
fi

REMOTE="$1"
REMOTE_PATH="$2"

echo "Installing dependencies..."
npm ci

echo "Building site..."
npm run build

echo "Syncing dist/ to ${REMOTE}:${REMOTE_PATH}"
rsync -az --delete dist/ "${REMOTE}:${REMOTE_PATH}"

echo "Done."
```

Example local usage:
- ./deploy.sh mckijbol@cp.example.com:/home/mckijbol/public_html/mae-home

---

## Alternative: push built files to a cPanel-managed Git repository (not recommended if you must not rewrite history)
- You can create an orphan `deploy` branch containing only the built files and push that branch to the cPanel Git repo. This avoids pushing build artifacts to your main source branch.

Example (one-time):

```bash
# from repo root
git checkout --orphan deploy
git --work-tree=dist add --all
git --work-tree=dist commit -m "Deploy built site"
# push deploy branch to cPanel remote named 'cpanel'
git push --force cpanel deploy:main
# return to main
git checkout -f main
git branch -D deploy
```

WARNING: force-pushing into a remote branch used by other services can rewrite history. AGENTS.md warns against rewriting published history — avoid force pushes to shared branches.

---

## .cpanel.yml vs. CI/local builds
- .cpanel.yml: instructs cPanel to run build tasks server-side after a git push to the cPanel-managed repo. It requires Node/npm available on the server and adequate resources.
- CI/local build + rsync: *recommended* for Vite apps on shared hosting since it avoids server-side npm installs and memory/time issues.

---

## Permissions & security
- Ensure files uploaded are owned by the cPanel user and permissions are directories 755, files 644.
- Do NOT copy node_modules into the web root.
- Keep private keys secret and rotate if needed.

---

## Automation: making this run for any new repo
- Copy this `skill.md` file and the workflow file into any new repository.
- Configure the repository secrets described above.
- For organizations: create a template repo containing these files so new projects inherit the deploy automation.

---

## Troubleshooting
- If the CI rsync fails with host key verification, ensure the SSH public key is installed in cPanel and the private key matches the secret.
- If npm ci fails in CI with memory errors, build locally and upload, or use a larger runner.
- If files upload but site returns 403/404, check file permissions and the domain/subdomain document root mapping in cPanel.

---

If you want, I can:
- Add the GitHub Actions workflow file to this repository at `.github/workflows/deploy-to-cpanel.yml`.
- Add `deploy.sh` to the repo and commit it with executable bit set.
- Create a repo template containing these files so every new repo starts with the same automation.

Tell me which of these (workflow, deploy.sh, template) you want me to add now; I can commit them to this repo.