import React, { useState, useEffect } from 'react';
import './App.css';
import jwt_decode from 'jwt-decode';
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
import Cart from './Components/Cart/Cart';

function App() {
  const [Items, setItems] = useState({
    product:[],
    productXMayor: [],
    productXMenor: [],
    categories: [],
  });

  //Cambia de estado minorista o mayorista
  const [typeSale, setTypeSale] = useState({ sale: "minorista" })
  const getTipoVenta = ((valor) => {
    setTypeSale({ sale: valor })
  })

  //Si esta logueado guarda el usuario, lo decofifica y lo paso al header
  const [log, setLog] = useState({ })
  const getLogin= ((local)=>{
    
    if(local != ""){
        const decoded = jwt_decode(local)
        setLog({
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            log: true
        })
    }
})

//cant de articulos en el carrito
  const [productCat, setProductCat] = useState({})
  const productXMayor = JSON.parse(localStorage.getItem("mayorista")) || [];
  const productXMenor = JSON.parse(localStorage.getItem("minorista")) || [];
  const [cartLength, setCartLength] = useState();
  function setear(data) {
    setCartLength(data);
  }

  //Se ejecuta luego del renderizado, guarda las categorias
  useEffect(() => {
    fetch("http://localhost:4000/categories")
      .then(resp => resp.json())
      .then(data => {
        setItems({
          ...Items,
          categories: data
        })
      });
  }, [])

  function getById(id) {
    fetch("http://localhost:4000/products/" + id)
      .then(resp => resp.json())
      .then(data => {
        setItems({
          ...Items,
          product: data
        })
      })

    fetch("http://localhost:4000/categories/" + id)
      .then(resp => resp.json())
      .then(data => {
        setProductCat(data)
      })
  }

  
  return (
    
    <Router>
      <Header log={log}  categories={Items.categories} getTipoVenta={(valor) => getTipoVenta(valor)} getById={(id) => getById(id)} cartLength={cartLength} />
      <Switch>
        <Route path="/categories/:id" >
          <Categories typeSale={typeSale.sale} products={Items.product} nombreCat={productCat} />
        </Route>
        <Route path="/login"  > <Login getLogin={(local)=> getLogin(local)} /> </Route>
        <Route path="/register" />
        <Route path="/profile" component={Profile} />
        <Route path="/productPage/:id">
          <ProductPage typeSale={typeSale} setear={data => setear(data)} />
        </Route>
        <Route path="/cart">
          <Cart setear={data => setear(data)} productXMayor={productXMayor} productXMenor={productXMenor} />
        </Route>
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
