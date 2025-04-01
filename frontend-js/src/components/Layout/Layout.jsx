import React from "react";
import { Github, Linkedin } from "lucide-react";

export default function Layout({ children }) {
  return (
    <div className="max-w-[1200px] mx-auto min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 sticky top-0 z-20 backdrop-blur-md bg-opacity-90 border-b">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 text-center">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
            Professional German Flashcards
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1100px] mx-auto px-4 md:px-6 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 mt-auto">
        <div className="max-w-[1100px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} Flashcard App. All rights
            reserved.
          </p>
          <div className="flex space-x-4 mt-3 sm:mt-0">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
