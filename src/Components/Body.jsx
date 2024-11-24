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

/**
 * show-one
 * show-all
 * favourites
 * 
 */

const Body = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonURLList, setPokemonURLList] = useState([])
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [activePokemonData, setActivePokemonData] = useState("");
  const [filterView, setFilterView] = useState("show-one");

  const fetchUserDetails = async () => {
    try {
      const urlsResponse = await fetch("https://pokeapi.co/api/v2/pokemon/");
      if (!urlsResponse.ok) {
        throw new Error("Failed to fetch URLs");
      }
      const urls = await urlsResponse.json();
      setPokemonURLList(urls.results);

      const fetchPromises = urls.results.map(({ url }) =>
        fetch(url).then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}`);
          }
          return response.json();
        })
      );

      const results = await Promise.all(fetchPromises);

      return results;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const callFetchUserDetails = async () => {
      const results = await fetchUserDetails();
      setPokemonList(results);
      setFilteredPokemonList(results);
    };

    callFetchUserDetails();
  }, []);

  const onFavouriteButtonClicked = () => {
    const favouritePokemonList = pokemonList.slice(0,2 );
    setFilterView("favourites");
    setFilteredPokemonList(favouritePokemonList);
  };

   const onShowAllButtonClicked = () => {
     setFilterView("show-all");
     setFilteredPokemonList(pokemonList);
   };
  
   const onShowOneButtonClicked = () => {
     const favouritePokemonList = pokemonList.slice(0, 1);
     setFilterView("show-one");
     setFilteredPokemonList(favouritePokemonList);
   };

  const getFavouritesButton = () => {
    return (
      <button
        className="filter-btn"
        onClick={onFavouriteButtonClicked}
      >
        {" "}
        Show Favourite Pokemons Only{" "}
      </button>
    );
  };

  const getShowAllButton = () => {
    return (
      <button className="filter-btn" onClick={onShowAllButtonClicked}>
        {" "}
        Show All Pokemon{" "}
      </button>
    );
  };

  const showOnlyOnePokemon = () => {
    return (
      <button className="filter-btn" onClick={onShowOneButtonClicked}>
        {" "}
        Show Selected Pokemon{" "}
      </button>
    );
  };

  const getPokeMons = () => {
    return filteredPokemonList.map((item) => (
      <PokemonCard key={item.name} name pokemonData={item} />
    ));
  };

  const onOptionClick = (e) => {
    setActivePokemonData(e.target.value);
    setFilterView("show-one");
    const favouritePokemonList = pokemonList.slice(0, 1);
    setFilteredPokemonList(favouritePokemonList);
  }

  const getDropDownOptions = () => {
    return pokemonURLList.map((pokemonObj) => (
      <option key={pokemonObj.name} value={pokemonObj.name}>
        {pokemonObj.name}
      </option>
    ));
  }

  const getOnePokemonSelector = () => {
    // Early return.
    if (filterView !== "show-one")
      return;
    return (
      <div className="select-pokemon">
        <select
          className="selection"
          name="pokemon"
          id="pokemon"
          onChange={onOptionClick}
        >
          {getDropDownOptions()}
        </select>
      </div>
    );
  }

  return (
    <div className="body-container">
      <div className="DropDown-Bar">
        {showOnlyOnePokemon()}
        {getShowAllButton()}
        {getFavouritesButton()}
      </div>
      <div className="pokemon-list-container">
        {getOnePokemonSelector()}
        <div className="pokemon-cars">{getPokeMons()}</div>
      </div>
    </div>
  );
};

export default Body;
