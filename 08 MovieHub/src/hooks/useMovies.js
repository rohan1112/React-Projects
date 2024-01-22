import { useState, useEffect } from "react";

const KEY = "752d059f";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    callback?.();
    const abortController = new AbortController();
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?&apikey=${KEY}&s=${query}`,
          {
            signal: abortController.signal,
          }
        );
        if (!res.ok) throw new Error("Something Went Wrong In Fetching Data");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie Not Found");
        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return () => {
      abortController.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
