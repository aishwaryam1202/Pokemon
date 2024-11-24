import React from "react";
import "../Css/Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo"
          src="https://marriland.com/wp-content/uploads/2021/09/Pokemon_Evolutions_logo.png"
        />
      </div>
      <div className="title-container">
        <h1> POKEMON </h1>
      </div>

      <div className="pokemon-pic">
        <img
          className="title-pokemon-pic"
          src="https://images.immediate.co.uk/production/volatile/sites/3/2024/05/How-many-Pokemon-are-there-6434211.jpg"
        />
      </div>
    </div>
  );
};

export default Header;
