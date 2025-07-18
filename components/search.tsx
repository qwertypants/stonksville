import { useState, KeyboardEvent } from "react";
import Fuse, { FuseResult } from "fuse.js";
import { Input } from "@/components/retroui/Input";
import { SearchProps } from "@/lib/types";

/**
 * Provides a fuzzy-search input for selecting options.
 * @param props list of searchable options.
 */
export function Search(props: SearchProps) {
  const { context, results, setResults } = props;
  const fuse = new Fuse(context);
  const [searchResults, setSearchResults] = useState<FuseResult<string>[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  function handleSearch(event: KeyboardEvent<HTMLInputElement>) {
    const search = event.currentTarget.value;
    setSearchText(search);
    const result = fuse.search(search);
    setSearchResults(result);
  }

  function handleAddTicker(ticker: string) {
    setResults([...results, ticker]);
  }

  function resetSearchResults() {
    setSearchResults([]);
    setSearchText("");
    setIsFocused(false);
  }

  function handleBlur() {
    // Delay to allow a click on the element
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
          onKeyDown={handleSearch}
          onBlur={handleBlur}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          required
          onFocus={() => setIsFocused(true)}
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
