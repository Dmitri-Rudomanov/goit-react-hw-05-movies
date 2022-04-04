import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from './Container/Container.js';
import AppBar from './AppBar/AppBar.js';
import Loader from './Loader/Loader.js';
const HomePage = lazy(() =>
  import('../views/HomePage/HomePage.js' /* webpackChunkName: "home-page" */)
);
const MoviesPage = lazy(() =>
  import(
    '../views/MoviesPage/MoviesPage.js' /* webpackChunkName: "movies-page" */
  )
);
const MovieDetailsPage = lazy(() =>
  import(
    '../views/MovieDetailsPage/MovieDetailsPage.js' /* webpackChunkName: "movie-details-page" */
  )
);
const Cast = lazy(() =>
  import('../views/Cast/Cast.js' /* webpackChunkName: "cast-page" */)
);
const Reviews = lazy(() =>
  import('../views/Reviews/Reviews.js' /* webpackChunkName: "reviews-page" */)
);

export default function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
        </Routes>
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/movies/:movieId/cast" element={<Cast />} />
          <Route path="/movies/:movieId/reviews" element={<Reviews />} />
        </Routes>
      </Suspense>
    </Container>
  );
}
