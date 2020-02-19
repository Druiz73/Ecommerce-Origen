import React from 'react';
import logo from './logo.jpeg';
import './header.css';

export default function Header() {
    return (

        <div>
            <div className="col-12">
                <img src={logo} className="card-img-top img img-fluid " alt="" />
            </div>
            <div>
                <nav className="navbar  navbar-expand-lg navbar-light white scrolling-navbar">
                    <div className="container">
                        {/* <!-- Collapse --> */}
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {/* <!-- Links --> */}
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">

                            {/* <!-- Left --> */}
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link waves-effect" href="#">Home
                                     <span className="sr-only">(current)</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link waves-effect" href="https://mdbootstrap.com/docs/jquery/">About MDB</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link waves-effect" href="https://mdbootstrap.com/docs/jquery/getting-started/download/"
                                    >Free download</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link waves-effect" href="https://mdbootstrap.com/education/bootstrap/">Free
                                     tutorials</a>
                                </li>
                            </ul>

                            {/* <!-- Right --> */}
                            <ul className="navbar-nav nav-flex-icons">
                                <li className="nav-item">
                                    <a className="nav-link waves-effect">
                                        <span className="badge red z-depth-1 mr-1"> 1 </span>
                                        <i className="fas fa-shopping-cart"></i>
                                        <span className="clearfix d-none d-sm-inline-block"> Cart </span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="https://www.facebook.com/mdbootstrap" className="nav-link waves-effect">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="https://twitter.com/MDBootstrap" className="nav-link waves-effect">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="https://github.com/mdbootstrap/bootstrap-material-design" className="nav-link border border-light rounded waves-effect"
                                    >
                                        <i className="fab fa-github mr-2"></i>MDB GitHub
            </a>
                                </li>
                            </ul>

                        </div>

                    </div>
                </nav>
            </div>
        </div >
    )
}