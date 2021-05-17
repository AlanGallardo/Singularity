import React  from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import ArticleDetails from './components/ArticleDetails/ArticleDetails';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <NavBar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/articles" />} /* <- You don't want to do this */ />
          <Route path="/articles" exact component={Home} />
          <Route path="/articles/search" exact component={Home} />
          <Route path="/articles/:id" component={ArticleDetails} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/articles" />)} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;