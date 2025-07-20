"use client";
/**
 * Displays the currently selected ticker symbols and allows them to be
 * removed from the list.
 */
import { TickerProps } from "@/lib/types";
import { Card } from "@/components/retroui/Card";

/**
 * Menu component showing ticker selections with remove buttons.
 */
export default function TickerMenu(props: TickerProps) {
  const { results, setResults } = props;

  // Remove a single ticker from the selection list
  function handleRemoveSelection(selection: string) {
    const newResults = results.filter((res) => res !== selection);
    setResults(newResults);
  }
  return (
    <Card className="">
      <Card.Header>
        <Card.Content className="grid grid-cols-2 md:grid-cols-4 gap-4 p-0">
          {results.map((item, index) => (
            <div className="grid gap-2 border" key={index}>
              <div className="p-2 flex items-start justify-between ">
                <span className="text-sm">{item}</span>
                <button
                  className="hover:cursor-pointer hover:text-destructive"
                  onClick={() => handleRemoveSelection(item)}
                  title="Remove"
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
            </div>
          ))}
        </Card.Content>
      </Card.Header>
    </Card>
  );
}
