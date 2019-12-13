import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Url from '../../services/api';
import MenuNav from '../../components/Menu/MenuNavegacao';
import useForm from "react-hook-form";
import ButtonSimples from '../../components/Button/ButtonSimples';
import { ToastContainer, toast } from 'react-toastify';
import { cepMask } from '../../util/mask';
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

import cep from 'cep-promise';

const CadastroEndereco = () => {



    const { handleSubmit, register, errors } = useForm();

    const [id, setId] = useState(0);
    const [cep, setCep] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');

    const [observacao, setObservacao] = useState('');
    const [empresaId, setEmpresaId] = useState(0);

    const [cepFor, setCepFor] = useState([]);

    const [empresas, setEmpresas] = useState([]);
    const [enderecos, setEnderecos] = useState([]);
    const [ufs, setUFs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        listaEnderecos();
        listaEmpresas();
        UFs();
    }, [])

    const UFs = () => {
        Axios.get("http://servicodados.ibge.gov.br/api/v1/localidades/estados")
            .then(data => {
                setUFs(data.data);
            })
            .catch(erro => { console.log(erro) })
    }

    const listaEmpresas = () => {
        Axios.get(Url + "empresas",{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                setEmpresas(data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const listaEnderecos = () => {
        Axios.get(Url + "Enderecos",{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                setEnderecos(data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const editar = (id) => {
        let endereco = enderecos.filter(item => item.id === id);
        if (endereco.length > 0) {
            setId(id);
            setCep(endereco[0].cep);
            setEstado(endereco[0].estado);
            setCidade(endereco[0].cidade);
            setBairro(endereco[0].bairro);
            setLogradouro(endereco[0].logradouro);
            setNumero(endereco[0].numero);
            setComplemento(endereco[0].complemento);
            setObservacao(endereco[0].observacao);
            setEmpresaId(endereco[0].empresaId);
        }
    }

    const onSubmit = event => {

        let Endereco = {
            id: id,
            logradouro: logradouro,
            cep: cep,
            numero: numero,
            complemento: complemento,
            observacao: observacao,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            empresaId: empresaId
        }
        if (id === 0) {
            Axios.post(Url + "Enderecos", Endereco, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
                    'Content-Type': 'application/json'
                }
            })
                .then(data => {
                    listaEnderecos();
                    toast.success('Endereco Cadastrado');
                })
                .catch(erro => {
                    toast.error("Endereço não cadastrada");
                })
                .finally(() => { setLoading(false) })
        } else {
            Endereco.id = id;
            Axios.put(Url + "Enderecos/", Endereco, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
                    'Content-Type': 'application/json'
                }
            })
                .then(data => {
                    listaEnderecos();
                    toast.success('Endereço Alterada');
                    setId(0);
                    setCep();
                    setEstado();
                    setCidade();
                    setBairro();
                    setLogradouro();
                    setNumero();
                    setComplemento();
                    setObservacao();
                    setEmpresaId();
                })
                .catch(erro => {
                    // console.log(erro)
                    toast.erro('Ocorreu um erro, tente novamente');
                    setId(0);
                    setCep();
                    setEstado();
                    setCidade();
                    setBairro();
                    setLogradouro();
                    setNumero();
                    setComplemento();
                    setObservacao();
                    setEmpresaId();
                })

                .finally(() => { setLoading(false) })
        }
    }

    const buscarCep = value => {
        setCep(cepMask(value));
        if (value.length === 9 ) {
            fetch('https://api.pagar.me/1/zipcodes/' + value)
                .then(response => response.json())
                .then((data) => {
                    console.log(data.city);
                        setBairro(data.neighborhood);
                        setLogradouro(data.street);
                        setCidade(data.city);
                        setEstado(data.state);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        else {
            setBairro('');
            setLogradouro('');
            setCidade('');
            setEstado('');
        }
    }
    // fetch('https://api.pagar.me/1/zipcodes/' + cep)
    // .then(Ren => Ren.json())
    // // .then(data => setState({ cepFor: data }))
    // .then((res) => {
    //     console.log(res)
    //     setEstado(res.state);
    // })

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
                                    Cadastrar Endereço
                                    </Card.Header>
                                <Card.Body>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Row className="d-flex justify-content-around mr-2 ml-2 text-left" >

                                            <Form.Group controlId="formBasicPassword" as={Col} className="">
                                                <Form.Label className="text-dark">Cep</Form.Label>
                                                {/* <Form.Control
                                                    type="text"
                                                    onChange={this.atualizaEstado.bind(this)}
                                                    value={this.state.cep}
                                                    name="cep"
                                                    className="cadastro__input"
                                                    placeholder="insira o cep" /> */}
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        buscarCep(e.target.value);
                                                    }
                                                    }
                                                    value={cep || ''}
                                                    id="cep"
                                                    name="cep"
                                                    className="form-control"
                                                    placeholder="Informe o CEP do Local"
                                                    ref={register({
                                                        required: 'CEP Local necessário'
                                                    })} />
                                                {errors.cep && <span className="error">{errors.cep.message}</span>}
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPassword" as={Col} className="" >
                                                <Form.Label className="text-dark">Estado</Form.Label>
                                                {/* <Form.Control as="select" className="cadastro__select" onChange={this.atualizaEstado.bind(this)} name="estado">
                                                    <option value="null">Selecione o estado</option>
                                                    {
                                                        listaUF.map(element => (
                                                            <option key={element.id} value={element.nome}>{element.nome}</option>
                                                        ))
                                                    }
                                                </Form.Control> */}
                                                <select className="form-control"
                                                    onChange={e => {
                                                        setEstado(e.target.value);
                                                    }
                                                    }
                                                    value={estado || enderecos.estado || ''}
                                                    id="estado"
                                                    name="estado"
                                                    ref={register({
                                                        required: 'Estado do Local obrigatório'
                                                    })}>
                                                    <option value="">Selecione o estado</option>
                                                    {
                                                        ufs.map(element => (
                                                            <option key={element.id} value={element.sigla}>{element.nome}</option>
                                                        ))
                                                    }
                                                </select>
                                                {errors.estado && <span className="error">{errors.estado.message}</span>}
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPassword" as={Col} className="">
                                                <Form.Label className="text-dark">Cidade</Form.Label>
                                                {/* <Form.Control type="text"
                                                    onChange={this.atualizaEstado.bind(this)}
                                                    value={this.state.cidade}
                                                    name="cidade"
                                                    className="cadastro__input"
                                                    placeholder="insira a cidade">
                                                </Form.Control> */}
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setCidade(e.target.value);
                                                    }
                                                    }
                                                    value={cidade || ''}
                                                    id="cidade"
                                                    name="cidade"
                                                    className="form-control"
                                                    placeholder="Informe a cidade do Local"
                                                    ref={register({
                                                        required: 'Cidade do Local necessário'
                                                    })} />
                                                {errors.cidade && <span className="error">{errors.cidade.message}</span>}
                                            </Form.Group>

                                        </Row>
                                        <Row className="d-flex justify-content-around mr-2 ml-2 text-left">
                                            <Form.Group controlId="formBasicPassword" as={Col} className="">
                                                <Form.Label className="text-dark">Bairro</Form.Label>
                                                {/* <Form.Control type="text"
                                                    onChange={this.atualizaEstado.bind(this)}
                                                    value={this.state.bairro}
                                                    name="bairro"
                                                    className="cadastro__input"
                                                    placeholder="insira o bairro">
                                                </Form.Control> */}
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setBairro(e.target.value);
                                                    }
                                                    }
                                                    value={bairro || ''}
                                                    id="bairro"
                                                    name="bairro"
                                                    className="form-control"
                                                    placeholder="Informe o bairro do Local"
                                                    ref={register({
                                                        required: 'Bairro do Local necessário'
                                                    })} />
                                                {errors.bairro && <span className="error">{errors.bairro.message}</span>}
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail" as={Col} className="">
                                                <Form.Label className="text-dark">Logradouro</Form.Label>
                                                {/* <Form.Control
                                                    type="text"
                                                    onChange={this.atualizaEstado.bind(this)}
                                                    value={this.state.logradouro}
                                                    name="logradouro"
                                                    className="cadastro__input"
                                                    placeholder="insira o nome logradouro" /> */}
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setLogradouro(e.target.value);
                                                    }
                                                    }
                                                    value={logradouro || ''}
                                                    id="logradouro"
                                                    name="logradouro"
                                                    className="form-control"
                                                    placeholder="Informe o logradouro do Local"
                                                    ref={register({
                                                        required: 'Logradouro do Local necessário'
                                                    })} />
                                                {errors.logradouro && <span className="error">{errors.logradouro.message}</span>}
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail" as={Col} className="">
                                                <Form.Label className="text-dark">Numero</Form.Label>
                                                {/* <Form.Control
                                                    type="text"
                                                    onChange={this.atualizaEstado.bind(this)}
                                                    value={this.state.numero}
                                                    name="numero"
                                                    className="cadastro__input"
                                                    placeholder="insira o numero" /> */}
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setNumero(e.target.value);
                                                    }
                                                    }
                                                    value={numero || ''}
                                                    id="numero"
                                                    name="numero"
                                                    className="form-control"
                                                    placeholder="Informe o Numero do Local"
                                                    ref={register({
                                                        required: 'Numero do Local necessário'
                                                    })} />
                                                {errors.numero && <span className="error">{errors.numero.message}</span>}
                                            </Form.Group>
                                        </Row>

                                        <Row className="d-flex justify-content-around mr-2 ml-2 text-left">
                                            <Form.Group as={Col} controlId="formGridState" className="">
                                                <Form.Label className="text-dark">Complemento</Form.Label>
                                                {/* <Form.Control type="text"
                                                    onChange={this.atualizaEstado.bind(this)}
                                                    value={this.state.complemento}
                                                    name="complemento"
                                                    className="cadastro__input"
                                                    placeholder="insira o complemento">
                                                </Form.Control> */}
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setComplemento(e.target.value);
                                                    }
                                                    }
                                                    value={complemento || ''}
                                                    id="complemento"
                                                    name="complemento"
                                                    className="form-control"
                                                    placeholder="Informe o complemento do Local"
                                                />
                                                {errors.complemento && <span className="error">{errors.complemento.message}</span>}
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPassword" as={Col} className="">
                                                <Form.Label className="text-dark">Observação</Form.Label>
                                                {/* <Form.Control type="text"
                                                    onChange={this.atualizaEstado.bind(this)}
                                                    value={this.state.observacao}
                                                    name="observacao"
                                                    className="cadastro__input"
                                                    placeholder="insira uma observacao">
                                                </Form.Control> */}
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setObservacao(e.target.value);
                                                    }
                                                    }
                                                    value={observacao || ''}
                                                    id="observacao"
                                                    name="observacao"
                                                    className="form-control"
                                                    placeholder="Informe o observacao do Local"
                                                />
                                                {errors.observacao && <span className="error">{errors.observacao.message}</span>}
                                            </Form.Group>

                                            <Form.Group controlId="formBasicEmail" as={Col} className="">
                                                <Form.Label className="text-dark">Empresa</Form.Label>
                                                {/* <Form.Control as="select" className="cadastro__select" onChange={this.atualizaEstado.bind(this)} name="empresaId">
                                                    <option value="null">Selecione a empresa</option>
                                                    {
                                                        this.state.listaEmpresa.map(element => (
                                                            <option key={element.id} value={element.id}>{element.nomeFantasia}</option>
                                                        ))
                                                    }
                                                </Form.Control> */}
                                                <select className="form-control"
                                                    onChange={e => {
                                                        setEmpresaId(e.target.value);
                                                    }
                                                    }
                                                    value={empresaId || ''}
                                                    id="empresaId"
                                                    name="empresaId"
                                                    ref={register({
                                                        required: 'Empresa do Local obrigatório'
                                                    })}>
                                                    <option value="">Selecione a empresa</option>
                                                    {
                                                        empresas.map(element => (
                                                            <option key={element.id} value={element.id}>{element.nomeFantasia}</option>
                                                        ))
                                                    }
                                                </select>
                                                {errors.empresaId && <span className="error">{errors.empresaId.message}</span>}
                                            </Form.Group>
                                        </Row>
                                        <Row className="d-flex flex-row-reverse">
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

                                    Endereços
                                    </Card.Header>
                                <Card.Body>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Cep</th>
                                                <th>Estado</th>
                                                <th>Cidade</th>
                                                <th>Bairro</th>
                                                <th>Logradouro</th>
                                                <th>Numero</th>
                                                <th>Empresa</th>
                                                <th>Complemento</th>
                                                <th>Observação</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                enderecos.map(function (element) {
                                                    return (
                                                        <tr key={element.id}>
                                                            <td>{element.cep}</td>
                                                            <td>{element.estado}</td>
                                                            <td>{element.cidade}</td>
                                                            <td>{element.bairro}</td>
                                                            <td>{element.logradouro}</td>
                                                            <td>{element.numero}</td>
                                                            <td>{element.nomeFantasia}</td>
                                                            <td>{element.complemento}</td>
                                                            <td>{element.observacao}</td>
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
    );
}

export default CadastroEndereco