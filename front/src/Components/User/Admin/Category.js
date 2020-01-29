import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Checkbox, Table } from 'reactstrap';

export default function Category(props) {
    const [category, setcategory] = useState({
        nombre: ""
    });

    function handleInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        setcategory({
            ...category,
            [name]: value
        })
        console.log(category.nombre)
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <Form className="col-12 col-lg-6 mx-auto text-center">
                    <h2>Crear Categoria</h2>
                    <FormGroup>
                        <Label for="categoria">Nombre</Label>
                        <Input type="text" name="nombre" value={category.nombre}  placeholder="nombre categoria" onChange={(e) => handleInput(e)} />
                    </FormGroup>
                    <FormGroup >
                        <Button onClick={()=>props.saveCategory(category.nombre)}>Crear</Button>
                    </FormGroup>
                </Form>
                <div className="col-12 col-lg-6">
                    <Table>
                        <thead>
                            <tr>
                                <th>Categorias</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.category.map((element) => (
                                <tr key={element._id}>
                                    <td>{element.nombre}</td>
                                    <td> <Button type="button" onClick={() => props.editCategory({ id: element._id, nombre: element.nombre })} className="btn btn-primary" data-toggle="modal" data-target="#editModal" > Editar </Button></td>
                                    <td><Button onClick={() => props.deleteCategory(element._id)}>Eliminar</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
