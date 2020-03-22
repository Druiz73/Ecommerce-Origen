import React, { useState } from 'react';
import {
    Link
} from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import carrito from '../../imgs/shopping-cart-symbol-for-e-commerce_icon-icons.com_56124.png';
import './header.css';
import logo from '../../imgs/Jokker 2.png';


export default function Header(props) {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    function letId(id) {
        return "/categories/" + id
    }

    const logOut = (() => {
        localStorage.clear("usertoken")
    })


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
                <Navbar color="light" light expand="md" className="container-fluid">
                    <Link className="logo col-sm-2 col-lg-2 my-auto" to="/">
                        <NavbarBrand ><img className="img-fluid" src={logo} width="120" height="120" alt="" /> </NavbarBrand>
                    </Link>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="d-flex justify-content-between mx-auto " navbar>
                            {props.categories.map((element) => (
                                <NavItem className="cat">
                                    <Link to={letId(element._id)}> <NavLink className="cat mx-1 text-dark" onClick={(id) => props.getById(element._id)} > {element.nombre}</NavLink></Link>
                                </NavItem>)
                            )}
                        </Nav>
                    </Collapse>
                    <Link to='/cart' className="">
                        <img className="img-fluid" alt="carrito" src={carrito} />
                        <span class="badge badge-danger rounded-circle img-fluid">{props.cartLength}</span>
                    </Link>
                </Navbar>
            </div>
        </div>
    )
}
