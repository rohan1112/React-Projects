import { useState } from "react";
import Navbar, { Logo, NumResults, Search } from "./components/Navbar";
import MainBox, {
  Box,
  MovieList,
  WatchedMovieList,
  WatchedSummary,
} from "./components/MainBox";
import { useEffect } from "react";
import Loader from "./components/Loader";
import StarRating from "./components/StarRating";

export const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

export const tempWatchedData = [
  {
    imdbID: "tt1375666",
    title: "Inception",
    Year: "2010",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    title: "Back to the Future",
    Year: "1985",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = "752d059f";

const URL = `http://www.omdbapi.com/?&apikey=${KEY}`;

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState(() => {
    const stored = localStorage.getItem("watched");
    return JSON.parse(stored);
  });

  const handleSelectMovie = (id) => {
    setSelectedId(id === selectedId ? null : id);
  };

  const handleBackButton = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (newMovie) => {
    setWatched((watched) => [...watched, newMovie]);
  };

  const removeWatchedMovie = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  useEffect(() => {
    const abortController = new AbortController();
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(URL + `&s=${query}`, {
          signal: abortController.signal,
        });
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

    handleBackButton();
    fetchMovies();

    return () => {
      abortController.abort();
    };
  }, [query]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);
  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <MainBox>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              handleSelectMovie={handleSelectMovie}
            ></MovieList>
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              handleBackButton={handleBackButton}
              key={selectedId}
              handleAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                removeWatchedMovie={removeWatchedMovie}
              ></WatchedMovieList>
            </>
          )}
        </Box>
      </MainBox>
    </>
  );
}

function MovieDetails({
  selectedId,
  handleBackButton,
  handleAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const res = await fetch(URL + `&i=${selectedId}`);
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    };
    getMovieDetails();
  }, [selectedId]);

  const {
    Title: title,
    Released: released,
    Runtime: runtime,
    Actors: actors,
    Poster: poster,
    Genre: genre,
    Plot: plot,
    Director: director,
    imdbRating,
  } = movie;

  const addWatchedMovie = () => {
    const newMovie = {
      imdbID: selectedId,
      imdbRating: Number(imdbRating),
      poster,
      runtime: runtime.split(" ").at(0),
      title,
      userRating,
    };
    handleAddWatched(newMovie);
    handleBackButton();
  };

  useEffect(() => {
    document.title = `${title}`;

    return () => {
      document.title = "MovieHub";
    };
  }, [title]);

  useEffect(() => {
    const handleEvent = (e) => {
      if (e.code === "Escape") handleBackButton();
    };
    document.addEventListener("keydown", handleEvent);

    return () => {
      document.removeEventListener("keydown", handleEvent);
    };
  }, []);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleBackButton}>
              &larr;
            </button>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={addWatchedMovie}>
                      + Add to Watch List
                    </button>
                  )}
                </>
              ) : (
                <div>
                  You have already rated this movie with {watchedRating}
                </div>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directd by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>❌</span>
      {message}
    </p>
  );
}
