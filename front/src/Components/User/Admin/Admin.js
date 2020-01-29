import React, { Component, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Create from './Create';
import TableProducts from './TableProducts';
import Category from './Category';


export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            titulo: "",
            precioMayor: "",
            precioMenor: "",
            stock: "",
            descripcion: "",
            activeTab: "1",
            talles: [],
            category: [],
            imageUrl: []
        }
    }
    toggle = (tab) => {
        if (this.state.activeTab !== tab) this.setState({ activeTab: tab })
    }

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
    }


    save(titulo, precioMayor, precioMenor, stock, descripcion, talles, category,imageUrl) {

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
                category:category,
                imageUrl: imageUrl
            })
        })
            .then(resp => resp.json())
            .then(data => {
                this.get();

                
            })

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

    edit(id, titulo, precioMayor, precioMenor, stock, descripcion, category, imageUrl) {

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
                category: category,
                imageUrl: imageUrl
            })
        })

            .then(resp => resp.json())
            .then(data => {
                this.get();
            });
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
    deleteCategory(id) {

        fetch(`http://localhost:4000/categories/delete/${id}`, {
            method: 'DELETE'
        })
            .catch(err => console.error(err))
            .then((data) => {
                this.getCategory();
            })
    }
    saveCategory(nombre) {

        fetch("http://localhost:4000/categories/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre
            })
        })
        .then(resp => resp.json())
            .then(data => {
                this.getCategory();

                
            })
    }

    editCategory(id, nombre) {
        fetch("http://localhost:4000/categories/edit/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
            })
        })
            .then(resp => resp.json())
            .then(data => {
                this.getCategory();
            });
    };
    getFiles(files){
        this.setState({ imageUrl: files })
        console.log(this.state.imageUrl)
      }

    render() {
        return ( 
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}>
                            Crear Item
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}>
                            Editar item
                         </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <Create imageUrl={this.state.imageUrl} multiple={ true } onDone={(files)=> this.getFiles(files)}  save={(titulo, precioMayor, precioMenor, stock, descripcion, talles, category, imageUrl) => this.save(titulo, precioMayor, precioMenor, stock, descripcion, talles, category, this.state.imageUrl)}  category={this.state.category} />
                                
                            </Col>
                        </Row>
                        <Row>
                            <Category saveCategory={(nombre)=>this.saveCategory(nombre)} category={this.state.category} deleteCategory={(id)=>this.deleteCategory(id)} editCategory={(id,nombre)=>this.editCategory(id,nombre)} />
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <TableProducts products={this.state.products} delete={(id) => this.delete(id)} edit={(id, titulo, precioMayor, precioMenor, stock, descripcion, talles, category, imageUrl) => this.edit(id, titulo, precioMayor, precioMenor, stock, descripcion, talles, category, imageUrl)} />
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}
