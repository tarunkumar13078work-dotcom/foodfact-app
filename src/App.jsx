import { useState } from 'react';
import SearchBar from './components/SearchBar';
import FoodList from './components/FoodList';
import './App.css';

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    // Keep the UI responsive by showing loading while the request is in flight.
    setLoading(true);
    setHasSearched(true);

    try {
      const endpoint = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(trimmedQuery)}&search_simple=1&action=process&json=1`;
      const response = await fetch(endpoint);
      const data = await response.json();

      const validProducts = Array.isArray(data?.products)
        ? data.products.filter((product) => product?.product_name && product.product_name.trim() !== '')
        : [];

      setResults(validProducts);
    } catch (error) {
      // Fail safely so the page keeps working even if the network request fails.
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const showInitialState = !hasSearched && !loading;
  const showNoResults = hasSearched && !loading && results.length === 0;
  const showResults = !loading && results.length > 0;

  return (
    <div className="app-shell">
      <main className="app-container">
        <section className="hero-card">
          <p className="hero-kicker">FoodFacts</p>
          <h1 className="hero-title">Search real nutrition data from Open Food Facts.</h1>
          <p className="hero-copy">
            Type a food name, browse the returned products, and inspect calories, protein, carbs, and fats in a clean responsive layout.
          </p>
          <SearchBar onSearch={handleSearch} />
        </section>

        {loading && (
          <section className="status-card loading-state" aria-live="polite" aria-busy="true">
            <span className="loading-spinner" aria-hidden="true"></span>
            <p>Loading food products...</p>
          </section>
        )}

        {showInitialState && (
          <section className="status-card empty-state" aria-live="polite">
            <h2>Start your search</h2>
            <p>Try a simple query like banana, oats, milk, or peanut butter to see live nutrition cards.</p>
          </section>
        )}

        {showNoResults && (
          <section className="status-card empty-state" aria-live="polite">
            <h2>No results found</h2>
            <p>Try a different search term or a broader food category.</p>
          </section>
        )}

        {showResults && <FoodList products={results} />}
      </main>
    </div>
  );
}

export default App;