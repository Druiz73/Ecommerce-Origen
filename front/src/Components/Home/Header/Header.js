import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import carrito from '../../imgs/shopping-cart-symbol-for-e-commerce_icon-icons.com_56124.png';
import NavbarCat from './NavbarCat';
import './header.css';
import logo from '../../imgs/Jokker 2.png';


export default function Header(props) {


    const [state, setstate] = useState({
        isOpen: false,
        product: [],
        log: false,
        nombre: ""
    });
    
    const logOut = (() => {
        localStorage.clear("usertoken")
    })

    const toggle = () => setstate(!state.isOpen);
    return (
        <div className="container-fluid border-bottom border-dark h-5">
            <div className="row">
                <div className="col-12 bg-dark h-5 d-flex justify-content-between">
                    <div className="col-3 text-white d-flex bd-highlight">
                        {props.log.log ? <a href="/" onClick={() => logOut()} className="text-white flex-fill bd-highlight my-auto">Cerrar sesion</a> :
                            <Link to="/register" className="text-white flex-fill bd-highlight my-auto">Crear Cuenta</Link>}
                    </div>
                    <div className="col-10 col-md-6 col-lg-4 pr-0 d-flex bd-highlight mr-lg-5">
                        {props.log.log ? <h5 className="text-white text-center mx-sm-auto mx-lg-auto p-2 flex-fill bd-highlight border-right border-white">Bienvenido {props.log.firstName.toUpperCase()} {props.log.lastName.toUpperCase()} </h5> :
                            <Link to="/login" className="text-white text-center mx-sm-auto  mx-lg-auto p-2 flex-fill bd-highlight border-right border-white">Iniciar Sesión </Link>
                        }
                        <Link onClick={(valor) => props.getTipoVenta("mayorista")} className="text-white text-center mx-sm-auto mx-lg-auto p-2 flex-fill bd-highlight border-right border-white">Mayorista </Link>
                        <Link onClick={(valor) => props.getTipoVenta("minorista")} className="text-white text-center mx-sm-auto mx-lg-auto p-2 flex-fill bd-highlight">Minorista</Link>
                    </div>
                </div>
                <nav class="navbar-expand navbar-light bg-light col-12 d-flex ">
                    <Link  className="col-sm-3 col-lg-2 my-auto text-center" to="/">
                       <img className="img-fluid" src={logo} width="120" height="120" alt="" />
                       <p className="letters text-warning">Inicio</p> 
                    </Link>
                    <div className="letters col-sm-6 col-lg-8 my-auto justify-content-sm-start justify-content-lg-around"  >
                        <NavbarCat categories={props.categories} getById={(id) => props.getById(id)} />
                    </div>
                    <Link to='/cart' className="col-lg-2 col-sm-3 text-center my-2  my-lg-auto">
                        <img className="img-fluid" src={carrito} />
                        <span class="badge badge-danger rounded-circle img-fluid">{props.cartLength}</span>
                    </Link>
                </nav>
            </div>
        </div>
    )
}
