import React, { useState } from 'react';
import FormEdit from './FormEdit';
import { Button, Table  } from 'reactstrap';

export default function TableProducts(props) {

  const [product, setProduct] = useState({
    product:[],
    id:"",
    titulo:"",
    precioMayor:"",
    precioMenor:"",
    stock:"",
    descripcion:"",
    talles: [],
    category:""
});





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
                <td>{element.category}</td>
                <td> <Button type="button" onClick={() => setProduct({product:element, id: element._id, titulo: element.titulo, precioMayor: element.precioMayor, precioMenor:element.precioMenor, stock: element.stock, descripcion: element.descripcion, talles: element.talles, category: element.category  })} className="btn btn-primary" data-toggle="modal" data-target="#editModal" > Editar </Button></td>
                <td><Button onClick={() => props.delete(element._id)}>Eliminar</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
        <FormEdit  products={product} edit={(id, titulo, precioMayor, precioMenor, stock, descripcion, talles) => props.edit(product.id, titulo, precioMayor, precioMenor,stock,descripcion, talles)} myId={product.id}/>
      </div>
    </div>
  )
}