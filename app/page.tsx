"use client";
import Chat from "@/components/chat";
import { useState } from "react";
import Ticker from "@/components/ticker";
import Tickers from "@/components/tickers";

export default function Home() {
  const [results, setResults] = useState<string[]>([]);
  console.log(results);
  return (
    <section>
      <Ticker results={results} setResults={setResults} />
      {results.length > 0 && (
        <Tickers results={results} setResults={setResults} />
      )}
      {results.length > 0 && <Chat isLoading={false} />}
    </section>
  );
}
