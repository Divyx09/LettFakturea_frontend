import React from "react";
import "../assets/CSS/Header.css";
import userIcon from "../assets/Images/user2.png";

const Header = () => {
  return (
    <div className="header">
      <div className="user-info">
        <img src={userIcon} alt="avatar" className="avatar" />
        <div className="user-text">
          <p className="user-name">John Andre</p>
          <p className="company-name">Storfjord AS</p>
        </div>
      </div>

      <div className="hamburger">
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>

      <div className="language-section">
        <span className="language-text">Norsk Bokmål</span>
        <img
          src="https://storage.123fakturere.no/public/flags/SE.png"
          alt="flag"
          className="flag"
        />
      </div>
    </div>
  );
};

export default Header;
