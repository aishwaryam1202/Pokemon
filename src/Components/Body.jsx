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
 */

const Body = () => {
  const [pokemonList, setPokemonList] = useState({});
  const [pokemonURLList, setPokemonURLList] = useState({});
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [favouritePokemonList, setFavouritePokemonList] = useState(new Set());
  const [filterView, setFilterView] = useState("show-one");
  const [isFavouriteButtonDisable, setIsFavouriteButtonDisable] =
    useState(favouritePokemonList.size === 0);

  const fetchUserDetails = async () => {
    try {
      const urlsResponse = await fetch("https://pokeapi.co/api/v2/pokemon/");
      if (!urlsResponse.ok) {
        throw new Error("Failed to fetch URLs");
      }
      const urls = await urlsResponse.json();
      const pokemonNameUrlObj = {};
      urls.results.forEach((pokemonDetail) => {
        pokemonNameUrlObj[pokemonDetail.name] = pokemonDetail.url;
      });
      return pokemonNameUrlObj;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const callFetchUserDetails = async () => {
      const results = await fetchUserDetails();
      setPokemonURLList(results);
      setFilteredPokemonList([Object.keys(results)[0]]);
    };

    callFetchUserDetails();
  }, []);

  const onFavouriteButtonClicked = () => {
    setFilteredPokemonList([...favouritePokemonList]);
    setFilterView("favourites");
  };

  const onShowAllButtonClicked = () => {
    setFilteredPokemonList(Object.keys(pokemonURLList));
    setFilterView("show-all");
  };

  const onShowOneButtonClicked = () => {
    setFilteredPokemonList([Object.keys(pokemonURLList)[0]]);
    setFilterView("show-one");
  };

  const getFavouritesButton = () => {
    return (
      <button
        className={
          filterView === "favourites" ? "filter-btn selected" : "filter-btn"
        }
        disabled={isFavouriteButtonDisable}
        onClick={onFavouriteButtonClicked}
      >
        {" "}
        Show Favourite Pokemons Only{" "}
      </button>
    );
  };

  const getShowAllButton = () => {
    return (
      <button
        className={
          filterView === "show-all" ? "filter-btn selected" : "filter-btn"
        }
        onClick={onShowAllButtonClicked}
      >
        {" "}
        Show All Viewed Pokemon{" "}
      </button>
    );
  };

  const showOnlyOnePokemon = () => {
    return (
      <button
        className={
          filterView === "show-one" ? "filter-btn selected" : "filter-btn"
        }
        onClick={onShowOneButtonClicked}
      >
        {" "}
        Show Selected Pokemon{" "}
      </button>
    );
  };

  const updateCollectedPokemon = (pokemonName, pokemonDetails) => {
    const newPokeMonList = pokemonList;
    newPokeMonList[pokemonName] = pokemonDetails;
    setPokemonList(newPokeMonList);
  };

  const onAddToFavourite = (pokemonName) => {
    const updatedFavouritePokemonList = favouritePokemonList;
    updatedFavouritePokemonList.add(pokemonName);
    setFavouritePokemonList(updatedFavouritePokemonList);
    setIsFavouriteButtonDisable(false);
  };

  const getPokeMons = () => {
    if (filteredPokemonList.length)
      return filteredPokemonList.map((item) => (
        <PokemonCard
          key={item}
          pokemonName={item}
          url={pokemonURLList[item]}
          pokemonData={item}
          updateCollectedPokemonDetails={updateCollectedPokemon}
          pokemonList={pokemonList}
          addToFavourite={onAddToFavourite}
        />
      ));
    else {
      return <div>
        Select Pokemon's to Display
      </div>
    }
  };

  const onOptionClick = (e) => {
    setFilterView("show-one");
    setFilteredPokemonList([e.target.value]);
  };

  const getDropDownOptions = () => {
    return Object.keys(pokemonURLList).map((pokemonName) => (
      <option key={pokemonName} value={pokemonName}>
        {pokemonName}
      </option>
    ));
  };

  const getOnePokemonSelector = () => {
    // Early return.
    if (filterView !== "show-one") return;
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
  };

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
