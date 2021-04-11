import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import HomePage from "./HomePage";
import FilmPage from "./FilmPage";
import CharacterPage from "./CharacterPage";

export default function App() {
  return (
    <Router>
      <Link to="/">Home</Link>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/films/:filmId" component={FilmPage} />
        <Route exact path="/characters/:charId" component={CharacterPage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
