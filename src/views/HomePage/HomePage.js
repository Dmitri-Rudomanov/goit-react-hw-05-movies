import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import moviesApi from '../../services/moviesApi.js';
import s from '../HomePage/HomePage.module.css';

export default function HomePage() {
  const location = useLocation();
  const [trending, setTrending] = useState(null);
  useEffect(() => {
    moviesApi.fetchPopularMovies().then(({ results }) => {
      setTrending(results);
    });
    if (localStorage.getItem('SearchedMovies')) {
      localStorage.setItem('SearchedMovies', []);
    }
  }, []);
  console.log(trending);
  return (
    <>
      {trending && (
        <div className={s.wrapper}>
          {trending.map(trend => (
            <Link
              to={`/movies/${trend.id}`}
              state={{ from: { location, label: 'Home-Page' } }}
              key={trend.id}
              className={s.card}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${
                  trend.poster_path ? trend.poster_path : trend.backdrop_path
                }`}
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
    </>
  );
}
