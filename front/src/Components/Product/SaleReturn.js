import React, { useEffect } from 'react';
import approved from '../imgs/jokkerAPROBADO.png';
import rejected from '../imgs/JOKKERRECHAZADO.png';
import inProcess from '../imgs/JOKKERPENDIENTE.png';
import apiUrl from '../../config';

export default function SaleReturn() {


    let id = window.location.search
    const urlParams = new URLSearchParams(id)
    let idSale = urlParams.get('external_reference');
    let saleState = urlParams.get('collection_status');

    useEffect(() => {
        changeStatusSale(idSale, saleState);
        saleApproved(saleState, idSale);
    }, [id, urlParams, idSale, saleState])

    function saleApproved(resp, idsale) {
        if (resp === "approved") {
            getSale(idsale)
        }
    }

    //Traer venta y Cambiar el estado
    function changeStatusSale(id, state) {
        //modificar estado
        fetch("http://localhost:4000/sales/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: state
            })
        })
            .then(resp => resp.json())
            .then(data => { console.log(data) });
    }

    //traer venta, guardar en un estado los productos vendidos
    function getSale(id) {
        fetch("http://localhost:4000/sales/" + id)
            .then(resp => resp.json())
            .then(data => {
                sendProductToUpdate(data.products)
                console.log(data)
            })

    }

    function sendProductToUpdate(products) {

        fetch("http://localhost:4000/products/sale", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                products: products
            })
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
            })
    }

    console.log(saleState)
    switch (saleState) {
        case "approved":
            return (
                <div className="container-fluid col-12">
                    <a href={apiUrl}><img className="img-fluid" src={approved} alt="aprobado" ></img></a>
                </div>
            )
        case "rejected":
            return (
                <div className="container-fluid col-12">
                    <a href={apiUrl}><img className="img-fluid" alt="rechazado" src={rejected}></img></a>
                </div>
            )
        case "in_process":
            return (
                <div className="container-fluid col-12">
                    <a href={apiUrl}><img className="img-fluid" alt="rechazado" src={inProcess}></img></a>
                </div>
            )
        default:
            break;
    }
}
