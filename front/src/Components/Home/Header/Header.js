import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import {
    Button,
    Form,
    Input,
    Navbar,
    NavbarToggler,
    Nav
} from 'reactstrap';
import carrito from '../../imgs/shopping-cart-symbol-for-e-commerce_icon-icons.com_56124.png';
import NavbarCat from './NavbarCat';
import './header.css';
import logo from '../../imgs/Jokker 2.png';

export default function Header(props) {


    const [state, setstate] = useState({
        isOpen: false,
        search: "",
        product: []
    });



    function handleInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        setstate({
            ...state,
            [name]: value
        });
        console.log(state)
    }
    const query = `?=${state.search}`;

    function handleClick(e) {
        e.preventDefault();
        fetch("http://localhost:4000/products/search" + query)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    product: data
                })
            });
    }



    const toggle = () => setstate(!state.isOpen);


    return (

        <div className="border-bottom border-dark h-5">
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-12 bg-dark h-5 d-flex justify-content-between">
                        <div className="col-3 text-white d-flex bd-highlight">
                            <Link to="/register" className="text-white flex-fill bd-highlight my-auto">Crear Cuenta</Link>
                        </div>
                        <div className="col-10 col-md-6 col-lg-4 pr-0 d-flex bd-highlight mr-lg-5">
                            <Link to="/login" className="text-white text-center mx-sm-auto  mx-lg-auto p-2 flex-fill bd-highlight border-right border-white">Iniciar Sesión </Link>
                            <Link to="/" className="text-white text-center mx-sm-auto mx-lg-auto p-2 flex-fill bd-highlight border-right border-white">Mayorista </Link>
                            <Link to="/" className="text-white text-center mx-sm-auto mx-lg-auto p-2 flex-fill bd-highlight">Minorista</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Navbar color="light" light expand="md">
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="col-2">
                            <a class="navbar-brand" href="#">
                                <Link to="/"><img className="img-fluid" src={logo} width="120" height="120" alt="" /> </Link>
                            </a>
                        </div>
                        <div className="col-6">
                            <NavbarToggler onClick={toggle} />
                            <NavbarCat categories={props.categories} />
                        </div>
                        <div className="col-3">
                        <Form className="collapse navbar-collapse ml-3">
                            <Input class="w-50 form-control" name="search" value={state.search} type="search" placeholder="Search" aria-label="Search" onChange={(e) => handleInput(e)} />
                            <Button class="btn btn-outline-success" onClick={(e) => handleClick(e)} type="submit">Search</Button>
                        </Form>
                        </div>
                       
                        <Nav>
                            <Link className="col-1">
                                <img src={carrito} />
                            </Link>
                        </Nav>
                    </div>
                </Navbar>
            </div>
        </div >
    )
}
