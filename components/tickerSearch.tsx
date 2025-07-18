"use client";
import {
  SetStateAction,
  useEffect,
  useState,
  Dispatch,
  FormEvent,
} from "react";
import { tickers as _tickers } from "@/lib/mock";
import { Search } from "@/components/search";
import { objectToArray } from "@/lib/utils";
import { TickerProps } from "@/lib/types";

export default function TickerSearch(props: TickerProps) {
  const { results, setResults } = props;
  const [tickers, setTickers] = useState<Record<string, string>[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const response = await fetch("/api/tickers");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTickers(data.data.tickers);
      } catch (err) {
        console.error("Error fetching tickers:", err);
        // @ts-ignore
        setError(err.message as string);
      } finally {
        setLoading(false);
      }
    };

    fetchTickers();
  }, []);

  if (loading) return <div>Loading tickers...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!tickers) return;

  return (
    <div className="relative">
      <Search context={tickers} results={results} setResults={setResults} />
    </div>
  );
}
