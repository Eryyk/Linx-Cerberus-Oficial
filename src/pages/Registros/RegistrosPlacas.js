import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Url from '../../services/api';
import {
    Card,
    Table,
    Row,
    InputGroup,
    DropdownButton,
    Col,
    Container,
    FormGroup,
    Form,
    Button

} from 'react-bootstrap';
import MenuNav from '../../components/Menu/MenuNavegacao';
import ButtonSimples from '../../components/Button/ButtonSimples';
import useForm from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/GeralT.css';
import { ToastContainer, toast } from 'react-toastify';

const RegistrosPLacas = (props) => {

    const { handleSubmit, register, errors } = useForm();

    const [id, setId] = useState(0);
    const [placaId, setPlacaId] = useState(0);
    const [enderecoId, setEnderecoId] = useState(0);
    const [dataEntrada, setDataEntrada] = useState('');
    const [dataSaida, setDataSaida] = useState('');
    const [tempoDesligado, setTempoDesligado] = useState(0);
    const [tempoEntreTestes, setTempoEntreTestes] = useState(0);
    const [tempoVoltarTestes, setTempoVoltarTestes] = useState(0);
    const [quantidadePings, setQuantidadePings] = useState(0);
    const [ipPlaca, setIpPlaca] = useState('');
    const [netmask, setNetmask] = useState('');
    const [gateway, setGateway] = useState('');
    const [dns, setDns] = useState('');
    const [alvo, setAlvo] = useState('');
    const [tipoAlvo, setTipoAlvo] = useState('');

    const [placas, setPlacas] = useState([]);
    const [placaEnderecos, setPlacaEnderecos] = useState([]);
    const [enderecos, setEnderecos] = useState([]);

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        listaPlacas();
        listaEnderecos();
        listaPlacasEnderecos();
    }, [])

    const listaPlacas = () => {
        Axios.get(Url + "placas", {
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

    const listaEnderecos = () => {
        Axios.get(Url + "enderecos", {
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

        Axios.get(Url + "PlacaEndereco", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                setPlacaEnderecos(data.data);
            })
            .catch(erro => { console.log(erro) })
    }

    const detalhes = (placaEnderecoId) => {
        console.log(placaEnderecoId)
        props.history.push("/registro/" + placaEnderecoId);
    }

    const onSubmit = (event) => {

        let cronometro = {
            placaId: Number(placaId),
            enderecoId: Number(enderecoId),
            dataEntrada: dataEntrada,
            tempoDesligado: Number(tempoDesligado),
            tempoEntreTestes: Number(tempoEntreTestes),
            tempoVoltarTestes: Number(tempoVoltarTestes),
            quantidadePings: Number(quantidadePings),
            ipPlaca: ipPlaca,
            netmask: netmask,
            gateway: gateway,
            dns: dns,
            alvo: alvo,
            tipoAlvo: tipoAlvo,
            // "id": 0,
            // "placaId": 0,
            // "enderecoId": 0,
            // "dataEntrada": "2019-12-05T18:20:56.044Z",
            // "dataSaida": "2019-12-05T18:20:56.044Z",
            // "tempoDesligado": 0,
            // "tempoEntreTestes": 0,
            // "tempoVoltarTestes": 0,
            // "quantidadePings": 0,
            // "ipPlaca": "string",
            // "netmask": "string",
            // "gateway": "string",
            // "dns": "string",
            // "alvo": "string",
            // "tipoAlvo": "string",
        }
        console.log(cronometro);
        if (id === 0) {
            Axios.post(Url + "PlacaEndereco", cronometro, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
                    'Content-Type': 'application/json'
                }
            })
                .then(data => {
                    listaPlacasEnderecos();
                    toast.success('placa registrada');
                })
                .catch(erro => {
                    toast.error("placa não registrada tente novamente ");
                })
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
                                    Registrar Placas
                                    </Card.Header>
                                <Card.Body>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Row className="d-flex text-left" >
                                            <Form.Group controlId="formBasicEmail" as={Col} className="p-0">
                                                <Form.Group as={Col} controlId="formGridState" className="">
                                                    <Form.Label className="text-dark">Placa</Form.Label>
                                                    {/* <Form.Control as="select" className="cadastro__select" onChange={this.atualizaEstado.bind(this)} name="placaId">
                                                            <option value={this.state.placaId}> Selecione a placa</option>
                                                            {
                                                                this.state.listaPlacas.map(element => (
                                                                    <option key={element.id} value={element.id}>{element.codigo}</option>
                                                                ))
                                                            }
                                                        </Form.Control> */}
                                                    <select className="form-control"
                                                        onChange={e => {
                                                            setPlacaId(e.target.value);
                                                        }
                                                        }
                                                        value={placaId || ''}
                                                        id="placaId"
                                                        name="placaId"
                                                        ref={register({
                                                            required: 'Placa obrigatória'
                                                        })}>
                                                        <option value=""> Selecione a placa</option>
                                                        {
                                                            placas.map(function(element) {
                                                                return (
                                                                    <option key={element.id} value={element.id}>{element.codigo}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    {errors.placaId && <span className="error">{errors.placaId.message}</span>}
                                                </Form.Group>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPassword" as={Col} className="p-0">
                                                <Form.Group as={Col} controlId="formGridState" className="">
                                                    <Form.Label className="text-dark">Local Placa</Form.Label>
                                                    {/* <Form.Control as="select" className="cadastro__select" onChange={this.atualizaEstado.bind(this)} name="enderecoId">
                                                        <option value={this.enderecoId}>Selecione o endereço</option>
                                                        {
                                                            this.state.listaEnderecos.map(element => (
                                                                <option key={element.id} value={element.id}>{element.logradouro}</option>
                                                            ))
                                                        }
                                                    </Form.Control> */}
                                                    <select className="form-control"
                                                        onChange={e => {
                                                            setEnderecoId(e.target.value);
                                                        }
                                                        }
                                                        value={enderecoId || ''}
                                                        id="enderecoId"
                                                        name="enderecoId"
                                                        ref={register({
                                                            required: 'Endereço obrigatório'
                                                        })}>
                                                        <option value="">Selecione o endereço</option>
                                                        {
                                                            enderecos.map(function(element) {
                                                                return (
                                                                    <option key={element.id} value={element.id}>{element.logradouro}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    {errors.enderecoId && <span className="error">{errors.enderecoId.message}</span>}
                                                </Form.Group>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicEmail" as={Col} className="">
                                                <Form.Label className="text-dark">Tempo Desligado</Form.Label>
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setTempoDesligado(e.target.value);
                                                    }
                                                    }
                                                    value={tempoDesligado || ''}
                                                    id="tempoDesligado"
                                                    name="tempoDesligado"
                                                    className="form-control"
                                                    placeholder="Informe o tempo de Desligamento"
                                                    ref={register({
                                                        required: 'Tempo Desligado obrigatório'
                                                    })} />
                                                {errors.tempoDesligado && <span className="error">{errors.tempoDesligado.message}</span>}
                                            </Form.Group>
                                        </Row>
                                        <Row className="d-flex">
                                            <Form.Group controlId="formBasicPassword" as={Col} className="">
                                                <Form.Label className="text-dark">Tempo de Religamento</Form.Label>
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setTempoVoltarTestes(e.target.value);
                                                    }
                                                    }
                                                    value={tempoVoltarTestes || ''}
                                                    id="tempoVoltarTestes"
                                                    name="tempoVoltarTestes"
                                                    className="form-control"
                                                    placeholder="Informe o tempo de Voltar a Testar"
                                                    ref={register({
                                                        required: 'Tempo Voltar a testar obrigatório'
                                                    })} />
                                                {errors.tempoVoltarTestes && <span className="error">{errors.tempoVoltarTestes.message}</span>}
                                            </Form.Group>

                                            <Form.Group controlId="formBasicEmail" as={Col} className="">
                                                <Form.Label className="text-dark">Tempo de entre Testes</Form.Label>
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setTempoEntreTestes(e.target.value);
                                                    }
                                                    }
                                                    value={tempoEntreTestes || ''}
                                                    id="tempoEntreTestes"
                                                    name="tempoEntreTestes"
                                                    className="form-control"
                                                    placeholder="Informe o tempo de Entre os Testes"
                                                    ref={register({
                                                        required: 'Tempo Entre os testes obrigatório'
                                                    })} />
                                                {errors.tempoEntreTestes && <span className="error">{errors.tempoEntreTestes.message}</span>}
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPassword" as={Col} className="">
                                                <Form.Label className="text-dark">Quantidade de Pings por teste</Form.Label>
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setQuantidadePings(e.target.value);
                                                    }
                                                    }
                                                    value={quantidadePings || ''}
                                                    id="quantidadePings"
                                                    name="quantidadePings"
                                                    className="form-control"
                                                    placeholder="Informe o tempo de quantidade de Pings"
                                                    ref={register({
                                                        required: 'Quantidade Pings do teste obrigatório'
                                                    })} />
                                                {errors.quantidadePings && <span className="error">{errors.quantidadePings.message}</span>}
                                            </Form.Group>
                                        </Row>
                                        <Row className="d-flex">
                                            <Form.Group controlId="formBasicPassword" className="col-4">
                                                <Form.Label className="text-dark">Ip do Endereco</Form.Label>
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setIpPlaca(e.target.value);
                                                    }
                                                    }
                                                    value={ipPlaca || ''}
                                                    id="ipPlaca"
                                                    name="ipPlaca"
                                                    className="form-control"
                                                    placeholder="Informe o ip da Placa"
                                                    ref={register({
                                                        required: 'Ip da Placa obrigatório'
                                                    })} />
                                                {errors.ipPlaca && <span className="error">{errors.ipPlaca.message}</span>}
                                            </Form.Group>

                                            <Form.Group controlId="formBasicEmail" className="col-4">
                                                <Form.Label className="text-dark">Netmask</Form.Label>
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setNetmask(e.target.value);
                                                    }
                                                    }
                                                    value={netmask || ''}
                                                    id="netmask"
                                                    name="netmask"
                                                    className="form-control"
                                                    placeholder="Informe o Netmask"
                                                    ref={register({
                                                        required: 'Netmask obrigatório'
                                                    })} />
                                                {errors.netmask && <span className="error">{errors.netmask.message}</span>}
                                            </Form.Group><Form.Group as={Col} className="">
                                                <Form.Label className="text-dark">Gatemay</Form.Label>
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setGateway(e.target.value);
                                                    }
                                                    }
                                                    value={gateway || ''}
                                                    id="gateway"
                                                    name="gateway"
                                                    className="form-control"
                                                    placeholder="Informe o ip do Alvo"
                                                    ref={register({
                                                        required: 'Ip da Placa obrigatório'
                                                    })} />
                                                {errors.ipPlaca && <span className="error">{errors.ipPlaca.message}</span>}
                                            </Form.Group>

                                        </Row>
                                        <Row>
                                            <Form.Group controlId="formBasicEmail" className="col-4">
                                                <Form.Label className="text-dark">Dns</Form.Label>
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setDns(e.target.value);
                                                    }
                                                    }
                                                    value={dns || ''}
                                                    id="dns"
                                                    name="dns"
                                                    className="form-control"
                                                    placeholder="Informe o dns"
                                                    ref={register({
                                                        required: 'Dns obrigatório'
                                                    })} />
                                                {errors.dns && <span className="error">{errors.dns.message}</span>}
                                            </Form.Group>
                                            <Form.Group as={Col} className="">
                                                <Form.Label className="text-dark">Alvo a ser pingado</Form.Label>
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setAlvo(e.target.value);
                                                    }
                                                    }
                                                    value={alvo || ''}
                                                    id="alvo"
                                                    name="alvo"
                                                    className="form-control"
                                                    placeholder="Informe o ip do Alvo"
                                                    ref={register({
                                                        required: 'Ip da Placa obrigatório'
                                                    })} />
                                                {errors.ipPlaca && <span className="error">{errors.ipPlaca.message}</span>}
                                            </Form.Group>
                                            <Form.Group as={Col} className="">
                                                <Form.Label className="text-dark">Tipo do Alvo</Form.Label>
                                                <select className="form-control"
                                                    onChange={e => {
                                                        setTipoAlvo(e.target.value);
                                                    }
                                                    }
                                                    value={tipoAlvo || ''}
                                                    id="tipoAlvo"
                                                    name="tipoAlvo"
                                                    ref={register({
                                                        required: 'Tipo de Alvo obrigatório'
                                                    })}>
                                                    <option value="">Selecione o Tipo alvo</option>
                                                    <option value="Ip">Ip</option>
                                                    <option value="URL">URL</option>
                                                </select>
                                                {errors.tipoAlvo && <span className="error">{errors.tipoAlvo.message}</span>}
                                            </Form.Group>

                                        </Row>
                                        <Row>
                                            <Form.Group className="col-4">
                                                <Form.Label className="text-dark d-flex">Data de Entrada</Form.Label>
                                                <input
                                                    type="datetime-local"
                                                    onChange={e => {
                                                        setDataEntrada(e.target.value);
                                                    }
                                                    }
                                                    value={dataEntrada || ''}
                                                    id="dataEntrada"
                                                    name="dataEntrada"
                                                    className="form-control"
                                                    placeholder="Informe a Data de Entrada"
                                                    ref={register({
                                                        required: 'Data de Entrada obrigatório'
                                                    })} />


                                                {errors.dataEntrada && <span className="error">{errors.dataEntrada.message}</span>}
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

                                    Placas Registradas
                                    </Card.Header>
                                <Card.Body>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Nome da Empresa</th>
                                                <th>Local</th>
                                                <th>Data da Entrada</th>
                                                <th>Codigo Placa</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                placaEnderecos.map(function(element) {
                                                    return (
                                                        <tr key={element.placaEnderecoId}>
                                                            <td>{element.nomeEmpresa}</td>
                                                            <td>{element.logradouro}</td>
                                                            <td>{element.dataEntrada}</td>
                                                            <td>{element.codigoPlaca}</td>
                                                            <td><button
                                                                type="button"
                                                                className="text-light maisDetalhes"
                                                                onClick={() => { detalhes(element.placaEnderecoId) }}>
                                                                mais detalhes
                                                            </button></td>

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
export default RegistrosPLacas
