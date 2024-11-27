import React from 'react'
import { useRouteError } from 'react-router-dom'

const NotFoundPokemonPage = () => {
    const error = useRouteError();
    const { status, statusText } = error;
    return (
      <h1>
        {status}:{statusText}
      </h1>
    );
}

export default NotFoundPokemonPage