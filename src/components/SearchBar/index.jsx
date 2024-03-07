
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const SearchBar = ({handleInputChange, searchTerm}) => {
  
  return (
    <div>
      <input
        type="text"
        id="Search-term"
        onChange={handleInputChange}
        value={searchTerm}
      />
      {/* <button type="button" id="Search-btn" className="btn" onClick={handleClick} >
        <FontAwesomeIcon icon={faSearch} />
      </button> */}
    </div>
  );
};
export default SearchBar;
