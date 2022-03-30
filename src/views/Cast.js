import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import noAvatar from '../icons/no_avatar.jpg';

import moviesApi from '../services/moviesApi.js';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  console.log(movieId);
  useEffect(() => {
    moviesApi.fetchCast(movieId).then(({ cast }) => setCast(cast));
  }, [movieId]);

  return (
    <ul>
      {cast.map(actor => (
        <li key={actor.id}>
          <div>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                  : noAvatar
              }
              alt={actor.original_name}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
