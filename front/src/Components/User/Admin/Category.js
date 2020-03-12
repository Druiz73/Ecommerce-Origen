import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Checkbox, Table } from 'reactstrap';

export default function Category(props) {
    const [category, setcategory] = useState({
        nombre: "",
        image: ""
    });

    const handleChange = (e) => {

        // get the files
        let files = e.target.files;

        // Process each file
        var allFiles = [];
        for (var i = 0; i < files.length; i++) {

            let file = files[i];
            // Make new FileReader
            let reader = new FileReader();
            // Convert the file to base64 text
            reader.readAsDataURL(file);
            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                let fileInfo =  { base64: reader.result} 
                    //   name: file.name,
                    //   type: file.type,
                    //   size: Math.round(file.size / 1000) + ' kB',
                    
                    //   file: file,
                // Push it to the state
                allFiles.push(fileInfo);
               
            } // for
           
            setcategory({ ...category, image: allFiles })
        }
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <Form className="col-12 col-lg-6 mx-auto text-center">
                    <h2>Crear Categoria</h2>
                    <FormGroup>
                        <Label for="categoria">Nombre</Label>
                        <Input type="text" id="category" name="nombre" value={props.nombre} placeholder="nombre categoria" onChange={(e) => props.handleInput(e)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="file">Subir imagen de producto:</Label>
                        <Input className="text-center mx-auto" id="imageCat" type="file" accept="image/*" name="imageUrl" onChange={(e) => handleChange(e)} />

                    </FormGroup>
                    <FormGroup >
                        <Button onClick={() => props.saveCategory(props.nombre, category.image)}>Crear</Button>
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
