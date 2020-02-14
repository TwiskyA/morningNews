import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import HomePage from './HomePage';
import ThemeArticles from './ThemeArticles';
import MyArticles from './MyArticles';

class App extends Component {

  render() {

    return (

      <Router>
        <Switch>
          <Route path="/Login" exact component={Login} />
          <Route path="/HomePage" exact component={HomePage} />
          <Route path="/ThemeArticles/:id" exact component={ThemeArticles} />
          <Route path="/MyArticles" exact component={MyArticles} />
          <Login />
        </Switch>
      </Router>


    );
  }
}

export default App;