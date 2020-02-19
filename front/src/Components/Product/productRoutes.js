import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";



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
