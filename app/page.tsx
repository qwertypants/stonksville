"use client";
import Chat from "@/components/chat";
import { useState } from "react";
import TickerSearch from "@/components/tickerSearch";
import TickerMenu from "@/components/tickerMenu";
import { StatsResult, ChatContext } from "@/lib/types";
import Stats from "@/components/stats";

export default function Home() {
  const [results, setResults] = useState<string[]>([]);
  const [statResults, setStatResults] = useState<StatsResult[]>([]);
  const hasResults = results.length > 0;
  const [disabled, setDisabled] = useState(false);
  const [chatContext, setChatContext] = useState<ChatContext | undefined>();

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
                setResults={setResults}
                setStatResults={setStatResults}
                setChatContext={setChatContext}
              />
            ))}
            <div id="chart-bottom" />
          </div>
        )}
      </section>
      {hasResults && chatContext && (
        <Chat disabled={false} context={chatContext?.context} />
      )}
    </div>
  );
}
