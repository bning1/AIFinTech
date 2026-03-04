"use client";
import React, { useState, useEffect } from "react";

interface Trade {
  trade_id: string;
  trade_date: string;
  buy_sell: string;
  quantity: number;
  price: number;
  instrument: { ticker_symbol: string };
  portfolio: { portfolio_name: string };
  desk: { party_name: string };
}

export default function PortfolioBlotter({ desk }: { desk?: string }) {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrades = async () => {
    console.log('Blotter fetch for desk:', desk);
    setTrades([]); // Clear
    try {
      const url = '/api/trades/bond' + (desk ? '?desk=' + encodeURIComponent(desk) : '');
      console.log('Fetch URL:', url);
      const res = await fetch(url);
      console.log('Res status:', res.status);
      const data = await res.json();
      console.log('API data:', data);
      if (data.success) {
        setTrades(data.trades);
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect desk:', desk);
    fetchTrades();
  }, [desk]);

  // delete/update same as before...
  const deleteTrade = async (tradeId) => {
    if (!confirm('Delete?')) return;
    const res = await fetch('/api/trades/bond/' + tradeId, { method: 'DELETE' });
    if (res.ok) fetchTrades();
    else alert('Delete failed');
  };

  const updateQuantity = async (tradeId, qty) => {
    const res = await fetch('/api/trades/bond/' + tradeId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: qty })
    });
    if (res.ok) fetchTrades();
    else alert('Update failed');
  };

  if (loading) return <div className="glass p-4">Loading...</div>;
  if (error) return <div className="glass p-4 text-red-500">Error: {error}</div>;

  const holdings = trades.reduce((acc, t) => {
    const key = t.portfolio.portfolio_name + '-' + t.instrument.ticker_symbol;
    acc[key] = (acc[key] || 0) + (t.buy_sell === 'Buy' ? t.quantity : -t.quantity);
    return acc;
  }, {});
return (
    <div className="glass p-6 h-full overflow-auto">
      <h3 className="border-b border-white/30 pb-2 mb-0 text-slate-900">
        Portfolio {desk ? `(${desk})` : ''}
      </h3>
      {Object.keys(holdings).length > 0 && (
        <div className="mb-6">
          <h4 className="text-slate-900 my-2">Net Holdings</h4>
          <ul className="list-none p-0">
            {Object.entries(holdings).map(([k, v]) => (
              <li key={k} className="pb-1 border-b border-white/10">
                {k}: {v.toLocaleString()} units
              </li>
            ))}
          </ul>
        </div>
      )}
      <h4 className="text-slate-900 mt-4 mb-2">Recent Trades</h4>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-white/20">
            <th className="p-2 text-left">Date</th>
            <th>Buy/Sell</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Instrument</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trades.map(t => (
            <tr key={t.trade_id} className="border-b border-white/10">
              <td className="p-2">{new Date(t.trade_date).toLocaleDateString()}</td>
              <td className="p-2" style={{color: t.buy_sell === 'Buy' ? 'green' : 'red'}}>
                {t.buy_sell}
              </td>
              <td className="p-2">
                <input type="number" defaultValue={t.quantity} className="w-16 p-1" 
                  onBlur={e => updateQuantity(t.trade_id, parseFloat(e.target.value))} />
              </td>
              <td className="p-2">${(Number(t.price) || 0).toFixed(2)}</td>

              <td className="p-2">{t.instrument.ticker_symbol}</td>
              <td className="p-2">
                <button onClick={() => deleteTrade(t.trade_id)} className="text-red-500">
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {trades.length === 0 && <p className="text-slate-500 text-center p-8">No trades. Book one!</p>}
    </div>
  );
}
