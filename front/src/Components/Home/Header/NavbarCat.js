import React, {useState, useEffect} from 'react';
import {
    Collapse,
    Nav,
    NavItem,
    NavLink,
    Button, Form, Input, 
} from 'reactstrap';
import {Link  } from "react-router-dom";


export default function NavbarCat(props) {
    const [Items, setItems] = useState({
        isOpen: false,
        search:"",
        product:[],
        categories:[]
    });

    // function handleClick(id) {
    //     fetch("http://localhost:4000/producto/" + id)
    //         .then(resp => resp.json())
    //         .then(data => {
    //             console.log(data)
    //             setItems({
                   
    //                 product: data
    //             })
    //         })
    // };
   
    function letId(id){
        return "/categories/"+id
    }

    return (
        <Collapse isOpen={Items.isOpen} navbar>
        <Nav className="d-flex justify-content-between mx-auto h-5" navbar>
            {props.categories.map((element) => (
                <NavItem>
                <Link to={letId(element._id)}> <NavLink className="cat text-dark"  > {element.nombre}</NavLink></Link>
                </NavItem>)
            )}
        </Nav>
    </Collapse>
    )
}
