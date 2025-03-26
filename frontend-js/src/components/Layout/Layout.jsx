import React from "react";
import { Github, Linkedin } from "lucide-react";

export default function Layout({ children }) {
  return (
    <div className="max-w-[1200px] bg-blue-50 mx-auto min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center">
            Professional German Flashcards
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 md:px-6 py-6 md:py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
