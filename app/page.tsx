"use client";
import Chat from "@/components/chat";
import { useState } from "react";
import TickerSearch from "@/components/tickerSearch";
import TickerMenu from "@/components/tickerMenu";
import { AgentResponse } from "@/lib/types";
import Stats from "@/components/stats";
import { aapl } from "@/lib/mock";

export default function Home() {
  const [results, setResults] = useState<string[]>([""]);
  console.log(results);
  return (
    <div className="relative w-full">
      <section className="flex flex-col gap-4">
        <TickerSearch results={results} setResults={setResults} />
        {results.length > 0 && (
          <TickerMenu results={results} setResults={setResults} />
        )}

        <div className="overflow-y-auto h-[50vh]">
          <Stats ticker={aapl as AgentResponse} />
          <Stats ticker={aapl as AgentResponse} />
        </div>
      </section>
      {results.length > 0 && <Chat isLoading={false} />}
    </div>
  );
}
