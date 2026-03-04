import React from "react";
import Link from "next/link";

const ProductGroups = [
  { group: "Interest Rate (IR)", types: [{ name: "Bond", path: "/trading/bond" }, { name: "IR Swap", path: "/trading/ir-swap" }, { name: "Cap/Floor", path: "/trading/cap-floor" }, { name: "Swaption", path: "/trading/swaption" }] },
  { group: "Equity", types: [{ name: "Stock", path: "/trading/stock" }, { name: "Option", path: "/trading/equity-option" }, { name: "Total Return Swap", path: "/trading/trs" }] },
  { group: "Foreign Exchange (FX)", types: [{ name: "FX Spot", path: "/trading/fx-spot" }, { name: "FX Forward", path: "/trading/fx-forward" }, { name: "FX Option", path: "/trading/fx-option" }] },
  { group: "Commodity", types: [{ name: "Future", path: "/trading/commodity-future" }, { name: "Option", path: "/trading/commodity-option" }] },
  { group: "Credit", types: [{ name: "CDS", path: "/trading/cds" }, { name: "CDS Index", path: "/trading/cds-index" }] }
];

export default function TradingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: "2rem", display: "flex", gap: "2rem", minHeight: "calc(100vh - 150px)" }}>
      {/* Left Sidebar: Product List */}
      <aside className="glass" style={{ width: "300px", padding: "1.5rem", alignSelf: "flex-start" }}>
        <div style={{ marginBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: "0.5rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#1e293b", textShadow: "none" }}>Trading Portal</h2>
          <Link href="/" style={{ fontSize: "0.9rem", color: "#2563eb", textDecoration: "none" }}>← Back to Main</Link>
        </div>
        
        {ProductGroups.map((pg, idx) => (
          <div key={idx} style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", color: "#1e293b", textShadow: "none", margin: "0 0 0.5rem 0", fontWeight: "bold" }}>
              {pg.group}
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
              {pg.types.map(t => (
                <li key={t.name}>
                  <Link 
                    href={t.path}
                    style={{ 
                       display: "block",
                       padding: "0.4rem 0.8rem", 
                       borderRadius: "8px", 
                       color: "#1e293b",
                       textDecoration: "none",
                       background: "rgba(255,255,255,0.2)",
                       transition: "background 0.2s"
                    }}
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* Right Content Area */}
      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
}
