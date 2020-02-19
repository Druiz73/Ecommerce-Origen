import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faLock,faUser } from '@fortawesome/free-solid-svg-icons'
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
class Register extends Component {
  state = {
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    check:""
  }

   handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
        [name]: value
    })
    console.log(this.state)
}


onClick (firstName, lastName, email, password){

  if(this.state.password === this.state.check){
    console.log("hola")
    fetch("http://localhost:4000/user/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      })
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
      })
  }
  else{
    alert("las contraseñas no coinciden")
  }
}


  render() {
    return (
      <div className="app flex-row align-items-center mt-5 mb-5">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" value={this.state.firstname} name="firstname" placeholder="nombre" autoComplete="name" onChange={(e)=>this.handleInput(e)} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" value={this.state.lastname} name="lastname" placeholder="apellido" autoComplete="lastname" onChange={(e)=>this.handleInput(e)}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <FontAwesomeIcon icon={faAt}></FontAwesomeIcon>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="mail" value={this.state.email} name="email" placeholder="Email" autoComplete="email" onChange={(e)=>this.handleInput(e)}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" value={this.state.password} name="password" placeholder="Password" autoComplete="new-password" onChange={(e)=>this.handleInput(e)}/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" value={this.state.check} name="check" placeholder="repetir password" autoComplete="new-password" onChange={(e)=>this.handleInput(e)}/>
                    </InputGroup>
                    <Button  onClick={(()=>this.onClick( this.state.firstname, this.state.lastName, this.state.email, this.state.password))} className="btn btn-success">Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-google mb-1" block><span>google</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;