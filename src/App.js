import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import FilmPage from "./pages/FilmPage";
import CharacterPage from "./pages/CharacterPage";

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/films/:filmId" component={FilmPage} />
        <Route exact path="/characters/:charId" component={CharacterPage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
