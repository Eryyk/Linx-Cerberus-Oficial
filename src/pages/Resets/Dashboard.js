import React, { useEffect, useState } from 'react';
import Axios from "axios";
import Grafico from './GraficoResets/GraficoResets';
import '../../assets/css/GeralT.css';
import Url from '../../services/api';
import MenuNav from '../../components/Menu/MenuNavegacao';
import MenuNavComum from '../../components/Menu/MenuNavegacaoComum';
import { usuarioAutenticado, parseJwt } from '../../services/auth';
import useForm from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/GeralT.css';
import { ToastContainer, toast } from 'react-toastify';
import moment from "react-moment";

import CardSimples from '../../components/Cards/CardSimples';
import { Card, Table, Row, DropdownButton, Dropdown, Col, Container, CardDeck, Form, FormGroup, Button, Nav } from 'react-bootstrap';

const Dashboard = (props) => {

    //listas para exibição
    const [placaEnderecos, setPlacaEnderecos] = useState([]);
    const [placaEnderecoId, setPlacaEnderecoId] = useState(0);
    const [placas, setPlacas] = useState([]);
    const [codigo, setCodigo] = useState('');
    const [enderecos, setEnderecos] = useState([]);
    const [reset, setReset] = useState('');
    const [totalReset, setTotalReset] = useState([]);
    const [uf, setUF] = useState([]);

    useEffect(() => {
        listaPlacas();
        listaEnderecos();
        listaPlacasEnderecos();
        listaReset();
        UFs();
        // console.log(moment().format('YYYY-MM-DD'));
    }, [])
    const UFs = () => {
        Axios.get("http://servicodados.ibge.gov.br/api/v1/localidades/estados")
            .then(data => {
                setUF(data.data);
                // console.log(uf)
            })
            .catch(erro => { console.log(erro) })
    }

    const detalhes = (placaEnderecoId) => {
        console.log(placaEnderecoId)
        props.history.push("/registro/" + placaEnderecoId);
    }

    const listaReset = () => {
        Axios.get(Url + "Reiniciacoes", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                setReset(data.data);
                // console.log('testando');
                console.log(data.data);
            })
            .catch(erro => { console.log(erro) })
    }

    const listaEnderecos = () => {
        Axios.get(Url + "Enderecos", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                setPlacas(data.data);
            })
            .catch(erro => { console.log(erro) })

    }

    const listaPlacas = () => {
        Axios.get(Url + "Placas", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                setEnderecos(data.data);
            })
            .catch(erro => { console.log(erro) })

    }

    const listaPlacasEnderecos = () => {
        Axios.get(Url + "PlacaEndereco/dashboard", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                // console.log(data.data);
                setPlacaEnderecos(data.data);
            })
            .catch(erro => { console.log(erro) })

    }

    return (
        <Container fluid={true}>
            <Row>
                <Col xs="3" lg="2" className="p-0">
                    {parseJwt().tipoUsuario === "Administrador" ? <MenuNav></MenuNav> : <MenuNavComum></MenuNavComum>}
                </Col>
                <Col xs="9" lg="10" className="p-3 ">
                    <Row>
                        <Card.Body>
                            <CardDeck className="bdt-linx"
                            >

                                <CardSimples
                                    title="Total Resets"
                                    texto="0"
                                    />
                                <CardSimples
                                    title="Ultimo Resets"
                                    texto="00/00/000 00:00"
                                    // texto={placaEnderecos.ultimoReset}
                                    // texto={moment(reset.ultimoReset).format("MM/dd/yyyy HH:mm")}
                                />
                                <CardSimples title="Alertas" />
                            </CardDeck>
                        </Card.Body>
                    </Row>
                    <Row className="p-0">

                        <Col xs="7" lg="8">
                            <Card className="bdm-linx b-r-linx f-linx">
                                <Card.Header className="bg-linx bt-r-linx">
                                    Resets
                                    </Card.Header>
                                <Card.Body className="p-3">
                                    <Grafico />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs="5" lg="4">
                            <Card className="bdm-linx b-r-linx f-linx">
                                <Card.Header className="bg-linx bt-r-linx">
                                    Ultimos Resets
                                    </Card.Header>
                                <Card.Body>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Local</th>
                                                <th>Codigo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                placaEnderecos.map(function (element) {
                                                    return (
                                                        <tr key={element.placaEnderecoId}>
                                                            <td>{element.logradouro}</td>
                                                            <td>{element.codigo}</td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row className="mt-4 p-0">
                        <Col xs="12" lg="12">
                            <Card className="f-linx b-r-linx">
                                <Card.Header className="bg-linx bt-r-linx d-flex justify-content-between">

                                    <div className="" >Resets</div>

                                    <Nav className="j-c-e" activeKey="/home">
                                        <Nav.Item>
                                            <Form inline>
                                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0 justify-content-end bg-linx">
                                                    <DropdownButton id="dropdown-basic-button" title="Estado" className="bg-linx">
                                                        {
                                                            uf.map(element => (
                                                                <option key={element.id} value={element.nome}>{element.nome}</option>
                                                            ))
                                                        }
                                                    </DropdownButton>
                                                </FormGroup>
                                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0 bg-linx">
                                                    <DropdownButton id="dropdown-basic-button" title="Cidade" className="bg-linx">

                                                    </DropdownButton>
                                                </FormGroup>
                                            </Form>
                                        </Nav.Item>

                                    </Nav>
                                </Card.Header>
                                <Card.Body>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Codigo</th>
                                                <th>Local</th>
                                                <th>Ultimo Reset</th>
                                                <th>Quantidade de Resets</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                placaEnderecos.map((element) => {
                                                    return (
                                                        <tr key={element.idplacaendereco}>
                                                            <td>{element.codigo}</td>
                                                            <td>{element.logradouro}</td>
                                                            <td>{element.ultimoReset != null ? element.ultimoReset.dataOcorrida : ''}</td>
                                                            <td>{element.quantidadeResets}</td>
                                                            <td><button
                                                                type="button"
                                                                className="text-light maisDetalhes"
                                                                onClick={() => { detalhes(element.placaEnderecoId) }}>
                                                                mais detalhes
                                                            </button></td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </Table>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
export default Dashboard