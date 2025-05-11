import { useState } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import "./SearchBar.css";

const SearchBar = () => {
  const [selectedCategory, setSelectedCategory] = useState("Shots");
  const [showDropdown, setShowDropdown] = useState(false);
  const categories = ["Shots", "Designers"];

  return (
    <div className="search-bar-wrapper-navbar">
      <div className="search-bar-navbar">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="search-input-navbar"
        />

        <div className="dropdown-wrapper-navbar">
          <button
            className="dropdown-toggle-navbar"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {selectedCategory}
            <FiChevronDown
              size={14}
              className={`dropdown-icon-navbar ${
                showDropdown ? "rotate-navbar" : ""
              }`}
            />
          </button>
          {showDropdown && (
            <div className="dropdown-menu-navbar">
              {categories.map((category) => (
                <div
                  key={category}
                  className={`dropdown-item-navbar ${
                    selectedCategory === category ? "selected-navbar" : ""
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowDropdown(false);
                  }}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="search-button-navbar">
          <FiSearch size={18} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
