import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from "react-router-dom";
import mediosDePago from '../imgs/mediosDePago.png'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';



export default function ProductPage(props) {
    const productsXMayor = JSON.parse(localStorage.getItem('mayorista')) || [];
    const productsxMenor = JSON.parse(localStorage.getItem('mayorista')) || [];
    const [product, setProduct] = useState({});
    const [image, setImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [typeSale, settypeSale] = useState(props.typeSale);
    const [redirectCarrito, setRedirectCarrito] = useState(false);


    let { id } = useParams();

    useEffect(() => {

        fetch("http://localhost:4000/products/cart/" + id)
            .then(resp => resp.json())
            .then(data => {
                var image = data.imageUrl[0].base64;
                setImage(image);
                setProduct(data);
            })
    }, {});


    function handleButton() {
        if (typeSale.sale === "minorista") {
            if (quantity >= 1) {
                productsXMayor.push({ ...product, quantity, })
                let typeSale = props.typeSale.sale;
                console.log(typeSale)
                localStorage.setItem(typeSale, JSON.stringify( productsXMayor))
                setProduct({  productsXMayor: product, typeSale: props.typeSale })
                props.setear( productsXMayor.length);
                setRedirectCarrito(true);
            } else {
                window.confirm("INGRESE quantity CORRECTA");
            }
        }
        else if (typeSale.sale === "mayorista") {
            if (quantity >= 1) {
                productsxMenor.push({ ...product, quantity, })
                let typeSale = props.typeSale.sale;
                console.log(typeSale)
                localStorage.setItem(typeSale, JSON.stringify(productsxMenor))
                setProduct({ productsxMenor: product, typeSale: props.typeSale })
                props.setear(productsxMenor.length);
                setRedirectCarrito(true);
            } else {
                window.confirm("INGRESE quantity CORRECTA");
            }
        }

    }
    
    function cambiarCant(e) {
        let value = e.target.value;
        setQuantity(value)
    }

    function talles() {
        for (let index = 0; index < product.talles; index++) {
            const element = product.talles[index];
            return `<input type="checkbox" id=${element} value=${element} onChange={(e) => onChange(e)} /> ${element}`

        }
    }

    if (redirectCarrito) {
        return <Redirect to="/cart" />
    } else {
        return (
            <div>
                <h1 className="text-center">{product.titulo}</h1>
                <div className="mb-5">
                    <h2 className="text-center"><strong>{product.detalle}</strong></h2>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6 text-center my-auto">
                                <img className="img-fluid mt-5" src={image} />
                            </div>
                            <div className="col-12 col-md-6 text-center">
                                <h3 className="text-center mt-5 row-4">Precio: $ {product.precioMEnor}</h3>
                                <hr></hr>
                                <p>Medios de pago</p>
                                <img src={mediosDePago} className="img-fluid" />
                                <hr></hr>
                                <p>Caracteristicas: <br />
                                    {product.descripcion}
                                </p>
                                <hr></hr>
                                <p>Talles</p>


                                {talles()}



                                <hr></hr>
                                <label className="mr-2">quantity: </label>
                                <input className="col-2" name="quantity" type="number" value={quantity} onChange={(e) => cambiarCant(e)} />
                                <hr></hr>
                                <div className="text-center">
                                    <button className="btn btn-warning mx-auto mb-5" onClick={() => handleButton()}>Comprar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
