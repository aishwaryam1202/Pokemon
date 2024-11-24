import React from "react";
import "../Css/Body.css";
import PokemonCard from "./PokemonCard";
import { useState, useEffect } from "react";

/**
 *
 * * Body
 * * DropDown Bar
 * * Pokemon Container
 * * * Pokemon Card 1
 * * * Pokemon Card 1
 * * * Pokemon Card 1
 */
const Body = () => {
  const [pokemonList, setPokemonList] = useState([]);

  const fetchUserDetails = async () => {
    try {
      const urlsResponse = await fetch("https://pokeapi.co/api/v2/pokemon/");
      if (!urlsResponse.ok) {
        throw new Error("Failed to fetch URLs");
      }
      const urls = await urlsResponse.json();

      const fetchPromises = urls.results.map(({ url }) =>
        fetch(url).then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}`);
          }
          return response.json();
        })
      );

      const results = await Promise.all(fetchPromises);
      console.log("results: ", results);


      console.log("Results from all URLs:", results);
      return results;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const callFetchUserDetails = async () => {
      const results = await fetchUserDetails();
      setPokemonList(results);
      console.log("Fetched results:", results);
    };

    callFetchUserDetails();
  }, []);

  const getDropDownBar1 = () => {
    return <div className="visible-pokemon">All Pokemons</div>;
  };

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
  const onFavouriteButtonClicked = () => {
    const favouritePokemonList = pokemonList.slice(0, 2);
    setPokemonList(favouritePokemonList);
  };

  const getFavouritesButton = () => {
    return (
      <button className="favourite-btn" onClick={onFavouriteButtonClicked}>
        {" "}
        Favourite Pokemons{" "}
      </button>
    );
  };

  const getPokeMons = () => {
    return pokemonList.map((item) => (
      <PokemonCard key={item.name} pokemonData={item} />
    ));
  };
  console.log(pokemonList);
  return (
    <div className="body-container">
      <div className="DropDown-Bar">
        {getDropDownBar()}
        {getDropDownBar1()}

        {getFavouritesButton()}
      </div>
      <div className="pokemon-list-container">
        <div className="pokemon-cars">{getPokeMons()}</div>
      </div>
    </div>
  );
};

export default Body;
