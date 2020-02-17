import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default function Footer(props) {

    return (
        <div >
            <div className="container-fluid">
                <div className="row bg-dark">
                    <div className="col-2 ">
                        <h2 className="text-white text-center mt-3">Navegación</h2>
                        <ul>
                            {props.categories.map((element) => (
                                <ListGroup>
                                    <ListGroupItem className="text-white bg-dark ">{element.nombre}</ListGroupItem>
                                </ListGroup>)
                            )}
                        </ul>
                    </div>
                    <div className="col-4 my-auto ml-3">
                        <h2 className="text-white mt-3 text-center mb-4 " >Seguinos</h2>
                        <div className="d-flex justify-content-between mx-auto my-auto">
                            <i className="fa fa-facebook-square fa-3x text-white rounded-circle" ></i>
                            <i className="fa fa-twitter-square fa-3x text-white rounded-circle" ></i>
                            <i className="fa fa-youtube fa-3x text-white rounded-circle" ></i>
                            <i className="fa fa-instagram fa-3x text-white rounded-circle" ></i>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
