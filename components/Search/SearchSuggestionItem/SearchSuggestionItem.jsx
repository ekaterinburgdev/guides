import React from "react";
import Link from "next/link";

export const SearchSuggestionItem = ({ suggestion }) => (
  <div>
    <h4>
      {suggestion.guide_name} / {suggestion.guide_section}
    </h4>
    <Link href={`https://guides.ekaterinburg.design/${suggestion.page_url}`}>
      <p>
        {suggestion.text}
      </p>
    </Link>
  </div>
);