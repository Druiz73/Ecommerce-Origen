import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import mediosDePago from '../../imgs/mediosDePago.png';

export default function Footer(props) {

    return (
            <div className="container-fluid">
                <div className="row bg-dark mx-auto">
                    <div className="col-4 mt-1 ml-3">
                        <h2 className="text-white mt-3 text-center mb-4 " >Seguinos</h2>
                        <div className="d-flex justify-content-between mx-auto my-auto">
                            <i className="fa fa-facebook-square fa-3x text-white rounded-circle" ></i>
                            <i className="fa fa-twitter-square fa-3x text-white rounded-circle" ></i>
                            <i className="fa fa-youtube fa-3x text-white rounded-circle" ></i>
                            <i className="fa fa-instagram fa-3x text-white rounded-circle" ></i>
                        </div>
                    </div>
                    <div className="col-4 mt-1 ">
                        <h2 className="text-white mt-3 text-center mb-4 " >Medios de Pago</h2>
                        <img src={mediosDePago} className="my-auto img-fluid" />
                    </div>
                    <div className="col-3 mt-1 ml-3 text-white">
                        <h2 className="text-white mt-3 text-center mb-4 " >Contactanos</h2>
                        <p>381-413-0023</p>
                        <h3><strong>AV. Brigido Terán 257</strong></h3>
                        <p>San Miguel de Tucumán</p>
                    </div>
                </div>
            </div>
        
    )
}
