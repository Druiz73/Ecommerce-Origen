import React, { useState, useEffect } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import classnames from 'classnames';


export default function IndexProducts() {

    const [product, setProduct] = useState({
        products: [],
        id: "",
        titulo: "",
        precioMayor: "",
        precioMenor: "",
        stock: "",
        descripcion: "",
        talles: [],
        category: [],
        image: "",
        isOpen: false
    });
    console.log(product)
    function getCategory(){
        fetch("http://localhost:4000/categories")
            .then(resp => resp.json())
            .then(data => {
               
                setProduct({
                    category: data
                })
                console.log(data)
            });
    }

    function getProducts(){
        fetch("http://localhost:4000/products")
        .then(resp => resp.json())
        .then(data => {
            setProduct({
                products: data
            })
            console.log(data)
        });
    }

    useEffect(() => {
        getCategory();
        getProducts();
        }, []);
    

    const toggle = () => setProduct(!product.isOpen);

    return (

        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={product.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/">Components</NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText>Simple Text</NavbarText>
                </Collapse>
            </Navbar>
        </div>
    )



}
