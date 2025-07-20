"use client";
import Chat from "@/components/chat";
import { useState } from "react";
import TickerSearch from "@/components/tickerSearch";
import TickerMenu from "@/components/tickerMenu";
import { ChatContext } from "@/lib/types";
import Stats from "@/components/stats";

/**
 * Displays the main application flow including ticker search, analytics
 * visualizations and the chat box. The state here drives which tickers are
 * displayed and what context is passed to the chat component.
 */

/**
 * Renders the landing page where users search for tickers and view stats.
 */
export default function Home() {
  const [results, setResults] = useState<string[]>([]);
  const hasResults = results.length > 0;
  const [chatContext, setChatContext] = useState<ChatContext | undefined>();

  return (
    <div className="relative w-full">
      <section className="flex flex-col gap-4">
        <TickerSearch results={results} setResults={setResults} />
        {hasResults && <TickerMenu results={results} setResults={setResults} />}

        {hasResults && (
          <div className="overflow-y-scroll overflow-x-hidden h-[50vh]">
            {/* Render analytics for each selected ticker */}
            {results.map((result, index) => (
              <Stats
                key={index}
                ticker={result}
                results={results}
                setResults={setResults}
                setChatContext={setChatContext}
              />
            ))}
            <div id="chart-bottom" />
          </div>
        )}
      </section>
      {/* Chat only appears after stats are loaded and context is prepared */}
      {hasResults && chatContext && <Chat context={chatContext?.context} />}
    </div>
  );
}
