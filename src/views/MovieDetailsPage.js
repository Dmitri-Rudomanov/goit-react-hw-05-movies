import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import moviesApi from '../services/moviesApi.js';

export default function MovieDetails() {
  const { moviesId } = useParams();
  useEffect(() => {
    moviesApi.fetchDetails(moviesId).then(console.log);
  }, [moviesId]);
  return <p></p>;
}
