"use client";
import React, { useState } from "react";

export default function BondEntryForm() {
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    desk: "US Rates Desk",
    counterparty: "JPMorgan Chase",
    buySell: "Buy",
    tradeDate: new Date().toISOString().split("T")[0],
    quantity: "1000000",
    price: "100.00",
    bondType: "Treasury",
    ticker: "US912828XX99",
    couponRate: "3.50",
    maturityDate: "2035-12-31"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBooked(false);

    try {
      const res = await fetch("/api/trades/bond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");

      setBooked(true);
      setTimeout(() => setBooked(false), 4000);
    } catch(err: any) {
      setError(err.message || "An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleBook} className="glass" style={{ padding: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
      {/* Trade Info */}
      <div style={{ gridColumn: "1 / -1" }}>
        <h3 style={{ borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "0.5rem", color: "#1e293b", margin: 0 }}>Trade Details</h3>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Trading Desk</label>
        <select name="desk" value={formData.desk} onChange={handleChange} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)" }}>
          <option>US Rates Desk</option>
          <option>EMEA Rates Desk</option>
          <option>Treasury Management</option>
        </select>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Counterparty</label>
        <input name="counterparty" value={formData.counterparty} onChange={handleChange} type="text" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)" }} />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Buy / Sell</label>
        <select name="buySell" value={formData.buySell} onChange={handleChange} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)" }}>
          <option>Buy</option>
          <option>Sell</option>
        </select>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Trade Date</label>
        <input name="tradeDate" value={formData.tradeDate} onChange={handleChange} type="date" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)" }} />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Quantity (Face Value)</label>
        <input name="quantity" value={formData.quantity} onChange={handleChange} type="number" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px" }} />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Price / Yield</label>
        <input name="price" value={formData.price} onChange={handleChange} type="number" step="0.01" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px" }} />
      </div>

      {/* Instrument Info */}
      <div style={{ gridColumn: "1 / -1", marginTop: "1rem" }}>
        <h3 style={{ borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "0.5rem", color: "#1e293b", margin: 0 }}>Instrument Parameters</h3>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Bond Type</label>
        <select name="bondType" value={formData.bondType} onChange={handleChange} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)" }}>
          <option>Treasury</option>
          <option>Corporate</option>
          <option>Provincial</option>
        </select>
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Ticker / ISIN</label>
        <input name="ticker" value={formData.ticker} onChange={handleChange} type="text" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)" }} />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Coupon Rate (%)</label>
        <input name="couponRate" value={formData.couponRate} onChange={handleChange} type="number" step="0.125" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)" }} />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: 4, fontWeight: "bold", color: "#1e293b" }}>Maturity Date</label>
        <input name="maturityDate" value={formData.maturityDate} onChange={handleChange} type="date" style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)" }} />
      </div>

      <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.5rem" }}>
        <div>
          {booked && <span style={{ color: "green", fontWeight: "bold", background: "rgba(255,255,255,0.9)", padding: "0.5rem 1rem", borderRadius: "8px" }}>✅ Trade successfully booked to Database!</span>}
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
