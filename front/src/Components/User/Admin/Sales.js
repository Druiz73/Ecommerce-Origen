import React, { useState, useEffect } from 'react';
import { Button, Table } from 'reactstrap';
import moment from 'moment';

export default function VentasAdmin() {
    const [ventas, setVentas] = useState({
        sales: []
    });

    const [details, setDetails] = useState({
        codigo: "",
        date: "",
        status: "",
        products: [],
        productName: ""
    })

    useEffect(() => {
        getVentas();
    }, [])

    function getVentas() {
        fetch(`http://localhost:4000/sales`)
            .then(resp => resp.json())
            .then(data => {
                setVentas({
                    sales: data
                })
            })
    }

    function saleToShow(element) {
        setDetails({
            codigo: element._id,
            date: element.orderDate,
            status: element.status,
            products: element.products
        })
        totalSale(element.products)
    }

    function totalSale(products) {
        let file = document.getElementById("totalSale");
        let array = [];
        let object = 0;
        let element = 0;
        file.innerHTML = "";
        products.forEach(element => {
            object = element.unit_price * element.quantity;
            array.push(object);
        });
        for (let index = 0; index < array.length; index++) {
            element = array[index] + element;
        }

        file.innerHTML += `Venta Total: ${(element.toString())}`;
    }



    return (
        <body>
            <div className="container py-3">
                <div className="row">
                    <h1 className="mr-auto">Ventas</h1>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <table className="table table-hover table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">Detalle</th>
                                    <th scope="col" className="text-center">Accion</th>

                                </tr>
                            </thead>
                            {ventas.sales.map((element) => (
                                <tbody id="tBody">
                                    <td>{moment(element.orderDate).format('LLLL')}</td>
                                    <td className="text-center"> <Button type="button" onClick={() => saleToShow(element)} className="btn btn-primary" data-toggle="modal" data-target="#details" > Ver </Button></td>
                                </tbody>
                            ))}
                        </table>
                        <div className="modal fade" id="details" role="dialog" aria-labelledby="modaldetails" aria-hidden="true"  >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="modaldetails">Detalles</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form>
                                        <div className="modal-body">
                                            <ul>
                                                <li>Fecha: {moment(details.date).format('LLLL')}</li>
                                                <li>Estado: {details.status}</li>
                                                <Table>
                                                    <thead className="mt-3">
                                                        <tr>
                                                            <th scope="col-3">Titulo</th>
                                                            <th scope="col-3">cantidad</th>
                                                            <th scope="col-3">Precio </th>
                                                            <th scope="col-3 ">Total </th>
                                                        </tr>
                                                    </thead>
                                                    {details.products.map((item) => (
                                                        <tbody>
                                                            <td>{item.title}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.unit_price}</td>
                                                            <td >{item.unit_price * item.quantity}</td>
                                                        </tbody>
                                                    ))}
                                                </Table>
                                                <li id="totalSale"> </li>
                                            </ul>

                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>

    )

}



