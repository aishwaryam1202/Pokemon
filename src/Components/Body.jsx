import React from "react";
import "../Css/Body.css";

/**
 *
 * * Body
 * * DropDown Bar
 * * Pokemon Container
 * * * Pokemon Card 1
 * * * Pokemon Card 1
 * * * Pokemon Card 1
 */
const getDropDownBar = () => {
  return (
    <select name="cars" id="cars">
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </select>
  );
};

const getPokemonCard = () => {
  return (
    <div className="pokemon-card">
      <img
        className="logo"
        style={{ height: 300, width: 200 }}
        src="https://images.immediate.co.uk/production/volatile/sites/3/2024/05/How-many-Pokemon-are-there-6434211.jpg"
      />
      <div>
        <div>PICACHOO</div>
        <div>CLIMB , RUN</div>
        <div>56 grms</div>
      </div>
    </div>
  );
};

const Body = () => {
  return (
    <div className="body-container">
      <div className="DropDown-Bar">{getDropDownBar()}</div>
      <div className="pokemon-list-container">
        <div className="pokemon-cars">
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
          {getPokemonCard()}
        </div>
      </div>
    </div>
  );
};

export default Body;
