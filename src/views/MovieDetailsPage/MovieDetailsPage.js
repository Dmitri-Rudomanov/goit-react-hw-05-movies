import { useState, useEffect, lazy } from 'react';
import { NavLink, useParams, useLocation, useNavigate } from 'react-router-dom';
import moviesApi from '../../services/moviesApi.js';
import s from './MovieDetailsPage.module.css';

const Loader = lazy(() =>
  import('components/Loader/Loader.js' /* webpackChunkName: "loader" */)
);

export default function MovieDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
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
  const onGoBack = () => {
    navigate(-1);
  };

  const movieCheck = !movie && !isLoading;

  return (
    <>
      {isLoading && <Loader />}
      <button type="button" onClick={onGoBack} className={s.backBtn}>
        Back {location?.state?.from?.label}
      </button>
      <hr />
      {movie && (
        <div className={s.body}>
          <div className={s.Wrapper}>
            <div className={s.movieImg}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${
                  movie.poster_path ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.title ? movie.title : movie.name}
                width="250"
              />
            </div>
            <div>
              <h2 className={s.movieTitle}>
                {movie.title ? movie.original_title : movie.name}
              </h2>
              <p className={s.score}>User score: {movie.vote_average}</p>
              <h3>Overview</h3>
              <p className={s.overview}>{movie.overview}</p>
              <h3>Genres</h3>
              <ul>
                {movie.genres.map(genre => (
                  <li key={genre.id} className={s.genre}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <p className={s.info}>Additional information</p>
            <ul>
              <li>
                <NavLink
                  to={`/movies/${movie.id}/cast`}
                  state={{
                    from: { location },
                  }}
                  className={s.infoItem}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/movies/${movie.id}/reviews`}
                  state={{ from: { location } }}
                  className={s.infoItem}
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
