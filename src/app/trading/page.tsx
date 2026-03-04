import React from "react";
import Link from "next/link";

export default function TradingIndexPage() {
  return (
    <div>
      <div className="glass" style={{ padding: "2rem", marginBottom: "1.5rem", textAlign: "center" }}>
        <h1 style={{ margin: 0, fontSize: "2rem", color: "#1e293b", textShadow: "none" }}>Welcome to the Trading Portal</h1>
        <p style={{ marginTop: "1rem", color: "#1e293b", fontSize: "1.1rem" }}>
          Select an instrument from the left menu to begin booking trades.
        </p>
        <p style={{ marginTop: "1rem", color: "#1e293b" }}>
          Start with <Link href="/trading/bond" style={{ color: "#2563eb", fontWeight: "bold" }}>Bonds</Link>.
        </p>
      </div>
    </div>
  );
}
