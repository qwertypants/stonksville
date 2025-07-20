"use client";
/**
 * Wrapper around the {@link Search} component that loads available ticker
 * symbols (currently from mock data).  Handles loading and error states.
 */
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

/**
 * Component responsible for fetching tickers (mocked for now) and rendering
 * a search box for selection.
 */
export default function TickerSearch(props: TickerProps) {
  const { results, setResults } = props;
  const [tickers, setTickers] = useState<string[]>(
    objectToArray(_tickers.data.tickers),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // TODO: Use real call later.
  // useEffect(() => {
  //   const fetchTickers = async () => {
  //     try {
  //       const response = await fetch("/api/tickers");
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       console.log("TickerMenu data:", data);
  //       setTickers(data);
  //     } catch (err) {
  //       console.error("Error fetching tickers:", err);
  //       setError(err.message as string);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchTickers();
  // }, []);

  if (loading) return <div>Loading tickers...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative">
      <Search context={tickers} results={results} setResults={setResults} />
    </div>
  );
}
