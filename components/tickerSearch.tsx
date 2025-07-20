"use client";
import {
  SetStateAction,
  useEffect,
  useState,
  Dispatch,
  FormEvent,
} from "react";
import { tickers as _tickers } from "@/lib/mock";
import { Alert } from "@/components/retroui/Alert";
import { Search } from "@/components/search";
import { TickerProps } from "@/lib/types";
import Image from "next/image";

export default function TickerSearch(props: TickerProps) {
  const { results, setResults } = props;
  const [tickers, setTickers] = useState<Record<string, string>[]>(
    _tickers.data.tickers,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>();

  // useEffect(() => {
  //   const getTickers = async () => {
  //     try {
  //       const response = await fetch("/api/tickers");
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setTickers(data.data.tickers);
  //     } catch (err) {
  //       console.error("Error fetching tickers:", err);
  //       // @ts-ignore
  //       setError(err.message as string);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   getTickers();
  // }, []);

  if (loading) return <div>Loading tickers...</div>;
  if (error)
    return (
      <Alert>
        <Alert.Title>Error</Alert.Title>
        <Alert.Description className="flex">
          <Image
            src="/error.png"
            alt="Stonksville"
            width={250}
            height={250}
            priority
          />
          {error}
        </Alert.Description>
      </Alert>
    );

  if (!tickers) return;

  return (
    <div className="relative">
      <Search context={tickers} results={results} setResults={setResults} />
    </div>
  );
}
