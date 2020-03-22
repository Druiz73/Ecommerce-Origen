import React from 'react';
import { Button,Table } from 'reactstrap';
export default function Suscribers(props) {
    return (
       
      <div className="container">
        <Table className="table">
          <thead>
            <tr>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {props.suscribers.map((element) => (
              <tr key={element._id}>
                <td>{element.email}</td>
                <td><Button onClick={() => props.delete(element._id)}>Eliminar</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
    )
}
