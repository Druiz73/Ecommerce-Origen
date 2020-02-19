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
            activeTab: "1",
            talles: [],
            category: [],
            imageUrl: [],
            nombre:""
        }
    }
    toggle = (tab) => {
        if (this.state.activeTab !== tab) this.setState({ activeTab: tab })
    }

   componentDidMount(){
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
            this.setState({nombre:""})
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
   

    getFiles(files) {
        this.setState({ imageUrl: files })
    }

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
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Category  handleInput={((e)=> this.handleInput(e))} category={this.state.category} nombre={this.state.nombre} saveCategory={(nombre)=>this.saveCategory(nombre)}  deleteCategory={(id) => this.deleteCategory(id)} />
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <Create imageUrl={this.state.imageUrl} multiple={true}  getProducts={() => this.get()} onDone={(files) => this.getFiles(files)}  category={this.state.category} />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
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
