import React from "react";
import "../Css/Body.css";
import PokemonCard from "./PokemonCard";
import { useState, useEffect } from "react";
import { initTourGuide, PokemonTourSteps } from "./Tour";
import SearchPokemon from "./SearchPokemon";

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
  // contains all fetch pokemon with its details.
  const [pokemonList, setPokemonList] = useState({});
  // constain all the pokemon details with it URL
  const [pokemonURLList, setPokemonURLList] = useState({});
  // contain what pokemon to be displayed
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  // contain a list of favourite pokemon
  const [favouritePokemonList, setFavouritePokemonList] = useState(new Set());
  // denotes current filter view state
  const [filterView, setFilterView] = useState("show-one");
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
      filterView === "show-all"
        ? setFilteredPokemonList(Object.keys(results))
        : setFilteredPokemonList([Object.keys(results)[0]]);
    };

    callFetchUserDetails();
    initTourGuide(PokemonTourSteps);
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
        id="favourites"
        className={
          filterView === "favourites" ? "filter-btn selected" : "filter-btn"
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
        id="show-all"
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
        id="show-one"
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

    if (filterView === "favourites") {
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
    if (filterView !== "show-all") return;
    return <SearchPokemon updateSearchText={onSearchTextUpdate} />;
  };

  const getOnePokemonSelector = () => {
    // Early return.
    if (filterView !== "show-one") return;
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
            filterView === "show-one" ? "show-one-pokemon" : "pokemon-cars"
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
