"use client";
import React, { useState } from "react";
import PortfolioBlotter from "../trading/components/PortfolioBlotter";

export default function PortfolioPage() {
  const [selectedDesk, setSelectedDesk] = useState("US Rates Desk");

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      height: "100vh", 
      padding: "1rem",
      background: "url(/RockyMountains.jpg) fixed center/cover"
    }}>
      <div className="glass" style={{ padding: "1rem", marginBottom: "1rem" }}>
        <label style={{ fontWeight: "bold", color: "#1e293b", marginRight: "1rem" }}>Trading Desk: </label>
        <select 
          value={selectedDesk} 
          onChange={(e) => setSelectedDesk(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.4)" }}
        >
          <option>US Rates Desk</option>
          <option>EMEA Rates Desk</option>
          <option>Treasury Management</option>
        </select>
      </div>
      <div style={{ flex: 1 }}>
        <PortfolioBlotter key={selectedDesk} desk={selectedDesk} />
      </div>
    </div>
  );
}
