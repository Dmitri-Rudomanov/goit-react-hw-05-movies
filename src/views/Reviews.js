import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ShowMore from 'react-simple-show-more';
import moviesApi from '../services/moviesApi.js';

export default function Cast() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    moviesApi.fetchReviews(movieId).then(({ results }) => setReviews(results));
  }, [movieId]);

  return (
    <>
      <ul>
        {reviews &&
          reviews.map(review => (
            <li key={review.id}>
              <div>
                <p>{review.author}</p>
                <p>
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
    </>
  );
}
