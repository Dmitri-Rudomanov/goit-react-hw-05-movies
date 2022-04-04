import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ShowMore from 'react-simple-show-more';
import moviesApi from '../../services/moviesApi.js';
import s from './Reviews.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    moviesApi.fetchReviews(movieId).then(({ results }) => setReviews(results));
  }, [movieId]);
  const reviewsCheck = reviews && reviews.length === 0;
  return (
    <>
      <ul className={s.wrapper}>
        {reviews &&
          reviews.map(review => (
            <li key={review.id} className={s.reviewCard}>
              <div>
                <p className={s.reviewAuthor}>{review.author}</p>
                <p className={s.reviewContent}>
                  <ShowMore
                    text={review.content}
                    length={500}
                    showMoreLabel=" Show more >>"
                    showLessLabel=" Show less <<"
                    style={{
                      cursor: 'pointer',
                      color: 'rgba(238, 138, 16, 0.952)',
                      fontWeight: 'bold',
                    }}
                  />
                </p>
              </div>
            </li>
          ))}
      </ul>
      {reviewsCheck && (
        <h2>Sorry,we havent found any reviews for this movie</h2>
      )}
    </>
  );
}
