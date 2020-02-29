import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

export default function Categories(props) {

    const [typeSale, setTypeSale] = useState({ sale: "minorista" })

    function letId(id) {
        return "/productPage/" + id
    }

    
  
    return (
        <div className="col-12">
            <div className="container-fluid section">
                <div data-spy="scroll" data-target="#navbar-example3" className="mb-3 col-12 col-md-6 col-lg-12" data-offset="0">
                   <div className="bg-warning h-100 text-center">
                   <h1 className="text-white" >{props.nombreCat.nombre}</h1>
                   <h2> PRECIOS {(props.typeSale).toUpperCase()}</h2>
                   </div>
                    <div className="row d-flex justify-content-around">
                        {props.products.map((element) => (
                            <div className="card m-1 mb-3 mt-3 mr-3 col-12 col-lg-3 item-border cards" id={element.category}>
                                <div className="row no-gutters">
                                    <img className="img-fluid" src={element.imageUrl['0'].base64} />
                                    <div class="col-md-12">
                                        <div class="card-body">
                                            <h3 class="card-title text-center">{element.titulo}</h3>
                                            <p class="card-text text-center">{element.descripcion}</p>
                                            <p class="card-text text-center"><small class="text-muted">${element.precioMenor}</small></p>
                                            <div className="text-center">
                                                <Link to={letId(element._id)} name="articulos" type="button" class="btn btn-warning">Ver Producto</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
