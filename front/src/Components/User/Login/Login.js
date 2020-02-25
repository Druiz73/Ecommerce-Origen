import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import GoogleLogin from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Login(props) {
  const [login, setLogin] = useState({
    email: '',
    password: ''
  })

  // const responseGoogle = (response) => {
  //   console.log(response);
  // }

  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    setLogin({
      [name]: value
    })
  }

  function handleLogin(email, password) {

    fetch("http://localhost:4000/user/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => {
      if (response) {
        props.history.push(`/profile`)
      }
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })


  }


  return (
    <div className="app flex-row align-items-center mt-5 mb-5">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
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
                      <Input type="text" value={login.email} name="email" placeholder="email" autoComplete="username" onChange={(e) => handleInput(e)} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" value={login.password} name="password" placeholder="Password" autoComplete="current-password" onChange={(e) => handleInput(e)} />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button onClick={(email, password) => handleLogin(login.email, login.password)} color="primary" className="px-4">Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Olvidaste la contraseña?</Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                {/* <p>Or Sign In with google</p> */}
                {/* <GoogleLogin
                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                  render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                  )}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                /> */}
              </Card>
              <Card className="text-white bg-dark py-5 d-md-down-none" style={{ width: '44%' }}>
                <CardBody className="text-center">
                  <div>
                    <h2>Crear Cuenta</h2>
                    <p>Registrate! solo te tomara unos pocos minutos</p>
                    <Link to="/register">
                      <Button color="primary" className="mt-3" active tabIndex={-1}>Registrarse</Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>

        </Row>
      </Container>
    </div>
  );
}



