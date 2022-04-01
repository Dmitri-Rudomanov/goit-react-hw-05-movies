import { useState, useEffect } from 'react';
import {
  NavLink,
  useRouteMatch,
  useHistory,
  useLocation,
  Link,
} from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar.js';
import moviesApi from '../services/moviesApi.js';

export default function MoviesPage() {
  const location = useLocation();
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState('');
  console.log(location);
  useEffect(() => {
    if (!query) {
      return;
    }
    moviesApi.fetchMovies(query).then(({ results }) => {
      setMovies(results);
      return results;
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
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: {
                    from: {
                      location,
                      label: 'Back to Movies page',
                    },
                  },
                }}
              >
                {movie.original_title ? movie.original_title : movie.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {ErrorCheck && (
        <h2>Sorry,there is no movie matching search query:{query} </h2>
      )}
    </>
  );
}
