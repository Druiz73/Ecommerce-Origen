import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';


export default function TableProducts(props) {

  const [product, setProduct] = useState({
    product: [],
    id: "",
    titulo: "",
    precioMayor: "",
    precioMenor: "",
    stock: "",
    descripcion: "",
    talles: [],
    category: "",
    categories: []
  });

  //Manage images save
  function onChange(e) {
    // current array of options
    let index
    // check if the check box is checked or unchecked
    if (e.target.checked) {

      // add the numerical value of the checkbox to options array
      product.talles.push(e.target.value)
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = product.talles.indexOf(e.target.value)
      product.talles.splice(index, 1)
    }
    // update the state with the new array of options
    setProduct({ ...product, talles: product.talles })
  }
  //Manage inputs
  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    setProduct({
      ...product,
      [name]: value
    })
  }

  //Manage Checkbox
  function checkbox(element) {

    for (let f = 0; f < element.length; f++) {
      for (let i = 0; i < document.formEdit.elements.length; i++)

        if (document.formEdit.elements[i].type == "checkbox" && document.formEdit.elements[i].value === element[f]) {
          document.formEdit.elements[i].checked = 1
        }
    }
  }

  //Send product to edit
  function productToEdit(element) {
    setProduct({ product: element, id: element._id, titulo: element.titulo, precioMayor: element.precioMayor, precioMenor: element.precioMenor, stock: element.stock, descripcion: element.descripcion, talles: element.talles, category: element.category })
    checkbox(element.talles)
  }

  //Save name category to show in inputs
  function nameCategory(idCategory) {
    for (let index = 0; index < props.categories.length; index++) {

      if (idCategory === props.categories[index]._id) {
        return props.categories[index].nombre
        break;
      }
    }
  }

  //save category of inputs to edit
  const handleCategorie = ((e) => {
    setProduct({
      ...product,
      category: e.target.value
    })
  })

  return (
    <div>
      <div className="container">
        <Table className="table">
          <thead>
            <tr>
              <th scope="col">Titulo</th>
              <th scope="col">Precio por Mayor</th>
              <th scope="col">Precio por Menor</th>
              <th scope="col">Stock</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Talles</th>
              <th scope="col">Categoria</th>
            </tr>
          </thead>
          <tbody>
            {props.products.map((element) => (
              <tr key={element._id}>
                <td>{element.titulo}</td>
                <td>{element.precioMayor}</td>
                <td>{element.precioMenor}</td>
                <td>{element.stock}</td>
                <td>{element.descripcion}</td>
                <td>{element.talles}</td>
                <td>{nameCategory(element.category)}</td>
                <td> <Button type="button" onClick={() => productToEdit(element)} className="btn btn-primary" data-toggle="modal" data-target="#editModal" > Editar </Button></td>
                <td><Button onClick={() => props.delete(element._id)}>Eliminar</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="modal fade" id="editModal" role="dialog" aria-labelledby="modalEditar" aria-hidden="true"  >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalEditar">EDITAR</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form name="formEdit">
                <div className="modal-body" >
                  <FormGroup inline>
                    <Label>titulo</Label>
                    <Input type="text" name="titulo" value={product.titulo} id="tituloEdit" onChange={(e) => handleInput(e)}></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Precio por mayor</Label>
                    <Input type="number" name="precioMayor" id="mayorEdit" value={product.precioMayor} onChange={(e) => handleInput(e)} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Precio por Menor</Label>
                    <Input type="number" name="precioMenor" id="menorEdit" value={product.precioMenor} onChange={(e) => handleInput(e)} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="categoria">Categoria</Label>
                    <Input type="select" value={product.category} onChange={(e) => handleCategorie(e)}>
                      {props.categories.map((element) => (
                        <option key={element._id} value={element._id} defaultValue={product.category} selected>{element.nombre}</option>
                      ))}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Stock</Label>
                    <Input type="number" value={product.stock} name="stock" id="stockEdit" onChange={(e) => handleInput(e)} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Descripcion del producto</Label>
                    <Input type="text" value={product.descripcion} name="descripcion" id="descripcionEdit" onChange={(e) => handleInput(e)} />
                  </FormGroup>
                  <h5>Talles</h5>
                  <FormGroup check inline>
                    <Label check>
                      <Input type="checkbox" value={"S"} onChange={(e) => onChange(e)} /> S
                                 </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input type="checkbox" value={"M"} onChange={(e) => onChange(e)} /> M
                                  </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input type="checkbox" value={"L"} onChange={(e) => onChange(e)} /> L
                                </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input type="checkbox" value={"XL"} onChange={(e) => onChange(e)} /> XL
                             </Label>
                  </FormGroup>

                  {/* NUMEROS */}
                  <FormGroup check inline>
                    <Label check>
                      <Input type="checkbox" value={"38"} onChange={(e) => onChange(e)} /> 38
                 </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input type="checkbox" value={"39"} onChange={(e) => onChange(e)} /> 39
                 </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input type="checkbox" value={"40"} onChange={(e) => onChange(e)} /> 40
                 </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input type="checkbox" value={"41"} onChange={(e) => onChange(e)} /> 41
                 </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input type="checkbox" value={"42"} onChange={(e) => onChange(e)} /> 42
                 </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input type="checkbox" value={"43"} onChange={(e) => onChange(e)} /> 43
                 </Label>
                  </FormGroup>
                </div>
                <div className="modal-footer">
                  <Button type="button" id="cerrar" className="btn btn-secondary" data-dismiss="modal">Close</Button>
                  <Button type="button" id="editProduct" onClick={(id, titulo, precioMayor, precioMenor, stock, descripcion, talles, category, imageUrl) => (props.edit(product.id, product.titulo, product.precioMayor, product.precioMenor, product.stock, product.descripcion, product.talles, product.category))} className="btn btn-primary" data-dismiss="modal">Modificar</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}