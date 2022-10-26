import React from "react";
import { SearchSuggestionItem } from "../SearchSuggestionItem/SearchSuggestionItem";

export const SearchSuggestion = ({ suggestions }) => {
  return (
    <ul>
      {suggestions.map(suggestion =>
        <li>
          <SearchSuggestionItem suggestion={suggestion} />
        </li>)
      }
    </ul>
  );
};