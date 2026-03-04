"use client";
import React, { useState } from "react";

export default function BondEntryForm() {
  const [booked, setBooked] = useState(false);

  const handleBook = () => {
    // In a real app, this would dispatch to an API or store
    console.log("Trade booked for Bond");
    setBooked(true);
    setTimeout(() => setBooked(false), 3000);
  };

  return (
    <form className="glass" style={{ padding: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
      {/* Trade Info */}
      <div style={{ gridColumn: "1 / -1" }}>
        <h3 style={{ borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "0.5rem", color: "#1e293b", margin: 0 }}>Trade Details</h3>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Trading Desk</label>
        <select style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.8)" }}>
          <option>US Rates Desk</option>
          <option>EMEA Rates Desk</option>
          <option>Treasury Management</option>
        </select>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Counterparty</label>
        <input type="text" placeholder="e.g. JPMorgan Chase" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.8)" }} />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Buy / Sell</label>
        <select style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.8)" }}>
          <option>Buy</option>
          <option>Sell</option>
        </select>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Trade Date</label>
        <input type="date" defaultValue={new Date().toISOString().split("T")[0]} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.8)" }} />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Quantity (Face Value)</label>
        <input type="number" defaultValue={1000000} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.8)" }} />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Price / Yield</label>
        <input type="number" defaultValue={100.00} step="0.01" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.8)" }} />
      </div>

      {/* Instrument Info */}
      <div style={{ gridColumn: "1 / -1", marginTop: "1rem" }}>
        <h3 style={{ borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "0.5rem", color: "#1e293b", margin: 0 }}>Instrument Parameters</h3>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Bond Type</label>
        <select style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.8)" }}>
          <option>Treasury</option>
          <option>Corporate</option>
          <option>Provincial</option>
        </select>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Ticker / ISIN</label>
        <input type="text" placeholder="e.g. US912828XX99" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.8)" }} />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Coupon Rate (%)</label>
        <input type="number" defaultValue={3.50} step="0.125" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.8)" }} />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Maturity Date</label>
        <input type="date" defaultValue="2035-12-31" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.8)" }} />
      </div>
      
      {/* Submit / Feedback */}
      <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.5rem" }}>
        <div>
          {booked && <span style={{ color: "green", fontWeight: "bold", background: "rgba(255,255,255,0.8)", padding: "0.5rem 1rem", borderRadius: "8px" }}>✅ Trade successfully booked!</span>}
        </div>
        <div>
          <a href="/" style={{ marginRight: "1.5rem", fontSize: "1.1rem", textDecoration: "none", color: "#1e293b", fontWeight: "bold" }}>Cancel</a>
          <button type="button" className="card-btn" style={{ padding: "0.8rem 2rem", fontSize: "1.1rem", cursor: "pointer", border: "none" }} onClick={handleBook}>
            Book Trade
          </button>
        </div>
      </div>
    </form>
  );
}
