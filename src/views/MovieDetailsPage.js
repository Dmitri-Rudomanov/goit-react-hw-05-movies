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

export default function MovieDetails() {
  const location = useLocation();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    moviesApi.fetchDetails(movieId).then(setMovie);
  }, [movieId]);
  return (
    <>
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
            </ul>
          </div>
          <hr />
        </div>
      )}
    </>
  );
}
