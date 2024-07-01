/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist";

import { customStyles } from "../constants/customStyles";

const ThemeDropdown = ({ handleThemeChange, theme }) => {
  const options = Array.isArray(monacoThemes)
    ? monacoThemes.map((theme) => ({
        label: theme.name,
        value: theme.value,
      }))
    : Object.entries(monacoThemes).map(([themeId, themeName]) => ({
        label: themeName,
        value: themeId,
        key: themeId,
      }));

  return (
    <Select
      placeholder={`Select Theme`}
      options={options}
      value={theme}
      styles={customStyles}
      onChange={handleThemeChange}
    />
  );
};

export default ThemeDropdown;
