import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ItemNav from './ItemNav';


export default function userRoutes() {

  return (
    <Router>
      <Switch>
          <ItemNav />
        <Route exact path="/" />     
      </Switch>
    </Router >
  )
}
