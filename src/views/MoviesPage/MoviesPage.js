import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar.js';
import moviesApi from '../../services/moviesApi.js';
import s from './MoviesPage.module.css';

export default function MoviesPage() {
  const location = useLocation();
  const [movies, setMovies] = useState();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (localStorage.getItem('SearchedMovies')) {
      const StoragedMovies = localStorage.getItem('SearchedMovies');
      const parsedMovies = JSON.parse(StoragedMovies);
      console.log(parsedMovies);
      setMovies(parsedMovies);
    }
  }, []);

  useEffect(() => {
    if (!query) {
      return;
    }
    moviesApi.fetchMovies(query).then(({ results }) => {
      localStorage.setItem('SearchedMovies', JSON.stringify(results));
      const StoragedMovies = localStorage.getItem('SearchedMovies');
      const parsedMovies = JSON.parse(StoragedMovies);
      console.log(parsedMovies);
      setMovies(parsedMovies);
    });
  }, [query]);

  const onHandleSubmit = search => {
    if (query === search) {
      return;
    }
    setQuery(search);
  };
  const ErrorCheck = movies && movies.length === 0 && query !== '';
  return (
    <>
      <SearchBar onHandleSubmit={onHandleSubmit} />
      {movies && (
        <div className={s.wrapper}>
          {movies.map(movie => (
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: { location, label: 'Movies' } }}
              key={movie.id}
              className={s.card}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${
                  movie.poster_path ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.title ? movie.title : movie.name}
                width="250"
              />
              <div className={s.descriptions}>
                <h1 className={s.title}>
                  {movie.original_title ? movie.original_title : movie.name}
                </h1>

                <p>{movie.overview}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      {ErrorCheck && (
        <h2>Sorry,there is no movie matching search query:{query} </h2>
      )}
    </>
  );
}
