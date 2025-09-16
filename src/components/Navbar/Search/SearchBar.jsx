'use client';

import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import './SearchBar.css';
import { baseUrl } from '@/const';


const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);
  const [selectedCategory, setSelectedCategory] = useState('Talent');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [allGigs, setAllGigs] = useState([]);
  const [allSellers, setAllSellers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const timeoutRef = useRef();

  const categories = ['Talent', 'Services'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gigsRes, sellersRes] = await Promise.all([
          fetch(`${baseUrl}/gigs/all`),
          fetch(`${baseUrl}/users/sellers`),
        ]);
        const gigsData = await gigsRes.json();
        const sellersData = await sellersRes.json();

        const filteredGigs = (gigsData.gigs || []).filter(
        (gig) => !["draft", "pause"].includes(gig.status)
      );

      setAllGigs(filteredGigs);
        setAllSellers(sellersData.users || []);
      } catch (err) {
        console.error('Error loading suggestions:', err);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (term = searchTerm) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    const base = selectedCategory === 'Services' ? '/services' : '/Sellers';
    setIsLoading(true);
    router.push(`${base}?search=${encodeURIComponent(trimmed)}`);

    if (pathname.includes(base)) {
      setTimeout(() => setIsLoading(false), 3000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      setShowSuggestions(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (!value) {
      setSuggestions([]);
      return;
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const list = selectedCategory === 'Services' ? allGigs : allSellers;
      const filtered = list.filter((item) => {
        const textToSearch =
          selectedCategory === 'Services'
            ? `${item.gigTitle} ${item.gigDescription} ${item.category} ${item.subcategory} ${item.searchTag || ''}`
            : `${item.firstName} ${item.lastName} ${item.sellerDetails?.speciality || ''} ${(item.sellerDetails?.skills || []).join(' ')}`;

        return textToSearch.toLowerCase().includes(value.toLowerCase());
      });

      const mapped = filtered.slice(0, 6).map((item) => {
        if (selectedCategory === 'Services') {
          const image = item.images?.[0]?.url || '/default-gig.jpg';
          const price = item.packages?.basic?.price || item.packages?.standard?.price || 'N/A';
          return {
            label: item.gigTitle,
            image,
            extra: `From $${price}`,
            fullItem: item,
          };
        } else {
          const image = item.profileUrl || '/default-user.jpg';
          const speciality = item.sellerDetails?.speciality || 'No speciality';
          return {
            label: `${item.firstName} ${item.lastName}`,
            image,
            extra: speciality,
            fullItem: item,
          };
        }
      });

      setSuggestions(mapped);
      setShowSuggestions(true);
    }, 300);
  };

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      setIsLoading(false);
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  const placeholder =
    selectedCategory === 'Services'
      ? 'Search by services'
      : 'Search by role, skills';

  return (
    <div className="search-bar-wrapper-navbar">
      <div className="search-bar-navbar">
        <input
          type="text"
          placeholder={placeholder}
          className="search-input-navbar"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          onFocus={() => searchTerm && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />

        <div className="dropdown-wrapper-navbar">
          <button
            className="dropdown-toggle-navbar"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {selectedCategory}
            <FiChevronDown
              size={14}
              className={`dropdown-icon-navbar ${showDropdown ? 'rotate-navbar' : ''}`}
            />
          </button>
          {showDropdown && (
            <div className="dropdown-menu-navbar">
              {categories.map((category) => (
                <div
                  key={category}
                  className={`dropdown-item-navbar ${selectedCategory === category ? 'selected-navbar' : ''}`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSuggestions([]);
                    setSearchTerm('');
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
          onClick={() => handleSearch()}
          disabled={isLoading}
        >
          {isLoading ? <span className="spinner-navbar" /> : <FiSearch size={18} />}
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="navbar-suggestions-dropdown">
          {suggestions.map((item, idx) => (
            <div
              key={idx}
              className="navbar-suggestion-item"
              onMouseDown={() => handleSearch(item.label)}
            >
              <div className="navbar-suggestion-left">
                <Image
                  src={item.image}
                  alt="suggestion-thumb"
                  width={32}
                  height={32}
                  className="navbar-suggestion-img"
                />
                {item.label}
              </div>
              <div className="navbar-suggestion-right">
                <span className="navbar-meta">{item.extra}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
