import { Dispatch, SetStateAction } from "react";

export type TickerProps = {
  results: string[];
  setResults: Dispatch<SetStateAction<string[]>>;
};

export interface SearchProps extends TickerProps {
  context: string[];
}
