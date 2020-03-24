import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginAdmin from './LoginAdmin';
import Admin from './Admin';
const local = localStorage.getItem('jokker') || '';

export default function UserRoutes() {
  return (
    <Router>
      <Switch>
        <Route path="/administrar/admin">
          <Admin local={local} />
        </Route>
        <Route exact path="/administrar" >
          <LoginAdmin />
        </Route>
      </Switch>
    </Router >
  )
}
