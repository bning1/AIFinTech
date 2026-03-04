"use client";
import React from react;

export default function BondPanel(){
  return (
    <div className="glass" style={{ padding: 14, borderRadius: 12 }}>
      <h3>Bond</h3>
      <p>Instrument details for Bond trading (issuer, coupon, maturity, etc.).</p>
      <button className="card-btn" onClick={()=>{}} style={{ cursor:pointer }}>New Bond Trade</button>
    </div>
  );
}
