import React from 'react';
import logo from '../../imgs/Jokker 2.png';
import jeans from '../../imgs/jeans.png';
import camisas from '../../imgs/camisas.png';
import joggers from '../../imgs/joggers.png';
import remeras from '../../imgs/remeras.png';
import gorras from '../../imgs/gorras.png';
import chombas from '../../imgs/chombas.png';
import destacados from '../../imgs/destacados.png';
import camisaEstampada from '../../imgs/camisaEstampada.jpg';
import pantaloRayado from '../../imgs/pantalonRayado.jpg';
import jeanBlue from '../../imgs/jeanBlue.jpg';
import verTodos from '../../imgs/verTodos.png';
import flyer from '../../imgs/WEB1Recurso33.png';
import envios from '../../imgs/envios.png';
import pagos from '../../imgs/mediosDePago.png';
import seguridad from '../../imgs/seguridad.png';


import './home.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardHeader, CardFooter
} from 'reactstrap';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

export default function body() {
    return (
        <div>
            <div className="container principal " >
            <img src={flyer} className="img-fluid"  />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-11">
                        <hr className="border border-secondary h-25 bg-secondary" />
                    </div>
                    <div className="col-1">
                        <img src={logo} className="img-fluid" width="120" height="120" />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <img className="img-fluid" src={jeans} />
                    </div>
                    <div className="col-6">
                        <img className="img-fluid" src={camisas} />
                    </div>
                </div>
            </div>
            <div className="container my-4">
                <div className="row">
                    <div className="col-3">
                        <Link to="/admin"> <img className="img-fluid" src={joggers} /></Link>
                    </div>
                    <div className="col-3">
                        <img className="img-fluid" src={remeras} />
                    </div>
                    <div className="col-3">
                        <img className="img-fluid" src={gorras} />
                    </div>
                    <div className="col-3">
                        <img className="img-fluid" src={chombas} />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row d-flex flex-row-reverse">
                    <div className="col-11">
                        <hr className="border border-secondary h-25 bg-secondary" />
                    </div>
                    <div className="col-1">
                        <img src={logo} className="img-fluid" width="120" height="120" />
                    </div>
                </div>
            </div>
            <div className="container">
                <img src={destacados} className="img-fluid w-25 mt-2" />
            </div>
            <div className="container my-4">
                <div className="row">
                    <div className="col-4">
                        <img className="img-fluid" src={camisaEstampada} />
                    </div>
                    <div className="col-4">
                        <img className="img-fluid" src={pantaloRayado} />
                    </div>
                    <div className="col-4">
                        <img className="img-fluid" src={jeanBlue} />
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-4 text-center">
                <img src={verTodos} className="img-fluid " />
            </div>
            <div className="container-fluid my-4 h-5">
                <div className="row bg-warning descuentos">
                    <div className="col-6 d-flex justify-content-center">
                        <h5 className="my-auto mx-auto text-dark"><strong><h2>SUSCRIBITE, ENTERATE DE LAS NOVEDADES <br />Y OBTENÉ 10% DE DESCUENTO</h2></strong></h5>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <input className="h-35 w-50 my-auto" type="email"  placeholder="Ingresa tu email"/>
                        <button class="btn btn-dark btn-large h-35 my-auto"><i class="fa fa-arrow-right "></i></button>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-4 my-5">
                        
                            <div className="bg-white text-center"> <img src={envios} className="img-fluid " /></div>
                            <h3 className="bg-white text-center mt-3">ENVIOS A TODO EL PAIS</h3>
                            <h4 className="bg-white text-center">Para compras superiores a $2000</h4>
                       
                    </div>
                    <div className="col-4 my-5">
                    
                            <div className="bg-white text-center"> <img src={pagos} className="img-fluid " /></div>
                            <h3 className="bg-white text-center mt-3">HASTA 3 CUOTAS SIN INTERES</h3>
                            <h4 className="bg-white text-center">Con tarjetas de creditos seleccionadas</h4>
                        
                    </div>
                    <div className="col-4 my-3">
                    
                            <div className="bg-white text-center"> <img src={seguridad} className="img-fluid " /></div>
                            <h3 className="bg-white text-center mt-3">COMPRA 100% SEGURA</h3>
                            <h4 className="bg-white text-center">Protegemos todos tus datos</h4>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}


{/* <Card className="border-none">
                            <CardImg className=" w-75 mx-auto" src={camisaEstampada} alt="Card image cap" />
                            <CardBody>
                                <CardTitle ><h1 className="text-center">Camisa Estampada </h1></CardTitle>
                                <CardSubtitle ><h2 className="d-flex justify-content-around mt-5"><strike>$1900,00</strike><strong>$1300,00</strong></h2></CardSubtitle>
                            </CardBody>
                            <Button className="btn btn-dark text-white mx-auto text-center mb-0">Comprar ahora</Button>
                        </Card> */}