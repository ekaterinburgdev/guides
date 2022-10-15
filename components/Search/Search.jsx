import React from "react";
import Select from "react-select/base";

const response = await fetch("http://localhost:8088/api");
const options = await response.json();

const formatOptionLabel = ({ guide, section, page_url, text }) => (
  <div style={{ display: "flex" }}>
      <a href={page_url}>
          <h4>
              {guide}
          </h4>
          <p>
              {section}
          </p>
      </a>
      {text}
  </div>
);

export const CustomControl = () => (
  <Select
    defaultValue={null}
    formatOptionLabel={formatOptionLabel}
    options={options.items}
  />
);
