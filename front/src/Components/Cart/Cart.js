import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

export default function Carrito(props) {
    const [artMayor, setArtMayor] = useState(props.productXMayor);
    const [artMEnor, setArtMEnor] = useState(props.productXMenor);
    const [activeTab, setActiveTab] = useState("1")


    function deleteArtMayor(index) {
        let art2 = artMayor.slice();
        art2.splice(index, 1);
        setArtMayor(art2);
        localStorage.setItem('mayorista', JSON.stringify(art2)) ;
        props.setear(art2.length, props.productXMenor.length)
    }

    function deleteArtMenor(index) {
        let art2 = artMEnor.slice();
        art2.splice(index, 1);
        setArtMEnor(art2);
        localStorage.setItem('minorista', JSON.stringify(art2)) ;
        props.setear(props.productXMayor.length, art2.length)
    }

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab)
    }
    var total = 0;
    artMayor.forEach(item => {
        total += item.quantity * item.precio
    })
    artMEnor.forEach(item => {
        total += item.quantity * item.precio
    })


    function compraxMayor() {

        if(total != 0 && total> 3500){
            fetch(`http://localhost:4000/sales`, {
                method: "POST",
                body: JSON.stringify({
                    products: artMayor
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => console.log(data, "respuesta"))
                .catch(err => console.error(err, "error"))
    
                artMayor.splice(artMayor);
            setArtMayor(artMayor);
            localStorage.setItem('mayorista', JSON.stringify(artMayor));
            props.setear(artMayor.length)
        }
        else{
            alert("recuerde que la compra por mayor debe superar los 3500 pesos")
        }
      
    }

   
    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}>
                        Productos Seleccionados Por Menor
                        </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}>
                        Productos Seleccionados Por Mayor
                        </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <div className="container my-5">
                        <h1 className="text-dark font-italic">Productos Seleccionados x Menor</h1>
                    </div>
                    <div className="container rounded-top" id="articulos">
                        <div className="row border-bottom border-dark justify-content-end">
                            <h6 className="col-2 col-lg-2 mt-2 text-center">Precio unitario</h6>
                            <h6 className="col-2 col-lg-2 mt-2 text-center">Cantidad</h6>
                            <h6 className="col-1 col-lg-2 mt-2 ml-3 text-center">Total</h6>
                            <h6 className="col-1 col-lg-1 mt-2 text-center"></h6>
                        </div>

                        {artMEnor.map((item, index) => (
                            <div className="row mt-1 border-bottom border-dark" id="fila">
                                <img className="col-3 col-lg-2" src={item.imageUrl["0"].base64} alt="" />
                                <div className="col-3 col-lg-3 mt-1">
                                    <h5 className="align-self-center">{item.titulo}</h5>
                                </div>
                                <div className="col-2 col-lg-2 mt-1 align-self-center">
                                    <p className="text-center">$ {item.precioMenor}</p>
                                </div>
                                <div className="col-2 col-lg-2 mt-1 align-self-center">
                                    <p className="text-center">{item.cantidad}</p>
                                </div>
                                <div className="col-2 col-lg-2 mt-1 align-self-center">
                                    <p className="text-center">$ {item.precio * item.cantidad}</p>
                                </div>
                                <div className="col-1 col-lg-1 mt-1 align-self-center">
                                    <button className="btn btn-danger" onClick={() => deleteArtMenor(index)}>Eliminar</button>
                                </div>
                            </div>
                        ))}
                        <div className="container rounded-bottom mb-2">
                            <div className="d-flex justify-content-end">
                                <h5 className="mr-5 my-1">Total $ {total}</h5>
                            </div>
                            <div className="row">
                                <Link to="/" className="mx-auto my-1 btn btn-primary btn-sm border-dark" >Seguir Comprando</Link>
                                <Link to="/compenespera" className="mx-auto my-1 btn btn-primary btn-sm border-dark" onClick={() => compraxMayor()}>Finalizar Compra</Link>
                            </div>
                        </div>
                    </div>

                </TabPane>
                <TabPane tabId="2">
                <div className="container my-5">
                        <h1 className="text-dark font-italic">Productos Seleccionados x mayor</h1>
                        <h2 className="text-dark font-italic">Recuerde que el monto debe ser mayor a $3500</h2>
                    </div>
                    <div className="container rounded-top" id="articulos">
                        <div className="row border-bottom border-dark justify-content-end">
                            <h6 className="col-2 col-lg-2 mt-2 text-center">Precio unitario</h6>
                            <h6 className="col-2 col-lg-2 mt-2 text-center">Cantidad</h6>
                            <h6 className="col-1 col-lg-2 mt-2 ml-3 text-center">Total</h6>
                            <h6 className="col-1 col-lg-1 mt-2 text-center"></h6>
                        </div>

                        {artMayor.map((item, index) => (
                            <div className="row mt-1 border-bottom border-dark" id="fila">
                                <img className="col-3 col-lg-2" src={item.imageUrl["0"].base64} alt="" />
                                <div className="col-3 col-lg-3 mt-1">
                                    <h5 className="align-self-center">{item.titulo}</h5>
                                </div>
                                <div className="col-2 col-lg-2 mt-1 align-self-center">
                                    <p className="text-center">$ {item.precioMenor}</p>
                                </div>
                                <div className="col-2 col-lg-2 mt-1 align-self-center">
                                    <p className="text-center">{item.quantity}</p>
                                </div>
                                <div className="col-2 col-lg-2 mt-1 align-self-center">
                                    <p className="text-center">$ {item.precio * item.quantity}</p>
                                </div>
                                <div className="col-1 col-lg-1 mt-1 align-self-center">
                                    <button className="btn btn-danger" onClick={() => deleteArtMayor(index)}>Eliminar</button>
                                </div>
                            </div>
                        ))}
                        <div className="container rounded-bottom mb-2">
                            <div className="d-flex justify-content-end">
                                <h5 className="mr-5 my-1">Total $ {total}</h5>
                            </div>
                            <div className="row">
                                <Link to="/" className="mx-auto my-1 btn btn-primary btn-sm border-dark" >Seguir Comprando</Link>
                                <Link to="/compenespera" className="mx-auto my-1 btn btn-primary btn-sm border-dark" onClick={() => compraxMayor()}>Finalizar Compra</Link>
                            </div>
                        </div>
                    </div>
                </TabPane>

            </TabContent>
        </div>
    )
}