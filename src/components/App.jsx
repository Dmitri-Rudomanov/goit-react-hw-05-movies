import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from './Container/Container.js';
import AppBar from './AppBar/AppBar.js';

export default function App() {
  return (
    <Container>
      <AppBar />

      <Suspense>
        <Switch>
          <Route path="/" exact></Route>
          <Route path="/movies" exact></Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
