-- Core schemas for AIFinTech Capital Markets Trading System

-- 1) Reference Data: Parties & Portfolios
CREATE TABLE IF NOT EXISTS party (
  party_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  party_name VARCHAR(255) NOT NULL,
  party_type VARCHAR(50) NOT NULL, -- e.g., Internal, Counterparty, ClearingHouse
  lei VARCHAR(20),
  country VARCHAR(2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS portfolio (
  portfolio_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_name VARCHAR(255) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2) Master Instrument Definition (Parent table for all asset classes)
CREATE TABLE IF NOT EXISTS instrument (
  instrument_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_class VARCHAR(50) NOT NULL, -- Equity, FixedIncome, Rates, Credit
  instrument_type VARCHAR(50) NOT NULL, -- Bond, IRSwap, CCSwap, Stock, Swaption, CapFloor, Option
  ticker_symbol VARCHAR(50),
  isin VARCHAR(12),
  currency VARCHAR(3) NOT NULL,
  issue_date DATE,
  maturity_date DATE,
  multiplier NUMERIC(15,6) DEFAULT 1.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS instrument_equity (
  instrument_id UUID PRIMARY KEY REFERENCES instrument(instrument_id) ON DELETE CASCADE,
  exchange VARCHAR(50),
  sector VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS instrument_bond (
  instrument_id UUID PRIMARY KEY REFERENCES instrument(instrument_id) ON DELETE CASCADE,
  issuer_id UUID REFERENCES party(party_id),
  bond_type VARCHAR(50), -- Treasury, Provincial, Corporate
  coupon_rate NUMERIC(10,6),
  coupon_frequency VARCHAR(20),
  day_count_convention VARCHAR(20),
  seniority VARCHAR(50)
);

-- 3) Trades & Derivatives (simplified)
CREATE TABLE IF NOT EXISTS trade (
  trade_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instrument_id UUID REFERENCES instrument(instrument_id),
  portfolio_id UUID REFERENCES portfolio(portfolio_id),
  counterparty_id UUID REFERENCES party(party_id),
  trade_date DATE,
  settlement_date DATE,
  buy_sell VARCHAR(4), -- Buy/Sell
  quantity NUMERIC(20,6),
  price NUMERIC(20,6),
  trade_currency VARCHAR(3)
);

CREATE TABLE IF NOT EXISTS trade_leg_swap (
  leg_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trade_id UUID REFERENCES trade(trade_id) ON DELETE CASCADE,
  leg_type VARCHAR(10), -- Pay/Rec
  notional NUMERIC(20,2)
);

CREATE TABLE IF NOT EXISTS trade_option_details (
  trade_id UUID PRIMARY KEY REFERENCES trade(trade_id),
  option_style VARCHAR(20), -- European, American, Bermudan
  call_put VARCHAR(4), -- Call/Put
  strike_price NUMERIC(20,6),
  expiration_date DATE
);

-- 4) CCR & Margining (basic)
CREATE TABLE IF NOT EXISTS margin_agreement (
  agreement_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  counterparty_id UUID REFERENCES party(party_id),
  base_currency VARCHAR(3)
);

-- Trigger: update timestamps on trade updates
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_trade
BEFORE UPDATE ON trade
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
