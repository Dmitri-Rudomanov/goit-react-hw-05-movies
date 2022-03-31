import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import moviesApi from '../services/moviesApi.js';
import Loader from 'components/Loader/Loader.js';

export default function HomePage() {
  const location = useLocation();
  const [trending, setTrending] = useState(null);
  useEffect(() => {
    moviesApi.fetchPopularMovies().then(({ results }) => {
      setTrending(results);
    });
  }, []);

  return (
    <>
      {trending && (
        <ul>
          {trending.map(trend => (
            <li key={trend.id}>
              <Link
                to={{
                  pathname: `/movies/${trend.id}`,
                  state: {
                    from: {
                      location,
                    },
                  },
                }}
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
