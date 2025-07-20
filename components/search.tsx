/**
 * Fuzzy search component used to look up ticker symbols.
 */
import { useState, KeyboardEvent } from "react";
import Fuse, { FuseResult } from "fuse.js";
import { Input } from "@/components/retroui/Input";
import { SearchProps } from "@/lib/types";

/**
 * Provides a fuzzy-search input for selecting options.
 * @param props list of searchable options.
 */
export function Search(props: SearchProps) {
  const { context, results = [], setResults } = props;
  const searchContext = Object.keys(context!);

  const fuse = new Fuse(searchContext);
  const [searchResults, setSearchResults] = useState<FuseResult<string>[]>([]);
  const [searchText, setSearchText] = useState("");

  function handleSearch(event: KeyboardEvent<HTMLInputElement>) {
    const search = event.currentTarget.value;
    setSearchText(search);
    const result = fuse.search(search);
    setSearchResults(result);
  }
  function handleAddTicker(ticker: string) {
    if (context) {
      // @ts-expect-error We're looking for text, it's expecting an index. Okay by me!
      setResults([...results, context[ticker]]);
    }
  }

  function resetSearchResults() {
    setSearchResults([]);
    setSearchText("");
  }

  function handleBlur() {
    // Short delay so item clicks register before results disappear
    setTimeout(resetSearchResults, 100);
  }
  return (
    <div
      className={` w-full z-50 mx-auto  overflow-y-scroll bg-white border ${searchResults.length > 0 ? "h-[40vh] drop-shadow-2xl" : ""} `}
    >
      <div className="relative">
        <Input
          type="search"
          placeholder="Search ticker"
          className="disabled:opacity-50"
          onKeyDown={handleSearch}
          onBlur={handleBlur}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          required
        />
        {searchResults.length > 0 && (
          <section className="mt-2">
            {searchResults.map((result, index) => {
              return (
                <div className=" border-b" key={index}>
                  <p
                    className="hover:bg-primary  p-2 hover:cursor-pointer"
                    onClick={() => handleAddTicker(result.item)}
                  >
                    {result.item}
                  </p>
                </div>
              );
            })}
          </section>
        )}
      </div>
    </div>
  );
}
