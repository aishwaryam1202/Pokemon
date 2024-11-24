import React from "react";
import "../Css/Body.css";
import PokemonCard from './PokemonCard';
import {dummyJSON} from "./DummyJSON";

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

const iterateme = () => {
  const a = [
    1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const b = a.map((item) => <PokemonCard key ={item} pokemonData={dummyJSON} />);
  return b;
}


const Body = () => {
  return (
    <div className="body-container">
      <div className="DropDown-Bar">{getDropDownBar()}</div>
      <div className="pokemon-list-container">
        <div className="pokemon-cars">
          {iterateme()}
        </div>
      </div>
    </div>
  );
};

export default Body;
