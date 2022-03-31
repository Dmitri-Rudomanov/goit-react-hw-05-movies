import {
  NavLink,
  Link,
  useParams,
  Route,
  Routes,
  useLocation,
  Router,
} from 'react-router-dom';
import { useState, useEffect, Suspense, lazy } from 'react';
import moviesApi from '../services/moviesApi.js';
import Loader from 'components/Loader/Loader.js';

export default function MovieDetails() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(null);
  const { movieId } = useParams();
  const [movie, setMovie] = useState();
  useEffect(() => {
    setIsLoading(true);
    moviesApi.fetchDetails(movieId).then(result => {
      setMovie(result);
      setIsLoading(false);
    });
  }, [movieId]);

  const movieCheck = !movie && !isLoading;

  return (
    <>
      {isLoading && <Loader />}
      {movie && (
        <div>
          <div>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500/${
                  movie.poster_path ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.title ? movie.title : movie.name}
                width="250"
              />
            </div>
            <div>
              <h2>{movie.title ? movie.original_title : movie.name}</h2>
              <p>User score: {movie.vote_average}</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul>
                {movie.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <p>Additional information</p>
            <ul>
              <li>
                <NavLink
                  to={{
                    pathname: `/movies/${movie.id}/cast`,
                    state: {
                      from: {
                        location,
                      },
                    },
                  }}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: `/movies/${movie.id}/reviews`,
                    state: {
                      from: {
                        location,
                      },
                    },
                  }}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
          <hr />
        </div>
      )}
      {movieCheck && <h2>Sorry,something went wrong with this movie page</h2>}
    </>
  );
}
