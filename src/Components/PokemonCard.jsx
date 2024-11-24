import "../Css/PokemonCard.css";
import { useEffect } from "react";

const PokemonCard = (props) => {
  const { pokemonData } = props;
  const { abilities, height, weight, sprites, id, name } = pokemonData;
  const ability = abilities.map((abilityObj) => abilityObj.ability.name);
  const url = sprites?.other?.showdown?.front_default;
  return (
    <div className="pokemon-card-container">
      <div className="pokemon-card">
        <img
          className="pokemon-card-pic"
          style={{ height: 130, width: 130 }}
          alt={name}
          src={url}
        />
        <div className="pokemon-details">
          <div>{name}</div>
          <div>{ability.join(",")}</div>
          <div>{weight} grms</div>
          <div>{height} cms</div>
        </div>
      </div>
      <div className="add-fav-btn">Add to Favourites</div>
    </div>
  );
};

export default PokemonCard;
