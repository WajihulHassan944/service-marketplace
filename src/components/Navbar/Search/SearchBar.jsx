'use client';

import { useState, useEffect, useRef } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { useRouter, usePathname } from "next/navigation";
import "./SearchBar.css";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);
  const [selectedCategory, setSelectedCategory] = useState("Talent");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const categories = ["Talent", "Services"];

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    const base = selectedCategory === "Services" ? "/services" : "/Sellers";
    setIsLoading(true);
    router.push(`${base}?search=${encodeURIComponent(trimmed)}`);

    // ✅ If already on the same page, stop loading after 3 seconds
    if (pathname.includes(base)) {
      setTimeout(() => setIsLoading(false), 3000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // ✅ Detect route change via pathname and stop spinner
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      setIsLoading(false);
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  const placeholder =
    selectedCategory === "Services"
      ? "Search by services"
      : "Search by role, skills";

  return (
    <div className="search-bar-wrapper-navbar">
      <div className="search-bar-navbar">
        <input
          type="text"
          placeholder={placeholder}
          className="search-input-navbar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <div className="dropdown-wrapper-navbar">
          <button
            className="dropdown-toggle-navbar"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {selectedCategory}
            <FiChevronDown
              size={14}
              className={`dropdown-icon-navbar ${showDropdown ? "rotate-navbar" : ""}`}
            />
          </button>
          {showDropdown && (
            <div className="dropdown-menu-navbar">
              {categories.map((category) => (
                <div
                  key={category}
                  className={`dropdown-item-navbar ${selectedCategory === category ? "selected-navbar" : ""}`}
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

        <button
          className="search-button-navbar"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? <span className="spinner-navbar" /> : <FiSearch size={18} />}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
