import React from "react";
import BondEntryForm from "../components/BondEntryForm";

export default function BondTradingPage(){
  return (
    <div>
      <div className="glass" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
        <h1 style={{ margin: 0, fontSize: "2rem" }}>Bond Trading</h1>
        <p style={{ marginTop: "0.5rem", opacity: 0.85 }}>Select instrument details and book a bond trade to a desk.</p>
      </div>
      <BondEntryForm />
    </div>
  );
}
