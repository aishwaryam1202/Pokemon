import '../Css/PokemonCard.css'

const PokemonCard = (props) => {
  const { pokemonData } = props;
  const { abilities, height, weight, sprites, id, name } = pokemonData;
  const ability = abilities.map((abilityObj) => abilityObj.ability.name);
  const url = sprites?.other?.showdown?.front_default;
  return (
    <div className="pokemon-card">
      <img
        className="pokemon-card-pic"
        style={{ height: 100, width: 100 }}
        alt={name}
        src={url}
      />
      <div>
        <div>{name}</div>
        <div>{ability.join(',')}</div>
        <div>{weight} grms</div>
        <div>{height} cms</div>
      </div>
    </div>
  );
};

export default PokemonCard;;