// == Import npm
import React from 'react';

import {
  Switch,
  Route,
} from 'react-router-dom';


import Home from 'src/containers/Home';
import Menu from 'src/containers/Menu';
import Search from 'src/containers/Search';
import Results from 'src/containers/Results';
import UserProfile from 'src/containers/UserProfile';
import ListDetails from 'src/containers/ListDetails';
import BookDetails from 'src/containers/BookDetails';
import Error from 'src/components/Error';
import Footer from 'src/components/Footer';

// == Import
import './styles.scss';

// == Composant
const App = () => (

  <div className="app">
    <Menu />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/results" exact>
        <Search />
        <Results />
      </Route>
      <Route path="/result/:id" exact>
        <BookDetails />
      </Route>
      <Route path="/profil/:pseudo/:id" exact>
        <UserProfile />
      </Route>
      <Route path="/list/:label/:id" exact>
        <ListDetails />
      </Route>
      <Route path="/login" exact>
        <Home />
      </Route>
      <Route path="/search" exact>
        <Home />
      </Route>
      <Route>
        <Error />
      </Route>
    </Switch>
    <Footer />
  </div>
);

// == Export
export default App;
