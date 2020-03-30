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
import Categories from './Components/Product/Categories';
import Register from './Components/User/Register/Register';
import Login from './Components/User/Login/Login';
import Profile from './Components/User/Profile/Profile';
import Cart from './Components/Cart/Cart';
import Page404 from './Components/User/Page404/Page404';
import SaleReturn from './Components/Product/SaleReturn'
import UserRoutes from './Components/User/Admin/UserRoutes';
import backUrl from './configUrl'

function App() {
  const [Items, setItems] = useState({
    product: [],
    productXMayor: [],
    productXMenor: [],
    home: []
  });

  const [productHome, setproductHome] = useState([])

  const [categories, setCategories] = useState({ categories: [] })


  //Cambia de estado minorista o mayorista
  const [typeSale, setTypeSale] = useState({ sale: "minorista" });
  const getTipoVenta = ((valor) => {
    setTypeSale({ sale: valor })
  });


  //Si esta logueado guarda el usuario, lo decofifica y lo paso al header
  const [log, setLog] = useState({})
  const getLogin = ((local) => {
    if (local !== "") {
      try {
        const decoded = jwt_decode(local)
        setLog({
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          log: true
        })
      }
      catch{ console.log("no logueado") }
    }
  })

  //cant de articulos en el carrito
  const [productCat, setProductCat] = useState({ nombre: "" })
  const productXMayor = JSON.parse(localStorage.getItem("mayorista")) || [];
  const productXMenor = JSON.parse(localStorage.getItem("minorista")) || [];
  const totalCart = productXMayor.length + productXMenor.length;
  const [cartLength, setCartLength] = useState(totalCart);
  function setear(mayor, menor) {
    let total = mayor + menor
    setCartLength(total);
  }

  //verificacion si existe usuario logueado
  const userLog = localStorage.getItem("usertoken") || [];

  //Se ejecuta luego del renderizado, guarda las categorias
  useEffect(() => {
    fetch(`${backUrl}/categories`)
      .then(resp => resp.json())
      .then(data => {
        setCategories({
          ...categories,
          categories: data
        })
      });

    fetch(`${backUrl}/categories/home`)
      .then(resp => resp.json())
      .then(data => {
        setItems({
          ...Items,
          home: data
        })
      });

    fetch(`${backUrl}/products/random`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(data => {
        setproductHome(data)
      })

    getLogin(userLog);
    setear(productXMayor.length, productXMenor.length)
  }, [])

  //envio id de categorias, busco productos por categorias y categorias en sí
  function getById(id) {
    fetch(`${backUrl}/products/` + id)
      .then(resp => resp.json())
      .then(data => {
        setItems({
          ...Items,
          product: data
        })
      })

    fetch(`${backUrl}/categories/` + id)
      .then(resp => resp.json())
      .then(data => {
        setProductCat({ ...productCat, nombre: data.nombre })
      })
  }

  return (
    <Router>
      <Header log={log} categories={categories.categories} getTipoVenta={(valor) => getTipoVenta(valor)} getById={(id) => getById(id)} cartLength={cartLength} />
      <Switch>
        <Route path="/administrar" component={UserRoutes} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/returnMercado" component={SaleReturn} />
        <Route path="/categories/:id" >
          <Categories getTipoVenta={(valor) => getTipoVenta(valor)} typeSale={typeSale.sale} products={Items.product} nombreCat={productCat.nombre} />
        </Route>
        <Route path="/login"  >
          <Login getLogin={(local) => getLogin(local)} />
        </Route>
        <Route path="/productPage/:id">
          <ProductPage typeSale={typeSale} setear={(mayor, menor) => setear(mayor, menor)} />
        </Route>
        <Route path="/cart">
          <Cart setear={(mayor, menor) => setear(mayor, menor)} productXMayor={productXMayor} productXMenor={productXMenor} log={log} />
        </Route>
        <Route path="/" >
          <Body categoriesHome={Items.home} getById={(id) => getById(id)} productHome={productHome} />
        </Route>
        <Route path="*" component={Page404} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
