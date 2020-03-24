import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink, Table } from 'reactstrap';
import classnames from 'classnames';

export default function Carrito(props) {
    const [artMayor, setArtMayor] = useState(props.productXMayor);
    const [artMEnor, setArtMEnor] = useState(props.productXMenor);
    const [activeTab, setActiveTab] = useState("1")

    //Delete article of list sale of MAyor
    function deleteArtMayor(index) {
        let art2 = artMayor.slice();
        art2.splice(index, 1);
        setArtMayor(art2);
        localStorage.setItem('mayorista', JSON.stringify(art2));
        props.setear(art2.length, props.productXMenor.length)
    }

    //Delete article of list sale of menor
    function deleteArtMenor(index) {
        let art2 = artMEnor.slice();
        art2.splice(index, 1);
        setArtMEnor(art2);
        localStorage.setItem('minorista', JSON.stringify(art2));
        props.setear(props.productXMayor.length, art2.length)
    }

    //Manage tabs
    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab)
    }

    //price total in list
    var totalMayor = 0;
    var totalMenor = 0;
    artMayor.forEach(item => {
        totalMayor += item.quantity * item.precioMayor
    })
    artMEnor.forEach(item => {
        totalMenor += item.quantity * item.precioMenor
    })

    //Sale of price for mayor
    function wholesale(e) {
        e.preventDefault()
        if (totalMayor !== 0 && totalMayor > 3500) {
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
                .then(data => window.location.href = data.init_point)
                .catch(err => console.error(err, "error"))

            artMayor.splice(artMayor);
            setArtMayor(artMayor);
            localStorage.setItem('mayorista', JSON.stringify(artMayor));
            props.setear(artMayor.length, props.productXMenor.length)
        }
        else (alert("El monto minimo para una compra por mayor es de $3500"))
    }

    //SAle of minority price
    function retailSale(e) {
        e.preventDefault()
        if(artMEnor.length !==0){
            fetch(`http://localhost:4000/sales`, {
                method: "POST",
                body: JSON.stringify({
                    products: artMEnor
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => window.location.href = data.init_point)
                .catch(err => console.error(err, "error"))
            artMEnor.splice(artMEnor);
            setArtMEnor(artMEnor);
            localStorage.setItem('minorista', JSON.stringify(artMEnor));
            props.setear(props.productXMayor.length, artMEnor.length)
        }
        else{
            alert('El carrito esta vacio')
        }
    }

    return (
        <div>
            <Nav tabs>
                <NavItem className="col-6">
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}>
                        Productos Seleccionados Por Menor
                        </NavLink>
                </NavItem>
                <NavItem className="col-6">
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
                    <Table bordered>
                        <thead>
                            <tr>
                                <th className="text-center">Imagen</th>
                                <th className="text-center">Producto</th>
                                <th className="text-center">Talle</th>
                                <th className="text-center">Cantidad</th>
                                <th className="text-center">Total</th>
                                <th className="text-center">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {artMEnor.map((item, index) => (
                                <tr>
                                    <th className="w-25 text-center"><img className="img-thumbnail w-50" src={item.imageUrl["0"].base64} alt="" />  </th>
                                    <th className="text-center">{item.titulo}</th>
                                    <th className="text-center">{item.talles}</th>
                                    <th className="text-center">{item.quantity}</th>
                                    <th className="text-center">{item.precioMenor * item.quantity}</th>
                                    <th className="text-center my-auto"><button className="btn btn-danger" onClick={() => deleteArtMenor(index)}>Eliminar</button></th>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="container rounded-bottom mb-2">
                        <div className="d-flex justify-content-end">
                            <h5 className="mr-5 my-1">Total $ {totalMenor}</h5>
                        </div>
                        <div className="row">
                            <Link to="/" className="mx-auto my-1 btn btn-primary btn-sm border-dark" >Seguir Comprando</Link>
                            <Link id="xmenor" className="mx-auto my-1 btn btn-primary btn-sm border-dark link" onClick={(e) => retailSale(e)}>Finalizar Compra</Link>
                        </div>
                    </div>
                </TabPane>
                <TabPane tabId="2">
                    <div className="container my-5">
                        <h1 className="text-dark font-italic">Productos Seleccionados x mayor</h1>
                        <h2 className="text-dark font-italic">Recuerde que el monto total debe ser mayor a $3500</h2>
                    </div>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th className="text-center">Imagen</th>
                                <th className="text-center">Producto</th>
                                <th className="text-center">Talle</th>
                                <th className="text-center">Cantidad</th>
                                <th className="text-center">Total</th>
                                <th className="text-center">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {artMayor.map((item, index) => (
                                <tr>
                                    <th className="w-25 text-center"><img className="img-thumbnail w-50" src={item.imageUrl["0"].base64} alt="" />  </th>
                                    <th className="text-center">{item.titulo}</th>
                                    <th className="text-center">{item.talles}</th>
                                    <th className="text-center">{item.quantity}</th>
                                    <th className="text-center">{item.precioMayor * item.quantity}</th>
                                    <th className="text-center my-auto"><button className="btn btn-danger" onClick={() => deleteArtMayor(index)}>Eliminar</button></th>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="container rounded-bottom mb-2">
                        <div className="d-flex justify-content-end">
                            <h5 className="mr-5 my-1">Total $ {totalMayor}</h5>
                        </div>
                        <div className="row">
                            <Link className="mx-auto my-1 btn btn-primary btn-sm border-dark" >Seguir Comprando</Link>
                            <Link id="xmayor" className="mx-auto my-1 btn btn-primary btn-sm border-dark link" onClick={(e) => wholesale(e)}>Finalizar Compra</Link>
                        </div>
                    </div>

                </TabPane>

            </TabContent>
        </div >
    )
}