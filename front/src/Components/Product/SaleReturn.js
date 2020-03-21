import React, { useState, useEffect } from 'react';
import approved from '../imgs/jokkerAPROBADO.png';
import rejected from '../imgs/JOKKERRECHAZADO.png';

export default function SaleReturn() {
    const [sale, setSale] = useState({ products: "" })

    let id = window.location.search
    const urlParams = new URLSearchParams(id)
    let idSale = urlParams.get('external_reference');
    let saleState = urlParams.get('collection_status');
    useEffect(() => {
        changeStatusSale(idSale, saleState);
        saleApproved(saleState, idSale);
    }, [])

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

    if (saleState === "approved") {
        return (
            <div className="container-fluid col-12">
                <a href="http://localhost:3000"><img className="img-fluid" src={approved} ></img></a>
            </div>
        )
    } else if (saleState === "rejected") {
        return (
            <div className="container-fluid col-12">
                <a href="http://localhost:3000"><img className="img-fluid" src={rejected}></img></a>
            </div>
        )
    }

}
