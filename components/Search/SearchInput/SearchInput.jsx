import React from "react";
import classNames from "classnames";

import style from "./SearchInput.module.css";
import { SearchSuggestionBlock } from "../SearchSuggestionBlock/SearchSuggestionBlock";

const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export const SearchInput = ({ isVisible }) => {
  const [suggestions, setSuggestions] = React.useState([]);
  const styleInputBlock = classNames(style.searchInput__container, {
    [style.hidden]: !isVisible
  });

  return (
    <section className={styleInputBlock}>
      <input onChange={async (e) => {
          const response = await fetch(`http://localhost:8088/${e.target.value}`);
          const arrayWithSuggestions = await response.json();
          setSuggestions(arrayWithSuggestions.items);
      }} />
      <SearchSuggestionBlock suggestions={suggestions} />
    </section>
  );
};