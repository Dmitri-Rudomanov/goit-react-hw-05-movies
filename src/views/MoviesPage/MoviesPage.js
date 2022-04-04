import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar.js';
import moviesApi from '../../services/moviesApi.js';
import useStyles from '../../services/PaginationStyles.js';
import s from './MoviesPage.module.css';
import noFilm from '../../icons/film-demo.jpeg';
import { Pagination } from '@material-ui/lab';

export default function MoviesPage() {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState();
  const [movies, setMovies] = useState();
  const [query, setQuery] = useState('');
  const page = new URLSearchParams(location.search).get('page') ?? 1;
  useEffect(() => {
    if (location.search === '') {
      return;
    }

    const newSearch = new URLSearchParams(location.search).get('query');
    setQuery(newSearch, page);
  }, [location.search, page]);

  useEffect(() => {
    if (!query) {
      return;
    }
    moviesApi.fetchMovies(query, page).then(result => {
      localStorage.setItem('SearchedMovies', JSON.stringify(result));
      const StoragedMovies = localStorage.getItem('SearchedMovies');
      const parsedMovies = JSON.parse(StoragedMovies);
      setTotalPages(result.total_pages);
      setMovies(parsedMovies.results);
    });
    navigate(`?query=${query}&page=${page}`);
  }, [query, page]);

  const onHandleSubmit = search => {
    if (query === search) {
      return;
    }
    setQuery(search);
  };
  const onHandlePage = (event, PPage) => {
    location.search = `query=${query}&page=${PPage}`;
    navigate(`${location.pathname}?${location.search}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const ErrorCheck = movies && movies.length === 0 && query !== '';
  const PaginationCheck = movies && totalPages > 1;
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
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : noFilm
                }
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
      {PaginationCheck && (
        <Pagination
          className={classes.root}
          count={totalPages}
          onChange={onHandlePage}
          page={Number(page)}
          showFirstButton
          showLastButton
          size="large"
        />
      )}
      {ErrorCheck && (
        <h2>Sorry,there is no movie matching search query:{query} </h2>
      )}
    </>
  );
}
