import React from "react";
import "../Css/Body.css";
import PokemonCard from "./PokemonCard";
import { useState, useEffect } from "react";
import { initTourGuide, PokemonTourSteps } from "./Tour";
import SearchPokemon from "./SearchPokemon";
import { POKEMON_VIEW_TYPE } from './../Constants/PokemonViewConstants';


const Body = () => {
  // contains all fetch pokemon with its details.
  const [pokemonList, setPokemonList] = useState({});
  // constain all the pokemon details with it URL
  const [pokemonURLList, setPokemonURLList] = useState({});
  // contain what pokemon to be displayed
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  // contain a list of favourite pokemon
  const [favouritePokemonList, setFavouritePokemonList] = useState(new Set());
  // denotes current filter view state
  const [filterView, setFilterView] = useState(POKEMON_VIEW_TYPE.VIEW_ONE_POKEMON);
  // denotes if the favorite button enabled
  const [favButtonEnabled, setFavButtonEnabled] = useState(
    favouritePokemonList.size !== 0
  );

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
      filterView === POKEMON_VIEW_TYPE.VIEW_ALL_POKEMON
        ? setFilteredPokemonList(Object.keys(results))
        : setFilteredPokemonList([Object.keys(results)[0]]);
    };

    callFetchUserDetails();
    initTourGuide(PokemonTourSteps);
  }, []);

  const onFavouriteButtonClicked = () => {
    setFilteredPokemonList([...favouritePokemonList]);
    setFilterView(POKEMON_VIEW_TYPE.VIEW_FAVOURITE_POKEMON);
  };

  const onShowAllButtonClicked = () => {
    setFilteredPokemonList(Object.keys(pokemonURLList));
    setFilterView(POKEMON_VIEW_TYPE.VIEW_ALL_POKEMON);
  };

  const onShowOneButtonClicked = () => {
    setFilteredPokemonList([Object.keys(pokemonURLList)[0]]);
    setFilterView(POKEMON_VIEW_TYPE.VIEW_ONE_POKEMON);
  };

  const getFavouritesButton = () => {
    return (
      <button
        id={POKEMON_VIEW_TYPE.VIEW_FAVOURITE_POKEMON}
        className={
          filterView === POKEMON_VIEW_TYPE.VIEW_FAVOURITE_POKEMON ? "filter-btn selected" : "filter-btn"
        }
        disabled={!favButtonEnabled}
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
        id={POKEMON_VIEW_TYPE.VIEW_ALL_POKEMON}
        className={
          filterView === POKEMON_VIEW_TYPE.VIEW_ALL_POKEMON ? "filter-btn selected" : "filter-btn"
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
        id={POKEMON_VIEW_TYPE.VIEW_ONE_POKEMON}
        className={
          filterView === POKEMON_VIEW_TYPE.VIEW_ONE_POKEMON ? "filter-btn selected" : "filter-btn"
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

  const onAddToFavourite = (tasktype, pokemonName) => {
    const updatedFavouritePokemonList = favouritePokemonList;
    if (tasktype === "add") {
      updatedFavouritePokemonList.add(pokemonName);
      setFavouritePokemonList(updatedFavouritePokemonList);
    } else {
      updatedFavouritePokemonList.delete(pokemonName);
      setFavouritePokemonList(updatedFavouritePokemonList);
    }

    if (updatedFavouritePokemonList.size !== 0) setFavButtonEnabled(true);
    else setFavButtonEnabled(false);

    if (filterView === POKEMON_VIEW_TYPE.VIEW_FAVOURITE_POKEMON) {
      setFilteredPokemonList([...updatedFavouritePokemonList]);
    }
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
          favouritePokemonList={favouritePokemonList}
        />
      ));
    else {
      return (
        <div className="no-pokemon-container">
          No Pokémon found. Try a different filter or remove the current one.
        </div>
      );
    }
  };

  const onOptionClick = (e) => {
    setFilterView(POKEMON_VIEW_TYPE.VIEW_ONE_POKEMON);
    setFilteredPokemonList([e.target.value]);
  };

  const getDropDownOptions = () => {
    return Object.keys(pokemonURLList).map((pokemonName) => (
      <option key={pokemonName} value={pokemonName}>
        {pokemonName}
      </option>
    ));
  };
  const onSearchTextUpdate = (searchText) => {
    const allPokemonNames = Object.keys(pokemonURLList);
    if (searchText === "") {
      setFilteredPokemonList(allPokemonNames);
      return;
    }
    const searchTextFilteredPokemon = allPokemonNames.filter((pokemonName) =>
      pokemonName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPokemonList(searchTextFilteredPokemon);
  };

  const getSearchPokemonInput = () => {
    // Early return.
    if (filterView !== POKEMON_VIEW_TYPE.VIEW_ALL_POKEMON) return;
    return <SearchPokemon updateSearchText={onSearchTextUpdate} />;
  };

  const getOnePokemonSelector = () => {
    // Early return.
    if (filterView !== POKEMON_VIEW_TYPE.VIEW_ONE_POKEMON) return;
    return (
      <div className="select-pokemon">
        <select
          id="select-pokemon"
          className="selection"
          name="pokemon"
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
        {getSearchPokemonInput()}
        {getOnePokemonSelector()}
        <div
          className={
            filterView === POKEMON_VIEW_TYPE.VIEW_ONE_POKEMON ? "show-one-pokemon" : "pokemon-cars"
          }
          id="add-fav-pokemon"
        >
          {" "}
          {getPokeMons()}
        </div>
      </div>
    </div>
  );
};

export default Body;
