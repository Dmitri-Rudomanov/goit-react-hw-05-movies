import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import noAvatar from '../../icons/no_avatar.jpg';
import s from './Cast.module.css';
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
        <ul className={s.wrapper}>
          {cast.map(actor => (
            <li key={actor.id} className={s.actor}>
              <div>
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                      : noAvatar
                  }
                  alt={actor.original_name}
                  width="250"
                />
                <div className={s.descr}>
                  <p className={s.name}>{actor.name}</p>
                  <p className={s.character}>Character: {actor.character}</p>
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
