import React, { useEffect } from 'react'
import { useState } from 'react';
import ShimmerPokemonCard from './ShimmerPokemonCard';
import { useParams } from 'react-router-dom';

const PokemonPage = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const { id } = useParams();

  // Data is already present in the body component. Need to find a waay to fetch it.
  // instead of hitting api call again
  const fetchPokemonData = async () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/'+id+'/'
    const pokemonApiResponse = await fetch(url);
    const pokemonData = await pokemonApiResponse.json();
    setPokemonData(pokemonData);
    return pokemonData;
  }

  useEffect(() => {
    fetchPokemonData();
  },[])
 
  if (!pokemonData) 
    return <ShimmerPokemonCard />

   const { abilities, height, weight, sprites, name } = pokemonData;
   const ability = abilities?.map((abilityObj) => abilityObj.ability.name);
   const imgUrl = sprites?.other?.showdown?.front_default;
  
    return (
      <div>
        PokemonPage
        <ul>
          <li>
            {" "}
            <img
              className="pokemon-card-pic"
              style={{ height: 130, width: 130 }}
              alt={name}
              src={imgUrl}
            />
          </li>
          <li> Front gif</li>
          <li> back gif </li>
          <li> Cries </li>
          <li> {height}</li>
          <li> {weight}</li>
          <li> {ability.join(",")}</li>
        </ul>
      </div>
    );
}

export default PokemonPage