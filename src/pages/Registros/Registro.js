import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Url from '../../services/api';
import MenuNav from '../../components/Menu/MenuNavegacao';
import CardSimples from '../../components/Cards/CardSimples';
import Mapa from '../../components/Mapa/mapa';
import useForm from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonSimples from '../../components/Button/ButtonSimples';
import registro from '../../pages/Resets/Dashboard';
import GraficoReset from '../Registros/GraficoReset/GraficoReset'; 
import GraficoSaude from '../Registros/GraficoSaudePlaca/GraficoSaudePlaca';

import {
    Container,
    Card,
    Col,
    CardDeck,
    Row,
    InputGroup,
    FormControl,
    Button,
    Form
} from 'react-bootstrap';

const Registro = (props) => {

    const { handleSubmit, register, errors } = useForm();

    const [placaEnderecoId, setPlacaEnderecoId] = useState(0);
    const [codigoPlaca, setCodigoPlaca] = useState('');
    const [logrdouro, setLogrdouro] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [enderecosId, setEnderecosId] = useState('');
    const [dataEntrada, setDataEntrada] = useState('');
    const [dataSaida, setDataSaida] = useState('');
    const [tempoDesligado, setTempoDesligado] = useState('');
    const [tempoEntreTestes, setTempoEntreTestes] = useState('');
    const [tempoVoltarTestes, setTempoVoltarTestes] = useState('');
    const [quantidadePings, setQuantidadePings] = useState('');
    const [ipEndereco, setIpEndereco] = useState('');
    const [netmask, setNetmask] = useState('');
    const [gateway, setGateway] = useState('');
    const [dns, setDns] = useState('');
    const [alvo, setAlvo] = useState('');
    const [tipoAlvo, setTipoAlvo] = useState('');
    const [placaEnderecos, setPlacaEnderecos] = useState([]);
    const [saldePlaca, setSaldePlaca] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(props.match)
        listaPlacas();
        listaEnderecos();
        listaPlacasEnderecos();

    }, [])

    // const listaSaudePlaca = () => {
    //     console.log(props.match.params.id);
    //     Axios.get(Url + "SaudePlaca/" + props.match.params.id, {
    //         headers: {
    //             'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(data => {
    //             setSaldePlaca(data.data[0]);
    //         })
    //         .catch(erro => { console.log(erro) })
    // }

    const listaPlacas = () => {
        Axios.get(Url + "placas", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                // setPlacas(data.data);
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
                // setEnderecos(data.data);
            })
            .catch(erro => { console.log(erro) })
    }

    const listaPlacasEnderecos = () => {
        Axios.get(Url + "PlacaEndereco/registro/" + props.match.params.id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {

                // setPlacaEnderecos(data.data);
                setPlacaEnderecos(data.data[0]);

                console.log(data.data);
            })
            .catch(erro => { console.log(erro) })
    }

    const editar = (id) => {
        let cronometro = placaEnderecos.filter(item => item.id === id);
        if (cronometro.length > 0) {
            setPlacaEnderecoId(placaEnderecoId);
            setDataEntrada(cronometro[0].dataEntrada);
            setDataSaida(cronometro[0].dataSaida);
            setTempoDesligado(cronometro[0].tempoDesligado);
            setTempoEntreTestes(cronometro[0].tempoEntreTestes);
            setTempoVoltarTestes(cronometro[0].tempoVoltarTestes);
            setQuantidadePings(cronometro[0].quantidadePings);
            setIpEndereco(cronometro[0].ipEndereco);
            setNetmask(cronometro[0].netmask);
            setGateway(cronometro[0].gateway);
            setDns(cronometro[0].dns);
            setAlvo(cronometro[0].alvo);
            setTipoAlvo(cronometro[0].tipoAlvo);
        }
    }

    const alteraCronometro = (event) => {

        let cronometro = {
            placaEnderecoId: Number(placaEnderecoId),
            dataSaida: dataSaida,
            tempoDesligado: Number(tempoDesligado),
            tempoEntreTestes: Number(tempoEntreTestes),
            tempoVoltarTestes: Number(tempoVoltarTestes),
            quantidadePings: Number(quantidadePings),
            ipEndereco: ipEndereco,
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

        cronometro.placaEnderecoId = placaEnderecoId;

        Axios.put(Url + 'PlacaEndereco/Cronometro/' + placaEnderecoId, cronometro, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                listaPlacasEnderecos();
                toast.success('Cronometro alterado');
            })
            .catch(error => {
                toast.error('Ocorreu um erro, tente novamente');
            })
            .finally(() => { setLoading(false) })
    }

    const alteraTempoSaida = (event) => {

        let cronometro = {
            placaEnderecoId: Number(placaEnderecoId),
            dataSaida: dataSaida,
            tempoDesligado: Number(tempoDesligado),
            tempoEntreTestes: Number(tempoEntreTestes),
            tempoVoltarTestes: Number(tempoVoltarTestes),
            quantidadePings: Number(quantidadePings),
            ipEndereco: ipEndereco,
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

        cronometro.placaEnderecoId = placaEnderecoId;

        Axios.put(Url + 'PlacaEndereco/' + placaEnderecoId, cronometro, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                listaPlacasEnderecos();
                toast.success('Cronometro alterado');
            })
            .catch(error => {
                toast.error('Ocorreu um erro, tente novamente');
            })
            .finally(() => { setLoading(false) })
    }

    return (
        <Container fluid={true}>
            <ToastContainer position="top-right" autoClose={3000}></ToastContainer>

            <Row>
                <Col xs="3" lg="2">
                    <MenuNav></MenuNav>
                </Col>
                <Col xs="9" lg="10">
                    <Row>
                        <Card.Body>
                            <CardDeck >
                                <CardSimples title="Placa" texto={placaEnderecos.codigoPlaca} />
                                <CardSimples title="Condição" texto={placaEnderecos.situacaoPlaca} />
                                <CardSimples
                                    title="Ultimo Reset"
                                texto={placaEnderecos.ultimoReset}
                                />
                                <CardSimples title="Resets" texto={placaEnderecos.totalResets} />
                            </CardDeck>
                        </Card.Body>
                    </Row>

                    <Card className="f-linx b-r-linx">
                        <Card.Header className="bg-linx bt-r-linx d-flex justify-content-between">
                            Cronômetro
                                    </Card.Header>
                        <Card.Body className="text-dark d-flex pb-0">
                            <Card.Text className="mr-2">
                                UpTime - {saldePlaca.uptime}
                                        </Card.Text>
                            {/* <Card.Text>
                                Ultima alteração - 10:10:10
                                        </Card.Text> */}
                        </Card.Body>
                        <Card.Body className="pb-0">
                            <Form onSubmit={handleSubmit(alteraCronometro)}>
                                <Row>
                                    <Form.Group as={Col} className="">
                                        <Form.Label className="text-dark">Tempo Desligado</Form.Label>

                                        <input
                                            type="text"
                                            onChange={e => {
                                                setTempoDesligado(e.target.value);
                                            }
                                            }
                                            value={tempoDesligado || placaEnderecos.tempoDesligado}
                                            id="tempoDesligado"
                                            name="tempoDesligado"
                                            className="form-control"
                                            placeholder={placaEnderecos.tempoDesligado}
                                            ref={register({
                                                required: 'Tempo Desligado obrigatório'
                                            })} />
                                        {errors.tempoDesligado && <span className="error">{errors.tempoDesligado.message}</span>}
                                    </Form.Group>
                                    <Form.Group as={Col} className="">
                                        <Form.Label className="text-dark">Tempo de Religamento</Form.Label>
                                        <input
                                            type="text"
                                            onChange={e => {
                                                setTempoVoltarTestes(e.target.value);
                                            }
                                            }
                                            value={tempoVoltarTestes || placaEnderecos.tempoVoltarTestes}
                                            id="tempoVoltarTestes"
                                            name="tempoVoltarTestes"
                                            className="form-control"
                                            placeholder={placaEnderecos.tempoVoltarTestes}
                                            ref={register({
                                                required: 'Tempo Voltar a testar obrigatório'
                                            })} />
                                        {errors.tempoVoltarTestes && <span className="error">{errors.tempoVoltarTestes.message}</span>}
                                    </Form.Group>
                                    <Form.Group as={Col} className="">
                                        <Form.Label className="text-dark">Tempo entre Testes</Form.Label>
                                        <input
                                            type="text"
                                            onChange={e => {
                                                setTempoEntreTestes(e.target.value);
                                            }
                                            }
                                            value={tempoEntreTestes || placaEnderecos.tempoEntreTestes}
                                            id="tempoEntreTestes"
                                            name="tempoEntreTestes"
                                            className="form-control"
                                            placeholder={placaEnderecos.tempoEntreTestes}
                                            ref={register({
                                                required: 'Tempo Entre os testes obrigatório'
                                            })} />
                                        {errors.tempoEntreTestes && <span className="error">{errors.tempoEntreTestes.message}</span>}
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} className="">
                                        <Form.Label className="text-dark">Quantidade Pings</Form.Label>
                                        <input
                                            type="text"
                                            onChange={e => {
                                                setQuantidadePings(e.target.value);
                                            }
                                            }
                                            value={quantidadePings || placaEnderecos.quantidadePings}
                                            id="quantidadePings"
                                            name="quantidadePings"
                                            className="form-control"
                                            placeholder={placaEnderecos.quantidadePings}
                                            ref={register({
                                                required: 'Quantidade Pings do teste obrigatório'
                                            })} />
                                        {errors.quantidadePings && <span className="error">{errors.quantidadePings.message}</span>}
                                    </Form.Group>
                                    <Form.Group as={Col} className="">
                                        <Form.Label className="text-dark">Ip da Placa</Form.Label>
                                        <input
                                            type="text"
                                            onChange={e => {
                                                setIpEndereco(e.target.value);
                                            }
                                            }
                                            value={ipEndereco || placaEnderecos.ipEndereco}
                                            id="ipEndereco"
                                            name="ipEndereco"
                                            className="form-control"
                                            placeholder={placaEnderecos.ipEndereco}
                                            ref={register({
                                                required: 'Ip da Placa obrigatório'
                                            })} />
                                        {errors.ipPlaca && <span className="error">{errors.ipPlaca.message}</span>}
                                    </Form.Group>
                                    <Form.Group as={Col} className="">
                                        <Form.Label className="text-dark">Netmask</Form.Label>
                                        <input
                                            type="text"
                                            onChange={e => {
                                                setNetmask(e.target.value);
                                            }
                                            }
                                            value={netmask || placaEnderecos.netmask}
                                            id="netmask"
                                            name="netmask"
                                            className="form-control"
                                            placeholder={placaEnderecos.netmask}
                                            ref={register({
                                                required: 'Netmask obrigatório'
                                            })} />
                                        {errors.netmask && <span className="error">{errors.netmask.message}</span>}
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} className="">
                                        <Form.Label className="text-dark">Gatemay</Form.Label>
                                        <input
                                            type="text"
                                            onChange={e => {
                                                setGateway(e.target.value);
                                            }
                                            }
                                            value={gateway || placaEnderecos.gateway}
                                            id="gateway"
                                            name="gateway"
                                            className="form-control"
                                            placeholder="Informe o ip do Alvo"
                                            ref={register({
                                                required: 'Ip da Placa obrigatório'
                                            })} />
                                        {errors.ipPlaca && <span className="error">{errors.ipPlaca.message}</span>}
                                    </Form.Group>
                                    <Form.Group as={Col} className="">
                                        <Form.Label className="text-dark">Dns</Form.Label>
                                        <input
                                            type="text"
                                            onChange={e => {
                                                setDns(e.target.value);
                                            }
                                            }
                                            value={dns || placaEnderecos.dns}
                                            id="dns"
                                            name="dns"
                                            className="form-control"
                                            placeholder={placaEnderecos.dns}
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
                                            value={alvo || placaEnderecos.alvo}
                                            id="alvo"
                                            name="alvo"
                                            className="form-control"
                                            placeholder={placaEnderecos.alvo}
                                            ref={register({
                                                required: 'Ip da Placa obrigatório'
                                            })} />
                                        {errors.ipPlaca && <span className="error">{errors.ifpPlaca.message}</span>}
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group className="col-4">
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
                                <Row className="d-flex flex-row-reverse">
                                    <ButtonSimples />
                                </Row>
                            </Form>

                        </Card.Body>
                    </Card>

                    <Row className="mt-4">
                        <Col xs="12" lg="12">
                            <Card className="f-linx b-r-linx">
                                <Card.Header className="bg-linx bt-r-linx d-flex justify-content-between">
                                    Localização da placa
                                    </Card.Header>
                                <Card.Body className="h-linx d-inline-block">
                                    <Row className="d-flex">
                                        <Card.Body className="d-contents text-dark">
                                            <Card.Text>
                                                Logradouro :
                                                {placaEnderecos.logradouro}
                                            </Card.Text>
                                            <Card.Text>
                                                Empresa :
                                                 {placaEnderecos.nomeEmpresa}
                                            </Card.Text>
                                            <Card.Text>
                                                Data Entrada : 
                                                {placaEnderecos.dataEntrada}
                                            </Card.Text>
                                            <Form onSubmit={handleSubmit(alteraTempoSaida)} className="p-0">
                                                <Form.Group as={Col} className="p-0">
                                                    <Form.Label className="text-dark m-0">Data Saida</Form.Label>
                                                    <input
                                                        type="datetime-local"
                                                        onChange={e => {
                                                            setDataSaida(e.target.value);
                                                        }
                                                        }
                                                        value={dataSaida || ''}
                                                        id="dataSaida"
                                                        name="dataSaida"
                                                        className="form-control"
                                                        placeholder="Informe a Data de Entrada"
                                                    />
                                                </Form.Group>
                                                <ButtonSimples />
                                            </Form>
                                        </Card.Body>
                                        <Card.Body className="map-linx p-3 pb-5">
                                            {/* Mapa Componentizado Localizando onde esta a placa */}
                                            <Mapa />
                                        </Card.Body>

                                    </Row>
                                </Card.Body>

                            </Card>

                        </Col>
                    </Row>
                    <Row className="mt-4 mb-4">
                        <Col xs="6" lg="6">
                        <Card className="bdm-linx b-r-linx f-linx">
                                <Card.Header className="bg-linx bt-r-linx">
                                    Resets
                                    </Card.Header>
                                <Card.Body>
                                    <GraficoReset id={props.match.params.id} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs="6" lg="6">
                        <Card className="bdm-linx b-r-linx f-linx">
                                <Card.Header className="bg-linx bt-r-linx">
                                    Saude Placa
                                    </Card.Header>
                                <Card.Body>
                                    <GraficoSaude id={props.match.params.id} />
                                </Card.Body>
                            </Card>

                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* <Card.Footer className="text-muted" fluid>2 days ago</Card.Footer> */}
        </Container>

    )
}

export default Registro