"use client";
import React, { useState } from "react";
// We will create the layout and components here

const ProductGroups = [
  { group: "Interest Rate (IR)", types: ["Bond", "IR Swap", "Cap/Floor", "Swaption"] },
  { group: "Equity", types: ["Stock", "Option", "Total Return Swap"] },
  { group: "Foreign Exchange (FX)", types: ["FX Spot", "FX Forward", "FX Option"] },
  { group: "Commodity", types: ["Future", "Option"] },
  { group: "Credit", types: ["CDS", "CDS Index"] }
];

export default function TradingPortal() {
  const [selectedType, setSelectedType] = useState<string>("Bond"); // Default to Bond

  return (
    <div style={{ padding: "2rem", display: "flex", gap: "2rem", height: "calc(100vh - 150px)" }}>
      {/* Left side: Navigation / Instrument Sidebar */}
      <aside className="glass" style={{ width: "300px", overflowY: "auto", padding: "1.5rem" }}>
        <h2 style={{ borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
          Instruments
        </h2>
        {ProductGroups.map((pg, idx) => (
          <div key={idx} style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", color: "#1e293b", margin: "0 0 0.5rem 0", fontWeight: "bold" }}>
              {pg.group}
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {pg.types.map(t => (
                <li key={t} style={{ marginBottom: "0.4rem" }}>
                  <button 
                    onClick={() => setSelectedType(t)}
                    style={{ 
                      width: "100%", 
                      textAlign: "left", 
                      padding: "0.4rem 0.8rem", 
                      background: selectedType === t ? "rgba(255,255,255,0.6)" : "transparent",
                      border: "none", 
                      borderRadius: "8px", 
                      cursor: "pointer", 
                      fontWeight: selectedType === t ? "bold" : "normal",
                      color: "#1e293b",
                      transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => {
                      if (selectedType !== t) e.currentTarget.style.background = "rgba(255,255,255,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      if (selectedType !== t) e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {t}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* Right side: Trading Entry Panel */}
      <main className="glass" style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        <div style={{ borderBottom: "2px solid rgba(255,255,255,0.4)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
          <h1 style={{ margin: 0, fontSize: "2.2rem" }}>New {selectedType} Trade</h1>
          <p style={{ margin: "0.5rem 0 0 0", opacity: 0.8 }}>Enter trade parameters and book to a desk.</p>
        </div>

        {/* Form Body - Render conditionally based on selectedType */}
        {selectedType === "Bond" ? <BondEntryForm /> : <PlaceholderForm type={selectedType} />}
      </main>
    </div>
  );
}

// ------------------------------------
// Detail Panels
// ------------------------------------

function BondEntryForm() {
  return (
    <form className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: 0, padding: 0 }}>
      {/* Trade Info */}
      <div style={{ gridColumn: "1 / -1" }}>
        <h3 style={{ borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "0.5rem" }}>Trade Details</h3>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>Trading Desk</label>
        <select style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.8)" }}>
          <option>US Rates Desk</option>
          <option>EMEA Rates Desk</option>
          <option>Treasury Management</option>
        </select>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>Counterparty</label>
        <input type="text" placeholder="e.g. JPMorgan Chase" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.8)" }} />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>Buy / Sell</label>
        <select style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.8)" }}>
          <option>Buy</option>
          <option>Sell</option>
        </select>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>Trade Date</label>
        <input type="date" defaultValue={new Date().toISOString().split("T")[0]} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.8)" }} />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>Quantity (Face Value)</label>
        <input type="number" defaultValue="1000000" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.8)" }} />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>Price / Yield</label>
        <input type="number" defaultValue="100.00" step="0.01" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.8)" }} />
      </div>

      {/* Instrument Info */}
      <div style={{ gridColumn: "1 / -1", marginTop: "1rem" }}>
        <h3 style={{ borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "0.5rem" }}>Instrument Parameters</h3>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>Bond Type</label>
        <select style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.8)" }}>
          <option>Treasury</option>
          <option>Corporate</option>
          <option>Provincial</option>
        </select>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>Ticker / ISIN</label>
        <input type="text" placeholder="e.g. US912828XX99" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.8)" }} />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>Coupon Rate (%)</label>
        <input type="number" defaultValue="3.50" step="0.125" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.8)" }} />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>Maturity Date</label>
        <input type="date" defaultValue="2035-12-31" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.8)" }} />
      </div>
      
      {/* Submit */}
      <div style={{ gridColumn: "1 / -1", textAlign: "right", marginTop: "1rem" }}>
        <button type="button" className="card-btn" style={{ padding: "0.8rem 2rem", fontSize: "1.1rem" }}>
          Book Trade
        </button>
      </div>
    </form>
  );
}

function PlaceholderForm({ type }: { type: string }) {
  return (
    <div style={{ textAlign: "center", padding: "4rem", opacity: 0.7 }}>
      <p style={{ fontSize: "1.2rem" }}>Configuration panel for <b>{type}</b> trades is under construction.</p>
    </div>
  );
}
