// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import Select from "react-select";
import { customStyles } from "../constants/customStyles";
import { languageOptions } from "../constants/languageOptions";

// eslint-disable-next-line react/prop-types
const LanguageDropdown = ({ onSelectChange }) => {
    const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);

    const handleChange = (selectedOption) => {
        setSelectedLanguage(selectedOption);
        onSelectChange(selectedOption.value);
    };

    return (
        <Select
        placeholder={`Filter By Category`}
        options={languageOptions}
        styles={customStyles}
        defaultValue={selectedLanguage}
        onChange={handleChange}
        />
    );
};

export default LanguageDropdown;