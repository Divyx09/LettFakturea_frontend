import React, { useState, useEffect, useRef } from "react";
import "../styles/components/Navbar.css";

const flags = {
  English: "https://storage.123fakturere.no/public/flags/GB.png",
  Svenska: "https://storage.123fakturere.no/public/flags/SE.png",
};

const Navbar = ({ options = [], language, onLanguageChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // for hamburger menu
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Hamburger Icon on small screens */}
        <div
          className="hamburger"
          ref={hamburgerRef}
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>

        {/* Normal Logo on large screens */}
        <img
          src="https://storage.123fakturera.se/public/icons/diamond.png"
          alt="Logo"
          className="navbar-logo"
        />
      </div>

      {/* Desktop Nav */}
      <ul className="nav-links">
        {Array.isArray(options) && options.map((label, index) => (
          <li key={index} className="desktop-only">
            <a href="#" className="nav-link">
              {label}
            </a>
          </li>
        ))}

        <li
          className="language"
          onClick={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className="language-selector">
            {language}
            <img src={flags[language]} alt={`${language} flag`} width={24} />
          </div>

          {showDropdown && (
            <ul className="language-menu">
              {Object.keys(flags).map((lang) => (
                <li
                  key={lang}
                  className="language-option"
                  onClick={() => {
                    onLanguageChange(lang);
                    setShowDropdown(false);
                  }}
                >
                  {lang} <img src={flags[lang]} alt={`${lang} flag`} width={20} />
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>

      {/* Mobile Dropdown Menu */}
      <ul className={`mobile-menu ${showMenu ? "show" : ""}`} ref={menuRef}>
        {Array.isArray(options) && options.map((label, index) => (
          <li key={index}>
            <a href="#">{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
