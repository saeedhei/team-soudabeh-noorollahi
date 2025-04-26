# 🔄 How to Sync Your Forked Repository with the Original Repository

This guide explains how to sync your local and remote `main` branch with the original repository (`upstream`), completely replacing your code with the latest version from the original source.

---

## ✅ Step-by-Step Instructions

### 1. Add the upstream repository (if not already added)

```bash
git remote add upstream https://github.com/saeedhei/team-soudabeh-noorollahi.git
```

> If you get an error like `remote upstream already exists`, skip this step or use:
> `git remote set-url upstream https://github.com/saeedhei/team-soudabeh-noorollahi.git`

---

### 2. Fetch the latest changes from the upstream repository

```bash
git fetch upstream
```

---

### 3. Reset your local main branch to match upstream/main

⚠️ **Warning**: This will delete all local changes in your `main` branch!

```bash
git reset --hard upstream/main
```

---

### 4. Push the updated main branch to your GitHub repository

Because this resets your commit history, you must force-push:

```bash
git push origin main --force
```

---

## ✅ Result

Your GitHub repository and local project will now exactly match the original repository (`upstream/main`).

---

## 📌 Tip

If you want to keep your changes, create a backup branch **before** resetting:

```bash
git checkout -b my-backup
```

---

## ⚠️ Important Note

When you use `git reset --hard upstream/main`, **all files** in your local project will be replaced to exactly match the original repository:

- Files that exist only in your project (not in the original) will be **deleted**.
- Files that exist only in the original repo will be **added**.
- Files that exist in both but have differences will be **overwritten** by the original.

If you only want to bring in the changes (without deleting your local work), use `git merge upstream/main` instead of `reset --hard`.
