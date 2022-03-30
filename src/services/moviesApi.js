const API_KEY = '9f7c5da3425a9d17909027ad2b61278f';
const BASE_URL = 'https://api.themoviedb.org/3/';

function fetchPopularMovies() {
  return fetch(`${BASE_URL}/trending/movies/week?api_key=${API_KEY}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
    }
  );
}
function fetchDetails(id) {
  return fetch(`${BASE_URL}movie/${id}?api_key=${API_KEY}`).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
}
function fetchCast(id) {
  return fetch(`${BASE_URL}movie/${id}/credits?api_key=${API_KEY}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
    }
  );
}
function fetchReviews(id) {
  return fetch(`${BASE_URL}movie/${id}/reviews?api_key=${API_KEY}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
    }
  );
}
function fetchMovies(movie) {
  return fetch(
    `${BASE_URL}search/movie?api_key=${API_KEY}&query=${movie}&page=1`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
}

const api = {
  fetchPopularMovies,
  fetchDetails,
  fetchCast,
  fetchReviews,
  fetchMovies,
};

export default api;
