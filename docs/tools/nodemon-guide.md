# Using Nodemon in Your Project

Nodemon is a development tool that automatically restarts your Node.js application whenever file changes are detected in the directory. It's especially useful for backend development with Node.js.

---

## ✅ Installation

Nodemon should be installed as a development dependency. If you haven't installed it yet, run:

```bash
npm install --save-dev nodemon
```

---

## ✏️ Add a `dev` Script

In your `package.json` file, update the `scripts` section like this:

```json
"scripts": {
  "dev": "nodemon server.js"
}
```

> 🔁 Replace `server.js` with the entry file of your application if it's different.

---

## ▶️ Running Your App with Nodemon

To start your application in development mode:

```bash
npm run dev
```

Nodemon will now watch your files and automatically restart the server on any change.

---

## 🛠 Optional: Custom Configuration

Create a `nodemon.json` file in the root of your project for additional configuration:

```json
{
  "watch": ["."],
  "ext": "js,json,graphql",
  "ignore": ["node_modules"],
  "exec": "node index.js"
}
```

This allows more control over which files Nodemon watches and what command to execute.

---

## 🔁 Summary

- Nodemon helps in automatic server restarts on file changes.
- Add it to your project as a dev dependency.
- Use a custom script (`npm run dev`) to run your project with Nodemon.
- Optional: Customize behavior using `nodemon.json`.

---

Now you can develop more efficiently without restarting your server manually!
