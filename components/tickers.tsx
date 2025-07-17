"use client";
import { TickerProps } from "@/lib/types";
import { Card } from "@/components/retroui/Card";

export default function Tickers(props: TickerProps) {
  const { results, setResults } = props;

  function handleRemoveSelection(selection: string) {
    const newResults = results.filter((res) => res !== selection);
    setResults(newResults);
  }
  return (
    <Card className="w-full my-4 mb-6 pb-4">
      <Card.Header>
        <Card.Title className="text-base">Your selections</Card.Title>
        <Card.Description>
          {results.map((item, index) => (
            <div className="border p-2 my-2 flex justify-between" key={index}>
              <span>{item}</span>
              <button
                className="hover:cursor-pointer hover:text-destructive"
                onClick={() => handleRemoveSelection(item)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </Card.Description>
      </Card.Header>
    </Card>
  );
}
