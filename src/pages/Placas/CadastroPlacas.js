import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Url from '../../services/api';
import ButtonSimples from '../../components/Button/ButtonSimples';
import MenuNav from '../../components/Menu/MenuNavegacao';
import '../../assets/css/GeralT.css';
import useForm from "react-hook-form";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Card,
    Table,
    Row,
    Col,
    Container,
    Form,
    Button
} from 'react-bootstrap';

const CadastroPlacas = () => {

    const { handleSubmit, register, errors } = useForm();

    const [id, setId] = useState(0);
    const [codigo, setCodigo] = useState('');
    const [situacao, setSituacao] = useState('');
    const [placas, setPlacas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        listaPlacas();
    }, [])

    const listaPlacas = () => {
        Axios.get(Url + "Placas", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                setPlacas(data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const editar = (id) => {
        let placa = placas.filter(item => item.id === id);
        if (placa.length > 0) {
            setId(id);
            setCodigo(placa[0].codigo);
            setSituacao(placa[0].situacao);
        }
    }
    

    const onSubmit = event => {
        setLoading(true);
        let placa = {
            codigo: codigo,
            situacao: situacao
        }

        if(id === 0){
            Axios.post(Url + "Placas", placa, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
                    'Content-Type': 'application/json'
                }
            })
                .then(data => {
                    listaPlacas();
                    toast.success('Placa Cadastrada');
                })
                .catch(erro => {
                    toast.error('Ocorreu um erro, tente novamente');
                })
                .finally(() => {setLoading(false)})
        } else {
            placa.id = id;
            Axios.put(Url + "Placas/", placa, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
                    'Content-Type': 'application/json'
                }
            })
                .then(data => {
                    listaPlacas();
                    toast.success('Placa Alterada');
                    setId(0);
                    setCodigo();
                    setSituacao();
                })
                .catch(erro => {
                    console.log(erro)
                    toast.error('Ocorreu um erro, tente novamente');
                    setId(0);
                    setCodigo();
                    setSituacao();
                })
                .finally(() => {setLoading(false)})
        }

    }

    return (
        <Container fluid={true}>
            <ToastContainer position="top-right" autoClose={3000}></ToastContainer>

            <Row>
                <Col xs="3" lg="2">
                    <MenuNav></MenuNav>
                </Col>
                <Col xs="9" lg="10">
                    <Row className="mt-4">
                        <Col xs="12" lg="12">
                            <Card className="f-linx b-r-linx">
                                <Card.Header className="bg-linx bt-r-linx d-flex justify-content-between">

                                    Cadastrar Placa
                                    </Card.Header>
                                <Card.Body>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Row className="d-flex justify-content-around mr-2 ml-2 text-left" >
                                            <Form.Group as={Col} className="">
                                                <Form.Label className="text-dark">Codigo</Form.Label>
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setCodigo(e.target.value);
                                                    }
                                                    }
                                                    value={codigo || ''}
                                                    id="codigo"
                                                    name="codigo"
                                                    className="form-control"
                                                    placeholder="Informe o Codigo da PLaca"
                                                    ref={register({
                                                        required: 'Codigo Placa obrigatório'
                                                    })} />
                                                {errors.codigo && <span className="error">{errors.codigo.message}</span>}
                                            </Form.Group>
                                            <Form.Group as={Col} className="">
                                            <Form.Label className="text-dark">Situação</Form.Label>
                                            <select className="form-control"
                                                onChange={e => {
                                                    setSituacao(e.target.value);
                                                }
                                                }
                                                value={situacao || ''}
                                                id="situacao"
                                                name="situacao"
                                                ref={register({
                                                    required: 'Situação obrigatório'
                                                })}>
                                                <option value="">Selecione</option>
                                                <option value="Funcionando">Funcionando</option>
                                                <option value="Manutenção">Manutenção</option>
                                                <option value="Estoque">Estoque</option>
                                            </select>
                                            {errors.situacao && <span className="error">{errors.situacao.message}</span>}

                                            </Form.Group>
                                        </Row>
                                        <Row className="d-flex flex-row-reverse">
                                        {/* <button type="submit" 
                                        className="b-linx m-2 text-light" disabled={!loading ? '' : 'none'}>{loading ? "Salvando..." : "Salvar"}</button> */}
                                        <ButtonSimples />
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xs="12" lg="12">
                            <Card className="f-linx b-r-linx">
                                <Card.Header className="bg-linx bt-r-linx d-flex justify-content-between">
                                    Placas
                                    </Card.Header>
                                <Card.Body>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Codigo</th>
                                                <th>Situação</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                placas.map(function (element) {
                                                    return (
                                                        <tr key={element.id}>
                                                            <td>{element.codigo}</td>
                                                            <td>{element.situacao}</td>
                                                            <td><button type="button" className="text-light editar" onClick={() => { editar(element.id) }}>Editar</button></td>
                                                        </tr>
                                                    )
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

    )
}

export default CadastroPlacas