import React from 'react';
import './ItemNav.css';

export default function ItemNav() {

    return (
        
            <nav id="navbar-example3" className="fixed-bottom size col-12 col-lg-2 navbar navbar-light bg-dark NavItem mt-3">

                <nav className="nav flex-column">
                    <h1 className="text-center text-white">Categorias</h1>
                    <a className="nav-link text-muted font-weight-bold stretched-link" href="#item-1">Item 1</a>
                    <nav className="nav flex-column">
                        <a className="nav-link text-muted font-weight-bold stretched-link ml-3 my-1" href="#item-1-1">Item 1-1</a>
                        <a className="nav-link text-muted font-weight-bold stretched-link ml-3 my-1" href="#item-1-2">Item 1-2</a>
                    </nav>
                    <a className="nav-link text-muted font-weight-bold stretched-link" href="#item-2">Item2</a>
                    <a className="nav-link text-muted font-weight-bold stretched-link" href="#item-3">Item3</a>
                    <nav className="nav flex-column">
                        <a className="nav-link text-muted font-weight-bold stretched-link ml-3 my-1" href="#item-3-1">Item 3-1</a>
                        <a className="nav-link text-muted font-weight-bold stretched-link ml-3 my-1" href="#item-3-2">Item 3-2</a>
                    </nav>
                </nav>
            </nav>
        
    )
}
