import React, { useState, useEffect } from 'react';
import aproved from '../imgs/jokkerAPROBADO.png';

export default function SaleReturn(props) {
const [returnMercadoPago, setreturnMercadoPago] = useState()


    let id = window.location.search

    //Obtener la url devuelta por mercado pago y convertirla en objetos
    function dividirCadena(cadenaADividir, separador) {
        let save = [];
        let arrayDeCadenas = cadenaADividir.split(separador);
        arrayDeCadenas.splice(0, 1)
        for (let index = 0; index < arrayDeCadenas.length; index++) {
            let cadena = arrayDeCadenas[index];
            cadena = cadena.replace("=", ":");
            const name = new Object(cadena);
            save.push(name)
        }

        console.log(save)
        setreturnMercadoPago(save)
    }

    return (
        <div>
            <p>hello moto {id}</p>
            {dividirCadena(id, "&")}
        </div>
    )
}
