import React from "react";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="container">
      <header className="header">
        <h1>German Verbs with Prepositions C1</h1>
        <p>Improve your German vocabulary!</p>
      </header>
      <main className="content">{children}</main>
      <footer className="footer">
        <p>&copy; 2025 Learn German Efficiently.</p>
      </footer>
    </div>
  );
}

export default Layout;
