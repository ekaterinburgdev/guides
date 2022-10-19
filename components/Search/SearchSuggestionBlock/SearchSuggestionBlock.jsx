import React from "react";
import { SuggestionItem } from "../SuggestionItem/SuggestionItem";

export const SearchSuggestionBlock = ({ suggestions }) => {
    return (
        <ul>
            {suggestions.map(suggestion =>
                <li>
                    <SuggestionItem suggestion={suggestion} />
                </li>)
            }
        </ul>
    )
}