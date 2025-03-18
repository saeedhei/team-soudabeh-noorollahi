# 🌟 Tailwind CSS v4 Installation Guide (CLI Method)

The **simplest and fastest** way to use Tailwind CSS is with the **Tailwind CLI tool**. This guide will walk you through the installation and setup process **step by step**.

---

## 📌 1. Install Tailwind CSS CLI

First, install Tailwind CSS and its CLI via npm:

```sh
npm install -D tailwindcss @tailwindcss/cli
```

---

## 📌 2. Import Tailwind in Your CSS

Create a **CSS file** (e.g., `src/input.css`) and add the following:

```css
@import "tailwindcss";
```

---

## 📌 3. Build Tailwind CSS with the CLI

Run the following command to **generate** your Tailwind CSS output file:

```sh
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch
```

This will watch for **changes** and update `output.css` automatically.

---

## 📌 4. Use Tailwind CSS in HTML

Now, create an **HTML file** (`src/index.html`) and link the compiled CSS:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tailwind CSS Example</title>
    <link href="./output.css" rel="stylesheet" />
  </head>
  <body class="flex items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold underline text-blue-600">
      Hello, Tailwind! 🚀
    </h1>
  </body>
</html>
```

This will display a **blue underlined heading** centered on the page.

---

## 📌 5. A Simple Tailwind Example: **Card Component**

Here’s a **basic card component** using Tailwind classes:

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

✅ This card includes:

- **A profile picture**
- **Name and job title**
- **A short description**
- **A "Follow" button with a hover effect**

---

## 🎯 **Conclusion**

- **Tailwind CLI** is the fastest way to set up Tailwind.
- You can create **responsive and modern designs** in minutes.
- Now you’re ready to build your own UI components!

🚀 **Happy Coding with Tailwind CSS!** 🎨💻
