import React from "react";

import { SearchInput } from "../Search/SearchInput/SearchInput";
import style from "./FeatureButtons.module.css";
import Image from "next/image";

export const FeatureButtons = () => {
  const [showSearchInput, setShowSearchInput] = React.useState(false);

  return (
    <section className={style.buttons__container}>
      <button className={style.action_button} onClick={() => setShowSearchInput(!showSearchInput)}>
          <Image src={'/search.svg'} width={48} height={48} />
      </button>
      <button className={style.action_button}>
          <Image src={'/settings.svg'} width={48} height={48} />
      </button>
      <button className={style.action_button}>
          <Image src={'/theme.svg'} width={48} height={48} />
      </button>
      <SearchInput isVisible={showSearchInput} />
    </section>
  );
};