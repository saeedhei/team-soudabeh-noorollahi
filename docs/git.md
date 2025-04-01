# Git Command Cheat Sheet

## 🛠️ Setup & Configuration

```bash
# Initialize a new repository
git init

# Configure user information
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Connect to remote repository
git remote add origin https://github.com/YourUsername/YourRepo.git
```

---

## 📦 Basic Workflow

```bash
# Check the status of the repository
git status

# Stage changes
git add filename.txt  # Specific file
git add .              # All changes

# Commit staged changes
git commit -m "Commit message"

# Push changes to remote repository
git push origin main
```

---

## 🌿 Branch Management

```bash
# Create a new branch
git branch new-feature

# Switch to the new branch
git checkout new-feature

# Create and switch to a new branch (combined)
git checkout -b new-feature

# List all branches
git branch -a

# Switch to another branch (e.g., main)
git checkout main

# Merge a branch into the current branch
git merge new-feature

# Delete a branch locally
git branch -d new-feature
```

---

## 🔄 Synchronization

```bash
# Fetch the latest changes from the remote repository
git pull origin main

# Push local changes to the remote repository
git push origin main

# Force sync (caution: can overwrite local changes)
git fetch origin
git reset --hard origin/main
```

---

## ⏪ Undoing Changes

```bash
# Unstage a file
git reset filename.txt

# Undo the last commit (but keep changes)
git reset --soft HEAD~1

# Discard local changes (revert file to the last commit)
git checkout -- filename.txt

# Discard all local changes (dangerous!)
git reset --hard
```

---

## 🔍 Inspection

```bash
# View commit history (one line per commit)
git log --oneline

# Check remote repository connections
git remote -v

# See what has changed in the working directory
git diff
```

---

## 🧹 Cleanup

```bash
# Remove untracked files (caution!)
git clean -fd

# Remove a file from git tracking (but keep locally)
git rm --cached filename.txt
```

---

## Git Sync Commands

### 🔄 Basic Sync

```bash
# Pull the latest changes from the main branch
git pull origin main
```

### 🔥 Force Sync (Dangerous - Overwrites Local Changes)

```bash
git fetch origin
git reset --hard origin/main
git clean -fd  # Removes untracked files
```

### 🌿 Sync Feature Branch

```bash
git checkout your-branch
git fetch origin
git rebase origin/main  # Rebase instead of merge for a cleaner history
git push -f origin your-branch  # Force push after rebase
```

### ✅ Verify Sync Status

```bash
git status
git log --oneline -n 3  # Show last 3 commits
```

---

## 🚨 Emergency

```bash
# Abort a merge operation
git merge --abort

# Abort a rebase operation
git rebase --abort

# Reset the working directory to the state of the last commit
git reset --merge
```

---

> **Important:** Always `fetch` before syncing to avoid conflicts.
> Use `-f` and `--hard` commands with caution, as they can **overwrite local changes** permanently.
> If unsure, make a backup branch before performing dangerous operations like force-pushing.

```
