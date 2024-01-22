import { useEffect, useRef } from "react";

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

export function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>MovieHub</h1>
    </div>
  );
}

export function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(function () {
    inputEl.current.focus();
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

export function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

export default Navbar;
