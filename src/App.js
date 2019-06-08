import React, { Component } from 'react'
import FirstPage  from './FirstPage'
import Register  from './Register'
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

export default class App extends Component {
  render() {
      return(
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={FirstPage} />
            <Route exact path="/Register" component={Register} />

          </Switch> 
        </BrowserRouter>
      )
  }
}
