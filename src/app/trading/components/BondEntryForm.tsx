"use client";
import React, { useState } from "react";

export default function BondEntryForm() {
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // In a real app, populate these from real state or selectors.
      // These UUIDs must exist in the database from the seed!
      const payload = {
        deskId: "REPLACE_WITH_DESK_UUID",
        counterpartyId: "REPLACE_WITH_CP_UUID",
        portfolioId: "REPLACE_WITH_PORTFOLIO_UUID",
        instrumentId: "REPLACE_WITH_BOND_UUID",
        tradeDate: new Date().toISOString().split("T")[0],
        buySell: "Buy",
        quantity: 1000000,
        price: 100.00,
        currency: "USD"
      };

      const res = await fetch("/api/trades/bond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");

      setBooked(true);
      setTimeout(() => setBooked(false), 3000);
    } catch(err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleBook} className="glass" style={{ padding: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
      {/* ... previous UI fields ... */}
      <div style={{ gridColumn: "1 / -1" }}>
        <h3 style={{ borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "0.5rem", color: "#1e293b", margin: 0 }}>Trade Details</h3>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Trading Desk</label>
        <select style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)" }}>
          <option>US Rates Desk</option>
        </select>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Counterparty</label>
        <input type="text" defaultValue="JPMorgan Chase" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)" }} />
      </div>
      
      {/* Shortened for brevity - reuse previous inputs in your actual copy */}
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Buy / Sell</label>
        <select style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)" }}>
          <option>Buy</option>
          <option>Sell</option>
        </select>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Quantity (Face Value)</label>
        <input type="number" defaultValue={1000000} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px" }} />
      </div>

      <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.5rem" }}>
        <div>
          {booked && <span style={{ color: "green", fontWeight: "bold", background: "rgba(255,255,255,0.9)", padding: "0.5rem 1rem", borderRadius: "8px" }}>✅ Trade successfully booked!</span>}
          {error && <span style={{ color: "red", fontWeight: "bold", background: "rgba(255,255,255,0.9)", padding: "0.5rem 1rem", borderRadius: "8px" }}>❌ {error}</span>}
        </div>
        <div>
          <button type="submit" className="card-btn" style={{ padding: "0.8rem 2rem", fontSize: "1.1rem", cursor: "pointer", border: "none" }}>
            Book Trade
          </button>
        </div>
      </div>
    </form>
  );
}
