import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';



export default function ProductPage(props) {
    const productXMayor = JSON.parse(localStorage.getItem("mayorista")) || [];
    const productXMenor = JSON.parse(localStorage.getItem("minorista")) || [];
    const [product, setProduct] = useState({});
    const [image, setImage] = useState('');
    const [talles, setTalles] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [redirectCarrito, setRedirectCarrito] = useState(false);


    let { id } = useParams();

    useEffect(() => {
        fetch("http://localhost:4000/products/cart/" + id)
            .then(resp => resp.json())
            .then(data => {
                var image = data.imageUrl[0].base64;
                setImage(image);
                setProduct(data);
                setTalles(data.talles)
            })
    }, {});

    function handleButton() {
        let checked = false;
        let talle;
        for (let i = 0; i < document.check.elements.length; i++) {
            if (document.check.elements[i].checked == "1")
                checked = true
        }
        if (checked) {
            if (props.typeSale.sale === "mayorista") {

                if (quantity >= 1) {
                    for (let i = 0; i < document.check.elements.length; i++) {
                        if (document.check.elements[i].type == "checkbox" && document.check.elements[i].checked == "1") {

                            talle = document.check.elements[i].value;

                        }
                    }
                    productXMayor.push({ ...product, quantity, talles: talle, price: product.precioMayor })
                    let typeSale = props.typeSale.sale;
                    localStorage.setItem(typeSale, JSON.stringify(productXMayor))
                    setProduct({ productXMayor: product, typeSale: props.typeSale })
                    props.setear(productXMayor.length, productXMenor.length);
                    setRedirectCarrito(true);
                } else {
                    window.confirm("INGRESE CANTIDAD CORRECTA");
                }
            }
            else if (props.typeSale.sale === "minorista") {
                if (quantity >= 1) {
                    for (let i = 0; i < document.check.elements.length; i++) {
                        if (document.check.elements[i].type == "checkbox" && document.check.elements[i].checked == "1") {
                            talle = document.check.elements[i].value;
                        }
                    }
                    productXMenor.push({ ...product, quantity, talles: talle, price: product.precioMenor })
                    let typeSale = props.typeSale.sale;
                    localStorage.setItem(typeSale, JSON.stringify(productXMenor))
                    setProduct({ productXMenor: product, typeSale: props.typeSale })
                    props.setear(productXMayor.length, productXMenor.length)
                    setRedirectCarrito(true);
                } else {
                    window.confirm("INGRESE CANTIDAD CORRECTA");
                }
            }
        } else { alert("No olvide elegir un talle por favor") }
    }

    function handleCheck(e) {
        // check if the check box is checked or unchecked
        if (e.target.checked) {
            for (let i = 0; i < document.check.elements.length; i++) {
                if (document.check.elements[i].type == "checkbox")
                    document.check.elements[i].checked = 0
                // add the numerical value of the checkbox to options array
            }
            e.target.checked = 1
        }
    }

    function cambiarCant(e) {
        let value = e.target.value;
        setQuantity(value)
    }

    if (redirectCarrito) {
        return <Redirect to="/cart" />
    } else {
        return (
            <div>
                <div className="mb-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6 text-center my-auto">
                                <img className="img-fluid mt-5" src={image} />
                            </div>
                            <div className="col-12 col-md-6 text-center">
                                <h1 className="text-center mb-3 text-dark"><strong>{product.titulo} </strong></h1>
                                <h5>(*{props.typeSale.sale})</h5>
                                {
                                    props.typeSale.sale === "minorista" ? <p className="text-center mt-5 row-4">Precio: $ {product.precioMenor}</p>
                                        :
                                        <p className="text-center mt-5 row-4">Precio: $ {product.precioMayor}</p>
                                }
                                <hr></hr>
                                <p>Caracteristicas: <br />
                                    {product.descripcion}
                                </p>
                                <hr></hr>
                                <p>Talles</p>
                                <Form name="check">
                                    {talles.map((element) => (
                                        <FormGroup check inline>
                                            <Label  >
                                                <Input type="checkbox" id={element} value={element} onClick={(e) => handleCheck(e)} /> {element}
                                            </Label>
                                        </FormGroup>
                                    ))}
                                </Form>
                                <hr></hr>
                                <label className="mr-2">quantity: </label>
                                <input className="col-2" name="quantity" type="number" defaultValue="1" min="1" pattern="^[0-9]+" value={quantity} onChange={(e) => cambiarCant(e)} />
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
