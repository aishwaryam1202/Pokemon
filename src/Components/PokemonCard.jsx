import "../Css/PokemonCard.css";
import { useEffect, useState } from "react";

const PokemonCard = (props) => {
  const { pokemonName, url, updateCollectedPokemonDetails, pokemonList } =
    props;
  const [activePokemonData, setActivePokemonData] = useState({});

  const fetchPokemonDetail = async (url) => {
    try {
      const pokemonApiResponse = await fetch(url);
      if (!pokemonApiResponse.ok) {
        throw new Error("Failed to fetch pokemonDetail");
      }
      const pokemonData = await pokemonApiResponse.json();
      return pokemonData;
    } catch (e) {}
  };

  useEffect(() => {
    if (pokemonList[pokemonName]) {
      setActivePokemonData(pokemonList[pokemonName]);
      return;
    }
    const callFetchUserDetails = async () => {
      const results = await fetchPokemonDetail(url);
      updateCollectedPokemonDetails(pokemonName, results);
      setActivePokemonData(results);
    };
    callFetchUserDetails();
  }, []);

  if (activePokemonData && Object.keys(activePokemonData) === 0) {
    return <></>;
  }

  const { abilities, height, weight, sprites, id, name } = activePokemonData;
  const ability = abilities?.map((abilityObj) => abilityObj.ability.name);
  const imgUrl = sprites?.other?.showdown?.front_default;
  return (
    <div className="pokemon-card-container">
      <div className="pokemon-card">
        <img
          className="pokemon-card-pic"
          style={{ height: 130, width: 130 }}
          alt={name}
          src={imgUrl}
        />
        <div className="pokemon-details">
          <div>{name}</div>
          <div>{ability?.join(",")}</div>
          <div>{weight} grms</div>
          <div>{height} cms</div>
        </div>
      </div>
      <div className="add-fav-btn">Add to Favourites</div>
    </div>
  );
};

export default PokemonCard;
