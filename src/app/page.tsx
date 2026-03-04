export default function Home(){
  return (
    <section style={{ padding: "2rem" }}>
      <div className="glass" style={{ padding: "2rem", textAlign:"center" }}>
        <h2 style={{ margin:0, fontSize:"2rem" }}>Welcome to AIFinTech</h2>
        <p style={{ marginTop:6, fontSize:"1.05rem", color: "white" }}>Glassmorphism, dawn Rockies background, risk, valuation, and regtech demos.</p>
      </div>
      <div className="grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        <div className="glass card" style={{ padding:20 }}>
          <h3>Trading Desk</h3>
          <p>Book trades across multi-asset classes. Real-time pricing and execution simulator.</p>
          <a href="/trading" className="card-btn">Enter Portal</a>
        </div>
        <div className="glass card" style={{ padding:20 }}>
          <h3>Portfolio</h3>
          <p>View positions, adjust holdings, manage trades per desk. Net P&L and blotter.</p>
          <a href="/portfolio" className="card-btn">Open Blotter</a>
        </div>
        <div className="glass card" style={{ padding:20 }}>
          <h3>Risk</h3>
          <p>Risk management overview, VaR, SA/CCR, CVA, etc.</p>
          <a href="#risk" className="card-btn">Open</a>
        </div>
        <div className="glass card" style={{ padding:20 }}>
          <h3>Valuation</h3>
          <p>Bond, swap, cap/floor, options demos.</p>
          <a href="#valuation" className="card-btn">Open</a>
        </div>
        <div className="glass card" style={{ padding:20 }}>
          <h3>RegTech</h3>
          <p>Compliance, reporting, regulatory tooling.</p>
          <a href="#regtech" className="card-btn">Open</a>
        </div>
      </div>
    </section>
  );
}
