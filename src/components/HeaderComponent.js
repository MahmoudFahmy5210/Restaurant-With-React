import React , {Component} from "react";
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem,
Jumbotron,Button,Modal,ModalBody,ModalHeader, Form, FormGroup, Label, Input } from 'reactstrap';
import { NavLink } from "react-router-dom";

class Header extends Component{
    constructor(props){
        super(props);
        this.state={
            isNavOpen: false,
            isModalOpen:false
        };
        this.toggleNav=this.toggleNav.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }

    toggleNav(){
        this.setState({
            isNavOpen:!this.state.isNavOpen
        });
    }
    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        });
    }
    //this func handlesc the values from the dom 
    handleLogin(evt){
        this.toggleModal();
        alert("Username :" + this.username.value +"password :" +this.password.value +"Remmber :" +this.remmber.checked);
        evt.preventDefault();
    }

    render(){
        return(
            <div>
               <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"><img src='assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/menu'><span className="fa fa-list fa-lg"></span> Menu</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                            </NavItem>
                            </Nav>
                            <Nav className="ml-auto">
                                <NavItem>
                                    <Button onClick={this.toggleModal}><span className="fa fa-sign-in lg mr-1"></span>Login</Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>

                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Hey do you know me , my name is " Mahmoud Samir "</h1>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label  htmlFor="username">Username</Label>
                                <Input  type="text" id="username" name="username" placehodler="Username"
                                innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label  htmlFor="password">Password</Label>
                                <Input  type="password" id="password" name="password" placehodler="Password"
                                innerRef={(input) => this.password = input} />
                            </FormGroup>
                            <FormGroup className="my-2" check>
                                <Label check>
                                    <Input type="checkbox" name="remmber" 
                                    innerRef={(input) => this.remmber = input}/>
                                    Remmber me
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" value="submit" color="primary">Login</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
export default Header;