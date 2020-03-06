import React, { useState } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
export default function LoginAdmin() {
  const [email, setEmail] = useState({
  })

  const [pass, setPass] = useState({
  })

  const [sec, setSec] = useState({
  })

  function handleEmail(e) {
    const name = e.target.name;
    const value = e.target.value;
    setEmail({
      [name]: value
    })
  }

  function handlePass(e) {
    const name = e.target.name;
    const value = e.target.value;
    setPass({
      [name]: value
    })
  }

  function handleLogin(email, password) {

    fetch("http://localhost:4000/admin/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {

        if (data.error == "user does not exist") {
          alert("email y contraseña no coinciden")
        }
        else {
          localStorage.setItem('adminToken', data.token);
          setSec({ token: data.token })
        }
      })
  }
  return (
    <div className="col-12 col-lg-6 mx-auto">
      <CardBody>
        <Form>
          <h1>Login</h1>
          <p className="text-muted">Ingrese Su Cuenta</p>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              </InputGroupText>
            </InputGroupAddon>
            <Input type="text" value={email.username} name="username" placeholder="username" autoComplete="username" onChange={(e) => handleEmail(e)} />
          </InputGroup>
          <InputGroup className="mb-4">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
              </InputGroupText>
            </InputGroupAddon>
            <Input type="password" value={pass.password} name="password" placeholder="Password" autoComplete="current-password" onChange={(e) => handlePass(e)} />
          </InputGroup>
          <Row>
            <Col xs="6">
              <Button onClick={() => handleLogin(email.username, pass.password)} color="primary" className="px-4">Login</Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </div>
  )
}
