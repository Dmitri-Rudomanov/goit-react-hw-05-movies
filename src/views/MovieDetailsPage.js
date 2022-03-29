import { NavLink, useParams, Route, Routes } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';

import moviesApi from '../services/moviesApi.js';

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);
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
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                width="250"
              />
            </div>
            <div>
              <h2>{movie.title}</h2>
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
                <NavLink to={`cast`}>Cast</NavLink>
              </li>
            </ul>
          </div>
          <Suspense fallback={<h2>LOading</h2>}>
            <Routes>
              <Route>MMMM</Route>
            </Routes>
          </Suspense>
        </div>
      )}
    </>
  );
}
