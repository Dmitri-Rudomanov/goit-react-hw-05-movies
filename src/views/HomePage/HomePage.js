import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import moviesApi from '../../services/moviesApi.js';
import s from '../HomePage/HomePage.module.css';
import useStyles from '../../services/PaginationStyles.js';
import noFilm from '../../icons/film-demo.jpeg';

export default function HomePage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [trending, setTrending] = useState(null);
  const [totalPages, setTotalPages] = useState();
  const page = new URLSearchParams(location.search).get('page') ?? 1;
  useEffect(() => {
    moviesApi.fetchPopularMovies(page).then(result => {
      setTrending(result.results);
      setTotalPages(result.total_pages);
    });
    if (localStorage.getItem('SearchedMovies')) {
      localStorage.setItem('SearchedMovies', []);
    }
  }, []);
  useEffect(() => {
    moviesApi.fetchPopularMovies(page).then(result => {
      setTrending(result.results);
      setTotalPages(result.total_pages);
    });
  }, [page]);

  const onHandlePage = (event, PPage) => {
    location.search = `page=${PPage}`;
    navigate(`${location.pathname}?${location.search}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const PaginationCheck = trending && totalPages > 1;
  return (
    <>
      {trending && (
        <div className={s.wrapper}>
          {trending.map(trend => (
            <Link
              to={`/movies/${trend.id}`}
              state={{ from: { location, label: 'to Home-Page' } }}
              key={trend.id}
              className={s.card}
            >
              <img
                src={
                  trend.poster_path
                    ? `https://image.tmdb.org/t/p/w500${trend.poster_path}`
                    : noFilm
                }
                alt={trend.title ? trend.title : trend.name}
                width="250"
              />
              <div className={s.descriptions}>
                <h1 className={s.title}>
                  {trend.original_title ? trend.original_title : trend.name}
                </h1>

                <p>{trend.overview}</p>
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
    </>
  );
}
