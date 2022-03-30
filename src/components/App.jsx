import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from './Container/Container.js';
import AppBar from './AppBar/AppBar.js';

const HomePage = lazy(() =>
  import('../views/HomePage.js' /* webpackChunkName: "home-page" */)
);
const MoviesPage = lazy(() =>
  import('../views/MoviesPage.js' /* webpackChunkName: "movies-page" */)
);
const MovieDetailsPage = lazy(() =>
  import(
    '../views/MovieDetailsPage.js' /* webpackChunkName: "movie-details-page" */
  )
);
const Cast = lazy(() =>
  import('../views/Cast.js' /* webpackChunkName: "cast-page" */)
);

export default function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<h1>Loading....</h1>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
        </Routes>
      </Suspense>
      <Suspense fallback={<p>FFF</p>}>
        <Routes>
          <Route path="/movies/:movieId/cast" element={<Cast />} />
        </Routes>
      </Suspense>
    </Container>
  );
}
