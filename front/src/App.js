import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Login from './Components/User/Login/Login';
import Register from './Components/User/Register/Register';
import Admin from './Components/User/Admin/Admin';
import Header from './Components/Header/Header';
import ProductPage from './Components/Product/ProductPage'

function App() {
  return (
    <Router>
      <Switch>
        <Header />
        <Route path="/productPage" component={ProductPage}/>
        <Route  path="/login" component={Login}/>
        <Route  path="/register" component={Register}/>
        <Route  path="/admin" component={Admin}/>
        <Route exact path="/" ></Route>
      </Switch>
    </Router>
  );
}

export default App;
