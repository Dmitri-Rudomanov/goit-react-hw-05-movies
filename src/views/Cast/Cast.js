import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import noAvatar from '../../icons/no_avatar.jpg';

import moviesApi from '../../services/moviesApi.js';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  useEffect(() => {
    moviesApi.fetchCast(movieId).then(({ cast }) => setCast(cast));
  }, [movieId]);

  const castCheck = cast && cast.length === 0;
  return (
    <>
      {cast && (
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
                <div>
                  <p>{actor.name}</p>
                  <p>Character: {actor.character}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {castCheck && (
        <h2>Sorry,we havent found any cast members for this movie</h2>
      )}
    </>
  );
}