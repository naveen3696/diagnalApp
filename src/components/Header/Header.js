import React, { useState } from "react";
import "./Header.css";

const Header = ({ setSearchTerm }) => {
  const [searchActive, setSearchActive] = useState(false);

  const handleSearchClick = () => {
    setSearchActive(true);
  };

  const handleBackClick = () => {
    setSearchActive(false);
    setSearchTerm("");
  };

  return (
    <header className="header">
      <div className="left-section">
        {searchActive && (
          <img
            src="https://test.create.diagnal.com/images/Back.png"
            alt="Back"
            className="icon"
            onClick={handleBackClick}
          />
        )}
      </div>
      <div className="center-section">
        {!searchActive && <h1 className="header-title">Romantic Comedy</h1>}
      </div>
      <div className="right-section">
        {searchActive ? (
          <input
            type="text"
            placeholder="Search Movie"
            className="search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        ) : (
          <img
            src="https://test.create.diagnal.com/images/search.png"
            alt="Search"
            className="icon"
            onClick={handleSearchClick}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
