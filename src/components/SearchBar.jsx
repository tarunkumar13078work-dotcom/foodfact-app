import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    onSearch(trimmedQuery);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} role="search" aria-label="Search food products">
      <label className="sr-only" htmlFor="food-search">
        Search food products
      </label>
      <input
        id="food-search"
        className="search-input"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for a food, like banana or oats"
        autoComplete="off"
      />
      <button className="search-button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;