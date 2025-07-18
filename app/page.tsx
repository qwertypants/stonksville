"use client";
import Chat from "@/components/chat";
import { useState } from "react";
import TickerSearch from "@/components/tickerSearch";
import TickerMenu from "@/components/tickerMenu";
import { AgentResponse } from "@/lib/types";
import Stats from "@/components/stats";
import { aapl } from "@/lib/mock";

export default function Home() {
  const [results, setResults] = useState<string[]>([]);
  console.log(results);
  const hasResults = results.length > 0;
  return (
    <div className="relative w-full">
      <section className="flex flex-col gap-4">
        <TickerSearch results={results} setResults={setResults} />
        {hasResults && <TickerMenu results={results} setResults={setResults} />}

        {hasResults && (
          <div className="overflow-y-auto h-[50vh]">
            <Stats ticker={aapl as AgentResponse} />
            <Stats ticker={aapl as AgentResponse} />
          </div>
        )}
      </section>
      {hasResults && <Chat isLoading={false} />}
    </div>
  );
}
