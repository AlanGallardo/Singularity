import React  from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';
import Forum from './components/Forum/Forum';
import ArticleDetails from './components/ArticleDetails/ArticleDetails';
import QuestionDetails from './components/Forum/QuestionDetails/QuestionDetails';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <NavBar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/articles" />} />
          <Route path="/articles" exact component={Home} />
          <Route path="/articles/search" exact component={Home} />
          <Route path="/articles/:id" component={ArticleDetails} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/articles" />)} />
          <Route path="/profile/:user" exact component={Profile} />
          <Route path="/forum" exact component={Forum} />
          <Route path="/forum/:id" component={QuestionDetails} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;