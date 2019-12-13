import React, { useEffect, useState } from 'react';
import Axios from "axios"
import Url from '../../services/api'
import MenuNav from '../../components/Menu/MenuNavegacao';
import useForm from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/GeralT.css';
import { ToastContainer, toast } from 'react-toastify';
import {
    Card,
    Table,
    Row,
    Col,
    Container,
    Form,

} from 'react-bootstrap';

const CadastroUsuario = () => {

    const { handleSubmit, register, errors } = useForm();

    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        listaUsuarios();
    }, [])

    const listaUsuarios = () => {
        Axios.get(Url + "usuarios", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                setUsuarios(data.data);
            })
            .catch(erro => { console.log(erro) })
    }
    const onSubmit = event => {
        setLoading(true);
        let usuario = {
            nome: nome
            , email: email
            , senha: senha
            , tipoUsuario: tipoUsuario
        }
        Axios.post(Url + "usuarios", usuario,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
                    'Content-Type': 'application/json'
                }
            })
            .then(data => {
                listaUsuarios();
                toast.success('Usuário Cadastrada');
            })
            .catch(erro => {
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
                    <Row className="mt-4">
                        <Col xs="12" lg="12">
                            <Card className="f-linx b-r-linx">
                                <Card.Header className="bg-linx bt-r-linx d-flex justify-content-between">

                                    Cadastrar Usuario
                                    </Card.Header>
                                <Card.Body>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Row className="d-flex justify-content-around mr-2 ml-2 text-left" >
                                            <Form.Group controlId="formBasicEmail" as={Col} className="">
                                                <Form.Label className="text-dark">Nome do Usuario</Form.Label>
                                                <input
                                                    type="text"
                                                    onChange={e => {
                                                        setNome(e.target.value);
                                                    }
                                                    }
                                                    value={nome || ''}
                                                    id="nome"
                                                    name="nome"
                                                    className="form-control"
                                                    placeholder="Informe o Nome do Usuário"
                                                    ref={register({
                                                        required: 'Nome Usuário necessário'
                                                    })} />
                                                {errors.nome && <span className="error">{errors.nome.message}</span>}
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPassword" as={Col} className="">
                                                <Form.Label className="text-dark">E-mail do Usuario</Form.Label>
                                                <input
                                                    type="email"
                                                    onChange={e => {
                                                        setEmail(e.target.value);
                                                    }
                                                    }
                                                    value={email || ''}
                                                    id="email"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="Informe o Email do Usuário"
                                                    ref={register({
                                                        required: 'Email Usuário necessário'
                                                    })} />
                                                {errors.email && <span className="error">{errors.email.message}</span>}
                                            </Form.Group>
                                        </Row>
                                        <Row className="d-flex justify-content-around mr-2 ml-2">


                                            <Form.Group controlId="formBasicEmail" as={Col} className="">
                                                <Form.Label className="text-dark">Senha do Usuario</Form.Label>
                                                <input
                                                    type="password"
                                                    onChange={e => {
                                                        setSenha(e.target.value);
                                                    }
                                                    }
                                                    value={senha || ''}
                                                    id="senha"
                                                    name="senha"
                                                    className="form-control"
                                                    placeholder="Informe o Senha do Usuário"
                                                    ref={register({
                                                        required: 'Senha Usuário necessário'
                                                    })} />
                                                {errors.senha && <span className="error">{errors.senha.message}</span>}
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPassword" as={Col} className="p-0">
                                                <Form.Group as={Col} controlId="formGridState" className="p-0">
                                                    <Form.Label className="text-dark">Tipo Usuario</Form.Label>
                                                    <select className="form-control"
                                                        onChange={e => {
                                                            setTipoUsuario(e.target.value);
                                                        }
                                                        }
                                                        value={tipoUsuario || ''}
                                                        id="tipoUsuario"
                                                        name="tipoUsuario"
                                                        ref={register({
                                                            required: 'Tipo do Usuário obrigatório'
                                                        })}>
                                                        <option value="">Selecione</option>
                                                        <option value="Administrador">Administrador</option>
                                                        <option value="Comum">Comum</option>
                                                    </select>
                                                    {errors.tipoUsuario && <span className="error">{errors.tipoUsuario.message}</span>}
                                                </Form.Group>
                                            </Form.Group>
                                        </Row>

                                        <Row className="d-flex flex-row-reverse">
                                            <button type="submit" className="b-linx m-2 text-light" disabled={!loading ? '' : 'none'}>{loading ? "Salvando..." : "Salvar"}</button>
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

                                    Usuarios
                                    </Card.Header>
                                <Card.Body>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Email</th>
                                                <th>Tipo Usuario</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                usuarios.map(function (element) {
                                                    return (
                                                        <tr key={element.id}>
                                                            <td>{element.nome}</td>
                                                            <td>{element.email}</td>
                                                            <td>{element.tipoUsuario}</td>
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
export default CadastroUsuario

