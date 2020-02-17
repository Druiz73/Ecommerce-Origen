import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export default function FormEdit(props) {
    const [product, setproduct] = useState({
        product: [],
        id: "",
        titulo: props.products.titulo,
        precioMayor: "",
        precioMenor: "",
        stock: "",
        descripcion: "",
        talles: [],
        category: ""
    });

    function handleInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        setproduct({
            ...product,
            [name]: value
        })

    }


    function handleModal(e) {
        if (props.product != []) {
            setproduct({
                id: props.product.id,
                titulo: props.product.titulo,
                precioMayor: props.product.precioMayor,
                precioMenor: props.product.precioMenor,
                stock: props.product.stock,
                descripcion: props.product.descripcion,
                talles: props.product.talles,
                category: props.product.category
            })
        }
    }


    function onChange(e) {
        // current array of options

        let index
        // check if the check box is checked or unchecked
        if (e.target.checked) {
            console.log("hola")
            // add the numerical value of the checkbox to options array
            product.talles.push(e.target.value)
            console.log(product.talles)
        } else {
            // or remove the value from the unchecked checkbox from the array
            index = product.talles.indexOf(e.target.value)
            product.talles.splice(index, 1)
        }
        // update the state with the new array of options
        // setProduct({ talles: product.talles })
    }

    return (
        <div>
            <div className="modal fade" id="editModal" role="dialog" aria-labelledby="modalEditar" aria-hidden="true"  >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalEditar">EDITAR</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" >
                            <FormGroup>
                                <Input type="text" name="titulo" value={product.titulo} id="tituloEdit" placeholder={props.products.titulo} onChange={(e) => handleInput(e)}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Input type="number" name="precioMayor" id="mayorEdit" value={product.precioMayor} placeholder="Precio x mayor" onChange={(e) => handleInput(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Input type="number" name="precioMenor" id="menorEdit" value={product.precioMenor} placeholder="Precio x menor" onChange={(e) => handleInput(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Input type="number" value={product.stock} placeholder="Stock" name="stock" id="stockEdit" onChange={(e) => handleInput(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" value={product.descripcion} placeholder="descripcion" name="Descripcion" id="descripcionEdit" onChange={(e) => handleInput(e)} />
                            </FormGroup>
                            <h5>Talles</h5>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="checkbox" id="s" value={"S"} onChange={(e) => onChange(e)} /> S
                                 </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="checkbox" id="m" value={"M"} onChange={(e) => onChange(e)} /> M
                                  </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="checkbox" id="l" value={"L"} onChange={(e) => onChange(e)} /> L
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="checkbox" id="xl" value={"XL"} onChange={(e) => onChange(e)} /> XL
                             </Label>
                            </FormGroup>

                            {/* NUMEROS */}
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="checkbox" id="38" value={"38"} onChange={(e) => onChange(e)} /> 38
                 </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="checkbox" id="39" value={"39"} onChange={(e) => onChange(e)} /> 39
                 </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="checkbox" id="40" value={"40"} onChange={(e) => onChange(e)} /> 40
                 </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="checkbox" id="41" value={"41"} onChange={(e) => onChange(e)} /> 41
                 </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="checkbox" id="42" value={"42"} onChange={(e) => onChange(e)} /> 42
                 </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="checkbox" id="43" value={"43"} onChange={(e) => onChange(e)} /> 43
                 </Label>
                            </FormGroup>
                        </div>
                        <div className="modal-footer">
                            <Button type="button" id="cerrar" className="btn btn-secondary" data-dismiss="modal">Close</Button>
                            <Button type="button" onClick={() => (props.edit(props.myId, product.titulo, product.precioMayor, product.precioMenor, product.stock, product.descripcion))} className="btn btn-primary">Modificar</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
