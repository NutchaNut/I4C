import React, { Component } from 'react';
import FirstPage from './FirstPage';
import Register from './Register';
import Home from './Home';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
    };
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/FirstPage"
            component={props => (
              <FirstPage
                {...props}
                userData={this.state.userData}
                callback={data => this.setState({ userData: data })}
              />
            )}
          />
          <Route exact path="/Register" component={Register} />
          <Route
            exact
            path="/Home"
            component={props => (
              <Home
                {...props}
                userData={this.state.userData}
                callback={data => this.setState({ userData: data })}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
