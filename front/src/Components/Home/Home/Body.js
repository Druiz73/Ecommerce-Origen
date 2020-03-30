import React, { useState } from 'react';
import logo from '../../imgs/Jokker 2.png';
import destacados from '../../imgs/destacados.png';
import flyer from '../../imgs/WEB1Recurso33.png';
import envios from '../../imgs/envios.png';
import pagos from '../../imgs/mediosDePago.png';
import seguridad from '../../imgs/seguridad.png';
import './home.css';
import backUrl from '../../../configUrl'
import {
    
    Link
} from "react-router-dom";
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

export default function Body(props) {

    const [suscribe, setSuscribe] = useState({ email: "" })

    const handleSubscription = ((e) => {
        let value = e.target.value
        setSuscribe({ ...suscribe, email: value })
    })

    function saveSuscriber(email) {
        let inputFile = document.getElementById("suscribe");
        fetch(`${backUrl}/suscriber`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.errors) {
                    alert("Ingrese un correo valido")
                } else {

                    alert("Gracias por suscribirse!")
                }
            })
        setSuscribe({ email: "" })
        inputFile.value = "";
    }


    function letIdCat(id) {
        return "/categories/" + id
    }

    function letIdProduct(id) {
        return "/productPage/" + id
    }
    return (
        <div>
            <div className="container fluid principal  mx-auto" >
                <img src={flyer} className="img-fluid" alt="flyer"/>
            </div>
            <div className="container line">
                <div className="row">
                    <div className="col-11">
                        <hr className="border border-secondary h-25 bg-secondary" />
                    </div>
                    <div className="col-1">
                        <img src={logo} alt="logo" className="img-fluid" width="120" height="120" />
                    </div>
                </div>
            </div>
            <div className="container my-4">
                <div className="row">
                    {
                        props.categoriesHome.map((element) => (
                            <div className="col-12 col-sm-6 ">
                                <Link to={letIdCat(element._id)} onClick={(id) => props.getById(element._id)}> <img className="img-fluid my-3" alt="categorias" src={element.image['0'].base64} /></Link>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="container">
                <div className="row d-flex flex-row-reverse">
                    <div className="col-11">
                        <hr className="border border-secondary h-25 bg-secondary" />
                    </div>
                    <div className="col-1">
                        <img src={logo} alt="logo" className="img-fluid" width="120" height="120" />
                    </div>
                </div>
            </div>
            <div className="container">
                <img src={destacados} alt="destacados" className="img-fluid w-25 mt-2" />
            </div>
            <div className="container my-4">
                <div className="row justify-content-lg-around card-deck">
                    {
                        props.productHome.map(element => (
                            <Card className="border border-warning col-lg-3 col-sm-5 col-12 my-3 mx-3 pr-1 w-50">
                                <Link to={letIdProduct(element._id)}><CardImg className=" text-center mx-auto" src={element.imageUrl['0'].base64} alt="Card image cap" /></Link>
                                <CardBody>
                                    <CardTitle ><h1 className="text-center">{element.titulo} </h1></CardTitle>
                                    <CardSubtitle ><h2 className="text-center mt-5"><strong>${element.precioMenor}</strong></h2></CardSubtitle>
                                </CardBody>
                                <Link to={letIdProduct(element._id)}  className="btn btn-warning text-white mx-auto text-center mb-0">Comprar ahora </Link>
                            </Card>
                        ))
                    }
                </div>
            </div>
            {/* <div className="container mx-auto mt-4 text-center">
                <img src={verTodos} className="img-fluid " />
            </div> */}
            <div className="container-fluid my-4 ">
                <div className="row bg-warning descuentos h-auto">
                    <div className="col-12 col-sm-7 col-lg-6 d-flex justify-content-center">
                        <h5 className="my-auto mx-auto text-dark"><strong><h2>SUSCRIBITE, ENTERATE DE LAS NOVEDADES <br />Y OBTENÉ 10% DE DESCUENTO</h2></strong></h5>
                    </div>
                    <div className="col-12 col-sm-5 col-lg-6  d-flex justify-content-center">
                        <input className="h-35 w-75 w-sm-100 my-auto" onChange={(e) => handleSubscription(e)} id="suscribe" type="email" name="email" value={suscribe.email} placeholder="Ingresa tu email" />
                        <button type="button" onClick={() => saveSuscriber(suscribe.email)} class="btn btn-dark btn-large h-35 my-auto ml-1"><i class="fa fa-arrow-right "></i></button>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-12 col-lg-4 my-5">

                        <div className="bg-white text-center"> <img src={envios} alt="envios" className="img-fluid " /></div>
                        <h3 className="bg-white text-center mt-3">ENVIOS A TODO EL PAIS</h3>
                        <h4 className="bg-white text-center">Para compras superiores a $2000</h4>

                    </div>
                    <div className="col-12 col-sm-12 col-lg-4 my-5 mx-0">

                        <div className="bg-white text-center"> <img src={pagos} alt="pagos" className="img-fluid " /></div>
                        <h3 className="bg-white text-center mt-3">HASTA 3 CUOTAS SIN INTERES</h3>
                        <h4 className="bg-white text-center">Con tarjetas de creditos seleccionadas</h4>

                    </div>
                    <div className="col-12 col-sm-12 col-lg-4 my-3">

                        <div className="bg-white text-center"> <img src={seguridad} alt="seguridad" className="img-fluid " /></div>
                        <h3 className="bg-white text-center mt-3">COMPRA 100% SEGURA</h3>
                        <h4 className="bg-white text-center">Protegemos todos tus datos</h4>

                    </div>
                </div>
            </div>
        </div>
    )
}

