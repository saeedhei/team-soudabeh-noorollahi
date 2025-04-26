# 📦 NPM Quick Guide for Everyday Use

## ✅ Basics

### Install All Dependencies

```bash
npm install
```

### Install a Package

```bash
npm install axios
```

### Install Dev Dependency

```bash
npm install eslint --save-dev
```

### Uninstall a Package

```bash
npm uninstall axios
```

### List Installed Packages

```bash
npm list --depth=0
```

### Update All Packages

```bash
npm update
```

### Check for Outdated Packages

```bash
npm outdated
```

---

## 🔄 Updating with `npm-check-updates`

### Install the tool globally:

```bash
npm install -g npm-check-updates
```

### Or run it directly without installing:

```bash
npx npm-check-updates -u
npm install
```

---

## 🛠️ Express App Generator

Create a new Express app with Pug view engine:

```bash
npx express-generator --view=pug seointro
cd seointro
npm install
```

Start the app with debug:

```bash
SET DEBUG=seointro:* & npm start
```

---

## 📂 Working with Node Versions (nvm)

### Install nvm for Windows

- Download from:  
  [https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)
- Install `nvm-setup.exe`

### Usage:

```bash
nvm list available
nvm install 16.20.0
nvm install 22.14.0
nvm use 22.14.0
node -v
```

### Use version from `.nvmrc` file:

```bash
echo 22.11.0 > .nvmrc
nvm use 22.11.0
```

---

## 📌 Advanced Tips

### List deep dependencies:

```bash
npm ls inflight glob
```

### Reset node_modules:

```bash
rm -rf node_modules
npm install
```

---

## 🧾 Git + NPM Workflow

```bash
git add .
git commit -m ".prettierignore added"
git push origin main
```

---

### ✅ Done!

You now have a powerful quick reference for npm, node, and project setup.
