import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from "react-router-dom";



export default function ProductPage(props) {
    const products = JSON.parse(localStorage.getItem('articulos')) || [];
    const [product, setProduct] = useState({});
    const [imagen, setImagen] = useState('');
    const [cantidad, setCantidad] = useState(1);
    const [redirectCarrito, setRedirectCarrito] = useState(false);
    let id = useParams().id;
    console.log(id)
    useEffect(() => {
        fetch("http://localhost:4000/products/cart/"+id)

            .then(function (response) {
                return response.json()
            })
            .then(data => {
                var imagen = data.imageUrl[0].base64;
                setImagen(imagen);
                setProduct(data);
            })
    }, {})

    function handleButton() {
        if (cantidad >= 1) {
            products.push({ ...product, cantidad })
            localStorage.setItem('articulos', JSON.stringify(products))
            setProduct({ products: product })
            props.setear(products.length);
            setRedirectCarrito(true);
        } else {
            window.confirm("INGRESE CANTIDAD CORRECTA");
        }
    }

    function cambiarCant(e) {
        let value = e.target.value;
        setCantidad(value)
    }

    if (redirectCarrito) {
        return <Redirect to="/ventas" />
    } else {
        return (
            <div>
                <h2 className="text-center"><strong>{product.detalle}</strong></h2>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 text-center my-auto">
                            <img className="img-fluid mt-5" src={imagen} />
                        </div>
                        <div className="col-12 col-md-6 text-center">
                            <h3 className="text-center mt-5 row-4">Precio: $ {product.precio}</h3>
                            <hr></hr>
                            <p>Medios de pago</p>
                            {/* <img  className="img-fluid" /> */}
                            <hr></hr>
                            <p>Caracteristicas</p>
                            <hr></hr>
                            <label className="mr-2">Cantidad: </label>
                            <input className="col-2" name="cantidad" type="number" value={cantidad} onChange={(e) => cambiarCant(e)} />
                            <hr></hr>
                            <div className="text-center">
                                <button className="btn btn-warning mx-auto mb-5" onClick={() => handleButton()}>Comprar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
