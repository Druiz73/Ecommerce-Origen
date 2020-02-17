import React, { useState } from 'react';
import {Link} from 'react-router-dom';


export default function FormContact() {
    const [consulta, setConsulta] = useState({
        nombre: "",
        email: "",
        motivo: "",
        detalles: ""
    });

    function handleInput(e) {

        const { name, value } = e.target;//destructurin de los valores enviados por el metodo onchange de cada input
        let regex = new RegExp("^[ñíóáéú a-zA-Z0-9 /@/ /./]+$");
        for (let i = 0; i <= value.length - 1; i++) {
            let letra = value[i]
            if (!regex.test(letra) || !letra === " ") {
                return;
            }
        }
        setConsulta({
            ...consulta,
            [name]: value
        });
    }
    
    function save() {
        fetch("http://localhost:3001/contact/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: consulta.nombre,
                email: consulta.email,
                motivo: consulta.motivo,
                detalles: consulta.detalles
            })
        })
            // .then(resp => resp.json())
            // .then(data => {
            //     this.get();

                
            // })
    }

    return (

        <div>
            <h2 className=" text-warning mb-5">Contacto</h2>
            <form className="col-8 text-center mx-auto">
                <div className="form-group">
                    <label htmlFor="nombre" className="text-center">Nombre y apellido</label>
                    <input type="nombre" className="form-control" value={consulta.nombre} name="nombre" onChange={(e) => handleInput(e)} id="nombre" placeholder="nombre y apellido" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="text-center">Email address</label>
                    <input type="email" className="form-control" value={consulta.email} onChange={(e) => handleInput(e)} name="email" id="email" placeholder="name@example.com" required />
                </div>
                <div className="form-group">
                    <label htmlFor="motivo" className="text-center"> Motivo</label>
                    <input type="motivo" name="motivo" className="form-control" value={consulta.motivo} onChange={(e) => handleInput(e)} id="motivo" placeholder="Motivo" required />
                </div>
                <div className="form-group">
                    <label htmlFor="detalles" className="text-center">Detalles</label>
                    <textarea className="form-control" value={consulta.detalles} onChange={(e) => handleInput(e)} name="detalles" id="detalles" rows="3" required></textarea>
                </div>
                <Link className="btn btn-warning mb-5" onClick={()=>save()} to='/thanks'> Enviar </Link>
            </form>
        </div>
    )
}
