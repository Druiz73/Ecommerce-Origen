import React, { useState } from 'react';
import {
    Collapse,
    Nav,
    NavItem,
    NavLink,
    
} from 'reactstrap';
import { Link } from "react-router-dom";


export default function NavbarCat(props) {
    const [Items, setItems] = useState({
        isOpen: false,
        search: ""
    });

    function letId(id) {
        return "/categories/" + id
    }

    return (
        <Collapse isOpen={Items.isOpen} navbar>
            <Nav className="col-12 d-flex justify-content-between mx-auto h-5" navbar>
                {props.categories.map((element) => (
                    <NavItem>
                        <Link to={letId(element._id)}> <NavLink className="cat text-dark" onClick={(id) => props.getById(element._id)} > {element.nombre}</NavLink></Link>
                    </NavItem>)
                )}
            </Nav>
        </Collapse>
    )
}
