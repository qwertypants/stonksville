"use client";
import Chat from "@/components/chat";
import { useState } from "react";
import TickerSearch from "@/components/tickerSearch";
import TickerMenu from "@/components/tickerMenu";
import { StatsResult } from "@/lib/types";
import Stats from "@/components/stats";

export default function Home() {
  const [results, setResults] = useState<string[]>([]);
  const [statResults, setStatResults] = useState<StatsResult[]>([]);
  console.log(results);
  const hasResults = results.length > 0;

  console.log(statResults);
  return (
    <div className="relative w-full">
      <section className="flex flex-col gap-4">
        <TickerSearch results={results} setResults={setResults} />
        {hasResults && <TickerMenu results={results} setResults={setResults} />}

        {hasResults && (
          <div className="overflow-y-scroll overflow-x-hidden h-[50vh]">
            {results.map((result, index) => (
              <Stats
                key={index}
                ticker={result}
                results={results}
                setStatResults={setStatResults}
              />
            ))}
          </div>
        )}
      </section>
      {hasResults && <Chat isLoading={false} />}
    </div>
  );
}
