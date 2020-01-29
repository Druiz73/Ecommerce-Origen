import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Components/Home/Header/Header';
import ProductPage from './Components/Product/ProductPage';
import userRoutes from './Components/User/userRoutes';
import Admin from './Components/User/Admin/Admin';
import productRoutes from './Components/Product/productRoutes';



function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/product" component={productRoutes} />
        <Route path="/user" component={userRoutes} />
        <Route exact path="/" >
        <Admin />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
