import { useState } from 'react';
import '../Css/SearchPokemon.css';

const SearchPokemon = (props) => {
  const { updateSearchText } = props;
  const [searchText, setSearchText] = useState("");

  const onSearchBtnClicked = () => {
    updateSearchText(searchText);
  };
  return (
    <div className="search-pokemon">
      <div className="search-pokemon-container">
        <input
          className="search-input-box"
          type="search"
          name="search-poke"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button className="search-input-btn" onClick={onSearchBtnClicked}>
          {" "}
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchPokemon;;