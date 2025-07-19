import { Dispatch, SetStateAction } from "react";

export type TickerProps = {
  results?: string[];
  setResults: Dispatch<SetStateAction<string[]>>;
};

export interface SearchProps extends TickerProps {
  context: Record<string, string>[] | undefined;
}

export interface StatsProps extends TickerProps {
  ticker: string;
}

export type AgentResponse = {
  agent_response: string;
  agent_sources: AgentSources;
};

export type AgentSources = {
  earnings: EarningsData;
  analyst_ratings: AnalystRating[];
  dividends: Dividend[];
  congress_trades: CongressTrade[];
  seasonality: Seasonality[];
  insider_trades: InsiderTrade[];
};

export type EarningsData = {
  exchange: string;
  earnings_latest: LatestEarnings;
  earnings_next: NextEarnings;
};

export type LatestEarnings = {
  fiscalyear: number;
  fiscalquarter: number;
  date: string;
  hour: string;
  time: string;
  timestamp: number;
  timezone: string;
  eps_actual: number;
  eps_estimate: number;
  eps_surprise_percent: number;
  revenue_actual: number;
  revenue_estimate: number;
  revenue_surprise_percent: number;
};

export type NextEarnings = {
  date: string;
  hour: string;
  time: string;
  timestamp: number;
  timezone: string;
  fiscalyear: number;
  fiscalquarter: number;
  eps_estimate: number;
  revenue_estimate: number;
};

export type AnalystRating = {
  id: string;
  date: string;
  ticker: string;
  company_name: string;
  action: string;
  analyst_firm: string;
  analyst_name: string;
  target_from?: string;
  target: string;
  rating_from?: string;
  rating: string;
  currency: string;
  exchange: string;
  details_url: string;
};

export type Dividend = {
  amount: number;
  date: string;
  exDate: string;
  payDate: string;
  recordDate: string;
  declareDate: string;
};

export type CongressTrade = {
  congress_name: string;
  party: string;
  chamber: string;
  state: string;
  issuer_name: string;
  issuer_ticker: string;
  pub_date: string;
  tx_date: string;
  owner: string;
  tx_type: string;
  trade_size: string;
  trade_price?: string;
};

export type Seasonality = {
  month: string;
  ticker: string;
  years: number;
  sector: string;
  marketcap: string;
  positive_months_perc: string;
  min_change: string;
  median_change: string;
  max_change: string;
  avg_change: string;
  positive_closes: number;
};

export type InsiderTrade = {
  shares: Shares;
  value: Value;
  filerName: string;
  filerRelation: string;
  transactionText: string;
  ownership: string;
  date: string;
};

export type Shares = {
  raw: number;
  fmt: string;
  longFmt: string;
};

export type Value = {
  raw: number;
  fmt: string;
  longFmt: string;
};
