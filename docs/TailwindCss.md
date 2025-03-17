# 🚀 Tailwind CSS v4 Installation Guide with Vite

Tailwind CSS is a **utility-first** framework for fast and flexible styling. This guide explains how to install and use it in a **Vite** project. It is simple yet professional and beginner-friendly. 😊

---

## 📌 1. Installing Tailwind CSS in a Vite Project

### 1️⃣ Install Tailwind and Vite Plugin

First, install `tailwindcss` and `@tailwindcss/vite`:

```sh
npm install tailwindcss @tailwindcss/vite
```

### 2️⃣ Configure the Vite Plugin

Add the `@tailwindcss/vite` plugin in the **vite.config.js** file:

```ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

### 3️⃣ Add Tailwind to CSS

In your main **styles.css** file, add the following line:

```css
@import "tailwindcss";
```

### 4️⃣ Run the Project

Start the development server by running:

```sh
npm run dev
```

---

## 🎨 2. Using Tailwind Classes in HTML

Now you can use Tailwind classes in HTML. Here’s a simple example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tailwind CSS Example</title>
    <link href="/src/styles.css" rel="stylesheet" />
  </head>
  <body class="flex items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-4xl font-bold text-blue-600">Hello, Tailwind! 🚀</h1>
  </body>
</html>
```

This code displays a **large blue text** centered on the page. 🎨

---

## 💡 3. A Creative Example: Profile Card

Let’s create a **user profile card** using Tailwind:

```html
<div
  class="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10 p-6"
>
  <div class="flex items-center space-x-4">
    <img
      class="w-16 h-16 rounded-full"
      src="https://i.pravatar.cc/150?img=3"
      alt="User Avatar"
    />
    <div>
      <h2 class="text-xl font-semibold text-gray-800">Ali Reza</h2>
      <p class="text-gray-600">Frontend Developer</p>
    </div>
  </div>
  <div class="mt-4">
    <p class="text-gray-700">
      I love web development and working with Tailwind CSS! 🚀
    </p>
  </div>
  <button
    class="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
  >
    Follow
  </button>
</div>
```

✅ In this card:

- **User avatar** is displayed with a circular style.
- **Name and job title** are positioned side by side.
- **A short description** about the user is included.
- **Follow button** with a hover effect.

---

## 🏆 Conclusion

- **Installing Tailwind in Vite** takes just a few minutes! ⚡
- You can easily **build beautiful and modern designs**. 🎨
- By combining utility classes, you can create **more complex components** like profile cards. 💡

📌 To learn more, visit the official Tailwind documentation: [Tailwind CSS Docs](https://tailwindcss.com/docs). 🚀
