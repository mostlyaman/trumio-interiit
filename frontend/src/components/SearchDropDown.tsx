import React, { useState } from "react";
import Select from "react-select";


const SearchableDropdown = ({ options, setDropdowni, dropdowni,text }:any) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (inputValue:any) => {
    setSearchInput(inputValue);
  };

  const handleChange = (selected:any) => {
    setSelectedOption(selected);
    setDropdowni(selected);
  };

  const filteredOptions = options.filter((option:any) =>
    option.label.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
        <Select
          value={dropdowni}
          onChange={handleChange}
          onInputChange={handleInputChange}
          options={filteredOptions}
          isClearable
          placeholder={text}
        />
    </div>
  );
};

export default SearchableDropdown;
