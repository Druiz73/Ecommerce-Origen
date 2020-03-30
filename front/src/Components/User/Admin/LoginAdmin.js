import React, { useState } from 'react';
import { Button, CardBody, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import apiUrl from '../../../config';
import backUrl from '../../../configUrl'


export default function LoginAdmin() {
  const [email, setEmail] = useState({
  })

  const [pass, setPass] = useState({
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

  function handleLogin(userEmail, userPassword) {
    if (userEmail !== undefined && userPassword !== undefined) {
      fetch(`${backUrl}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.message === "Login Failed") {
            alert("email y contraseña no coinciden")
          }
          else if (data.message === "Login Successfully") {
            localStorage.setItem('jokker', data.token);
            window.location.href = `${apiUrl}/administrar/admin`;
          }
        })
    } else {
      alert("ingrese todos los campos")
    }
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
            <Input type="text" id="userName" value={email.username} name="username" placeholder="username" autoComplete="username" onChange={(e) => handleEmail(e)} required />
          </InputGroup>
          <InputGroup className="mb-4">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
              </InputGroupText>
            </InputGroupAddon>
            <Input type="password" id="userPass" value={pass.password} name="password" placeholder="Password" autoComplete="current-password" onChange={(e) => handlePass(e)} required />
          </InputGroup>
          <Row>
            <Col xs="6">
              <Button type="button" id="buttonAdmin" onClick={() => handleLogin(email.username, pass.password)} color="primary" className="px-4">Login</Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </div>
  )
}

