import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Body from './Components/Home/Home/Body';
import Header from './Components/Home/Header/Header';
import Footer from './Components/Home/Footer/Footer';
import ProductPage from './Components/Product/ProductPage';
import Admin from './Components/User/Admin/Admin';
import Categories from './Components/Product/Categories';




function App() {
  const [Items, setItems] = useState({
    product: [],
    categories:[]
});

useEffect(() => {
  fetch("http://localhost:4000/categories")
  .then(resp => resp.json())
  .then(data => {
      console.log(data)
      setItems({
          ...Items,
          categories: data
      })
  })
}, [])

  return (
    <Router>
      <Header categories={Items.categories}/>
      <Switch>
        <Route path="/categories/:id" />
        
        <Route path="/admin" >
          <Admin />
        </Route>
        <Route exact path="/" >
        <Body />
        </Route>
      </Switch>
      <Footer  categories={Items.categories}/>
    </Router>
  );
}

export default App;
