import React from 'react';
import { Link } from "react-router-dom";
import './categories.css';
import imgMayor from '../imgs/xMayor.png'
import imgMenor from '../imgs/xMenor.png'

export default function Categories(props) {



    function letId(id) {
        return "/productPage/" + id
    }

    return (
        <div className="col-12">
            <div className="container-fluid section">
                <div data-spy="scroll" data-target="#navbar-example3" className="mb-3 col-12 col-md-6 col-lg-12" data-offset="0">
                    {
                        props.typeSale === "minorista" ? <div className="titleCat bg-dark  text-center">
                            <h1 className="title text-white" >{props.nombreCat}</h1>
                            <h3 className="text-white"> PRECIOS {(props.typeSale).toUpperCase()}</h3>
                        </div>
                            :
                            <div className="titleCat bg-warning  text-center">
                                <h1 className="title text-white" >{props.nombreCat}</h1>
                                <h3 className="text-dark"> PRECIOS {(props.typeSale).toUpperCase()}</h3>
                            </div>
                    }
                    <div className="row d-flex justify-content-around">
                        {props.products.map((element) => (element.stock > 0 ?
                            <div className="card m-1 mb-3 mt-3 mr-3 col-12 col-lg-3 item-border cards" id={element.category}>
                                <div className="row no-gutters">
                                    <img className="img-fluid" alt="producto" src={element.imageUrl['0'].base64} />
                                    <div class="col-md-12">
                                        <div class="card-body">
                                            <h3 class="card-title text-center">{element.titulo}</h3>
                                            <p class="card-text text-center">{element.descripcion}</p>
                                            {
                                                props.typeSale === "minorista" ? <p class="card-text text-center"><small class="text-dark">${element.precioMenor}</small></p> :
                                                    <p class="card-text text-center"><small class="text-dark">${element.precioMayor}</small></p>
                                            }
                                            {
                                                props.typeSale === "minorista" ? <div className="text-center">
                                                    <Link to={letId(element._id)} name="articulos" type="button" class="btn btn-dark">Ver Producto</Link>
                                                </div>
                                                    :
                                                    <div className="text-center">
                                                        <Link to={letId(element._id)} name="articulos" type="button" class="btn btn-warning">Ver Producto</Link>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div> : <div className="d-none" />
                        ))}
                    </div>
                </div>
                <div className="col-12 my-3">
                    {props.typeSale === "mayorista" ? <Link><img onClick={(valor) => props.getTipoVenta("minorista")} alt="mayorista" className="img-fluid" src={imgMenor} /> </Link> : <Link><img onClick={(valor) => props.getTipoVenta("mayorista")} alt="mayorista" className="img-fluid" src={imgMayor} /> </Link>}
                </div>
            </div>
        </div>
    )
}
