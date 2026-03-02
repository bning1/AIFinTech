import React from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>AIFinTech</title>
      </head>
      <body>
        <header className="site-header glass" style={{ padding: "1rem" }}>
          <h1 style={{ margin: 0, fontSize: "2rem" }}>AIFinTech</h1>
          <p style={{ marginTop: 4 }}>Risk, Valuation, and RegTech — Glass UI</p>
        </header>
        <nav className="main-nav glass" style={{ position: "sticky", top: 0, display: "flex", gap: "12px", justifyContent: "center", padding: "8px" }}>
          <a href="#risk" style={{ color: "#fff" }}>Risk</a>
          <a href="#valuation" style={{ color: "#fff" }}>Valuation</a>
          <a href="#regtech" style={{ color: "#fff" }}>RegTech</a>
        </nav>
        <main style={{ padding: "1rem" }}>{children}</main>
        <footer className="footer glass" style={{ padding: "1rem", textAlign: "center" }}>
          © {new Date().getFullYear()} AIFinTech
        </footer>
      </body>
    </html>
  );
}
