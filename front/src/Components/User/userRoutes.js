import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import Login from './Login/Login';
import Register from './Register/Register';
import Admin from './Admin/Admin';




export default function userRoutes() {

  return (
    <Router>
      <Switch>
      <Route  path="/login" component={Login}/>
        <Route  path="/register" component={Register}/>
        <Route  path="/admin" component={Admin}/>
        <Route exact path="/" >
        <Admin />
        </Route>    
      </Switch>
    </Router >
  )
}
