import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Create from './Create';
import TableProducts from './TableProducts';
import Category from './Category';
import Suscribers from './Suscribers';
import Sales from './Sales';
import apiUrl from '../../../config';


export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            activeTab: "1",
            talles: [],
            category: [],
            imageUrl: [],
            nombre: "",
            suscribers: []
        }
    }

    //Manage tabs 
    toggle = (tab) => {
        if (this.state.activeTab !== tab) this.setState({ activeTab: tab })
    }

    //render start of aplication
    componentDidMount() {
        this.get();
        this.getCategory();
    }

    // CRUD PRODUCTOS
    get() {
        fetch("http://localhost:4000/products")
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    products: data
                })
            });

        fetch("http://localhost:4000/suscriber")
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    suscribers: data
                })
            });
    }

    delete(id) {
        fetch(`http://localhost:4000/products/delete/${id}`, {
            method: 'DELETE'
        })
            .catch(err => console.error(err))
            .then((data) => {
                this.get();
            })
    }

    edit(id, titulo, precioMayor, precioMenor, stock, descripcion, talles, category, imageUrl) {
        if (id !== "" && titulo !== "" && precioMayor !== "" && precioMenor !== "" && stock !== "" && descripcion !== "" && talles !== "" && category !== "" && imageUrl !== "") {

            fetch("http://localhost:4000/products/edit/" + id, {
                method: 'PUT',
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
                })
            })
                .then(resp => resp.json())
                .then(data => {
                    this.get();
                    this.getCategory();
                });
        }
        else {
            alert("Debe completar todos los campos")
        }
    }

    // CRUD CATEGORIAS
    getCategory() {
        fetch("http://localhost:4000/categories")
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    category: data
                })
            });
    }

    saveCategory(nombre, image) {
        let inputFile = document.getElementById("imageCat");
        fetch("http://localhost:4000/categories/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                image: image
            })
        })
            .then(resp => resp.json())
            .then(data => {
                this.getCategory();
            })
        this.setState({ nombre: "" })
        inputFile.value = null;
    }

    deleteCategory(id) {
        fetch(`http://localhost:4000/categories/delete/${id}`, {
            method: 'DELETE'
        })
            .catch(err => console.error(err))
            .then((data) => {
                this.getCategory();
            })
    }

    //delete suscriber
    deleteSuscriber(id) {
        fetch(`http://localhost:4000/suscriber/${id}`, {
            method: 'DELETE'
        })
            .catch(err => console.error(err))
            .then((data) => {
                this.get();
            })
    }

    //save images of product
    getFiles(files) {
        this.setState({ imageUrl: files })
    }

    //save inputs values
    handleInput(e) {
        const { name, value } = e.target;//destructurin de los valores enviados por el metodo onchange de cada input
        let regex = new RegExp("^[ñíóáéú a-zA-Z0-9 /@/ /./]+$");
        for (let i = 0; i <= value.length - 1; i++) {
            let letra = value[i]
            if (!regex.test(letra) || !letra === " ") {
                return;
            }
        }
        this.setState({
            [name]: value.toUpperCase()
        })
    }

    render() {
        let contextType = this.props.local;
        if (contextType !== '') {
            return (
                <div>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}>
                                Crear Categoria
                        </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}>
                                Crear Item
                        </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggle('3'); }}>
                                Editar item
                         </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '4' })}
                                onClick={() => { this.toggle('4'); }}>
                                Subscriptores
                         </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '5' })}
                                onClick={() => { this.toggle('5'); }}>
                                Ventas
                         </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Category handleInput={((e) => this.handleInput(e))} category={this.state.category} nombre={this.state.nombre} saveCategory={(nombre, image) => this.saveCategory(nombre, image)} deleteCategory={(id) => this.deleteCategory(id)} />
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    <Create imageUrl={this.state.imageUrl} multiple={true} getProducts={() => this.get()} onDone={(files) => this.getFiles(files)} category={this.state.category} />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="3">
                            <Row>
                                <Col sm="12">
                                    <TableProducts categories={this.state.category} products={this.state.products} delete={(id) => this.delete(id)} edit={(id, titulo, precioMayor, precioMenor, stock, descripcion, talles, category, imageUrl) => this.edit(id, titulo, precioMayor, precioMenor, stock, descripcion, talles, category)} />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="4">
                            <Row>
                                <Col sm="12">
                                    <Suscribers suscribers={this.state.suscribers} delete={(id) => this.deleteSuscriber(id)} />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="5">
                            <Row>
                                <Col sm="12">
                                    <Sales />
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>
            );
        }
        else {
            window.location.href = `${apiUrl}/badway`
        }
    }
}
