import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import moviesApi from '../../services/moviesApi.js';

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

  return (
    <>
      {trending && (
        <ul>
          {trending.map(trend => (
            <li key={trend.id}>
              <Link
                to={`/movies/${trend.id}`}
                state={{ from: { location, label: 'Home-Page' } }}
              >
                {trend.original_title ? trend.original_title : trend.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}