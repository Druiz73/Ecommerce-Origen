import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


export default function Create(props) {
    const [product, setProduct] = useState({
        titulo: "",
        precioMayor: "",
        precioMenor: "",
        stock: "",
        descripcion: "",
        talles: [],
        category: "",
        imageUrl: []
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
                let fileInfo = {
                    //   name: file.name,
                    //   type: file.type,
                    //   size: Math.round(file.size / 1000) + ' kB',
                    base64: reader.result
                    //   file: file,
                };
                // Push it to the state
                allFiles.push(fileInfo);

                // If all files have been proceed
                if (allFiles.length === files.length) {
                    // Apply Callback function
                    if (props.multiple) props.onDone(allFiles);
                    else props.onDone(allFiles[0]);
                }
            } // reader.onload
        } // for
    }

    const handleCategoria = ((e) => {
        setProduct({
            ...product,
            category: e.target.value
        })
    })


    function handleInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        setProduct({
            ...product,
            [name]: value
        })
    }

    function onChange(e) {
        // current array of options
        let index
        // check if the check box is checked or unchecked
        if (e.target.checked) {
            // add the numerical value of the checkbox to options array
            product.talles.push(e.target.value);

        } else {
            // or remove the value from the unchecked checkbox from the array
            index = product.talles.indexOf(e.target.value)
            product.talles.splice(index, 1)
        }
        // update the state with the new array of options
    }

    function save(titulo, precioMayor, precioMenor, stock, descripcion, talles, category, imageUrl) {
        if(titulo!=="" && precioMayor!=="" && precioMenor !=="" && stock !=="" && descripcion!=="" && talles !=="" && category !=="" && imageUrl!=="" )
        {
            fetch("http://localhost:4000/products/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    titulo: titulo,
                    precioMayor: precioMayor,
                    precioMenor: precioMenor,
                    stock: stock,
                    descripcion: descripcion,
                    talles: talles,
                    category: category,
                    imageUrl: imageUrl
                })
            })
                .then(resp => resp.json())
                .then(data => {
                    props.getProducts();
                    limpiar();
                    deseleccionar_todo();
                })
        }
        else{alert("todos los campos son requeridos")}
       
    };
    let imageurl = document.getElementById("image");
    const limpiar = ((e) => {
        (imageurl.value = null)
        setProduct({
            ...product,
            titulo: "",
            precioMayor: "",
            precioMenor: "",
            stock: "",
            descripcion: "",
            talles: [],
            category: "",
            imageUrl: []
        })
    })

    function deseleccionar_todo(){
        for (let i=0;i<document.f1.elements.length;i++)
           if(document.f1.elements[i].type == "checkbox")
              document.f1.elements[i].checked=0
     }



    return (
        <Form className="col-8 mx-auto text-center" name="f1" >
            <h2>Crear Producto</h2>
            <FormGroup>
                <Label for="titulo">Producto</Label>
                <Input type="text" name="titulo" value={product.titulo} id="titulos" placeholder="nombre producto" onChange={(e) => handleInput(e)} />
            </FormGroup>
            <FormGroup>
                <Label for="mayor">Precio por Mayor</Label>
                <Input type="number" name="precioMayor" id="mayor" value={product.precioMayor} placeholder="Precio x mayor" onChange={(e) => handleInput(e)} />
            </FormGroup>
            <FormGroup>
                <Label for="menor">Precio por Menor</Label>
                <Input type="number" name="precioMenor" id="menor" value={product.precioMenor} placeholder="Precio x menor" onChange={(e) => handleInput(e)} />
            </FormGroup>
            <FormGroup>
                <Label for="categoria">Categoria</Label>
                <Input type="select" value={product.category} onChange={(e) => handleCategoria(e)}>
                    {props.category.map((element) => (
                        <option key={element._id} value={element._id} defaultValue={element[0]} selected>{element.nombre}</option>
                    ))}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="stock">Stock</Label>
                <Input type="number" value={product.stock} name="stock" placeholder="stock" id="stock" onChange={(e) => handleInput(e)} />
            </FormGroup>
            <FormGroup>
                <Label for="descripcion">Descripcion</Label>
                <Input type="text" value={product.descripcion} placeholder="descripcion" name="descripcion" id="descripcion" onChange={(e) => handleInput(e)} />
            </FormGroup>
            <FormGroup>
                <Label for="file">Subir imagen de producto:</Label>
                <Input className="text-center mx-auto" id="image" type="file" multiple={props.multiple} accept="image/*" name="imageUrl" onChange={(e) => handleChange(e)} />
                <span className="hint">Supported files: jpg, jpeg, png.</span>
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
            <FormGroup>
                <Button className="btn btn-warning mt-5 mx-auto" type="button" onClick={() => save(product.titulo, product.precioMayor, product.precioMenor, product.stock, product.descripcion, product.talles, product.category, props.imageUrl)}>Crear</Button>
            </FormGroup>
        </Form>
    );
}
