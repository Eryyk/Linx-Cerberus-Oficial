import React, { Component } from 'react';
import Axios from 'axios';
import Logo from '../../assets/imagens/logo.png';
import Url from '../../services/api';
import '../../assets/css/GeralT.css';
import { usuarioAutenticado, parseJwt } from '../../services/auth';
import { ToastContainer, toast } from 'react-toastify';

import { Col, Row, Image, Container, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            senha: ''
        }
    }

    atualizaEstadoEmail(event) {
        this.setState({ email: event.target.value });
    }

    atualizaEstadoSenha(event) {
        this.setState({ senha: event.target.value });
    }
    efetuarLogin = (event) => {
        event.preventDefault();

        Axios.post(Url + 'Login', { email: this.state.email , senha: this.state.senha })
        .then(data => {
            
            if (data.status === 200) {
                localStorage.setItem('usuario', data.data.token);
                console.log("Role", parseJwt().tipoUsuario);
                if (parseJwt().tipoUsuario === "Administrador"){
                    this.props.history.push("/Dashboard");
                } else {
                    this.props.history.push("/Dashboard");
                }
            }
        })
        .catch(erro => {
            toast.error('Usuário invalido');
        })
    }


    render() {
        return (
            <Container className="bg-linx t-w-h " fluid={true}>
                <Row >
                    <Col className="bg-linx " xs="12" lg="12">
                        <Row className="d-flex justify-content-around al-linx t-w-h">
                            <Image col="7" src={Logo} alt="Linx logotipo" id="imgLogin" className="d-flex hw-a" />
                            <Card col="5" className=" b-r-linx f-login" style={{ width: '18rem' }}>
                                <Card.Body className="d-flex  flex-column"  >
                                    <Card.Title className="f-s mb-auto">Login</Card.Title>
                                    <Form onSubmit={this.efetuarLogin.bind(this)} className="" >
                                        <Form.Group as={Col} className="brd a-l mb-2">
                                            <Form.Control
                                                type="email"
                                                className="inputLogin brd-i "
                                                placeholder="E-mail"
                                                onChange={this.atualizaEstadoEmail.bind(this)} />
                                            </Form.Group>
                                            <Form.Group as={Col} className="brd ">
                                            <Form.Control
                                                type="password"
                                                className="inputLogin brd-i "
                                                placeholder="Senha"
                                                onChange={this.atualizaEstadoSenha.bind(this)} />
                                            </Form.Group>
                                        <Button
                                        type="submit"
                                            value="Login"
                                            variant="outline-success"
                                            className="bt-block b-linx m-3 text-light w-25 "
                                            onSubmit={this.efetuarLogin}
                                            onClick={this.efetuarLogin}
                                        >Login</Button>

                                    </Form>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;