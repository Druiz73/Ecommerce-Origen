import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Body from './Components/Home/Home/Body';
import Header from './Components/Home/Header/Header';
import Footer from './Components/Home/Footer/Footer';
import ProductPage from './Components/Product/ProductPage';
import Admin from './Components/User/Admin/Admin';
import Categories from './Components/Product/Categories';
import Register from './Components/User/Register/Register';
import Login from './Components/User/Login/Login';
import Profile from './Components/User/Profile/Profile';




function App() {
  const [Items, setItems] = useState({
    product: [],
    categories: []
  });

  useEffect(() => {
    fetch("http://localhost:4000/categories")
      .then(resp => resp.json())
      .then(data => {
        setItems({
          ...Items,
          categories: data
        })
      })
  }, [])

  return (
    <Router>
      <Header categories={Items.categories} />
      <Switch>
        <Route path="/categories/:id" >
          <Categories />
        </Route>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/productPage" component={ProductPage}/>
        <Route path="/admin" >
          <Admin />
        </Route>
        <Route exact path="/" >
          <Body />
        </Route>
      </Switch>
      <Footer categories={Items.categories} />
    </Router>
  );
}

export default App;
