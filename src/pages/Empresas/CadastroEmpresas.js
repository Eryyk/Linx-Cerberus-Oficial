import useForm from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Url from '../../services/api';
import { Card, Table, Row, Col, Container, Form, Button } from 'react-bootstrap';
import MenuNav from '../../components/Menu/MenuNavegacao';
import '../../assets/css/GeralT.css';
import ButtonSimples from '../../components/Button/ButtonSimples';

// Toastify - Alerts
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CadastroEmpresa = () => {
	const { handleSubmit, register, errors } = useForm();

	const [ id, setId ] = useState(0);
	const [ nomeFantasia, setNomeFantasia ] = useState('');
	const [ telefone, setTelefone ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ responsavel, setResponsavel ] = useState('');
	const [ listaEmpresa, setListaEmpresa ] = useState([]);
	const [ loading, setLoading ] = useState(false);

	useEffect(() => {
		atualizaEmpresas();

		// setListaEmpresa([
		// 	{
		// 		id: 1,
		// 		email: 'a@a.com',
		// 		nomeFantasia: 'Ariel',
		// 		telefone: '+551195685434',
		// 		responsavel: 'ninguém'
		// 	},
		// 	{
		// 		id: 1,
		// 		email: 'a@a.com',
		// 		nomeFantasia: 'Ariel',
		// 		telefone: '+551195685434',
		// 		responsavel: 'ninguém'
		// 	}
		// ]);
		// Adicionando itens estáticos para teste

	}, []);

	// componentDidMount()
	// {
	//     this.atualizaEmpresas();
	// }

	const atualizaEmpresas = () => {
		Axios.get(Url + 'empresas', {
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
				'Content-Type': 'application/json'
			}
		})
			.then((data) => {
				setListaEmpresa(data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const onSubmit = (event) => {
		let empresa = {
			nomeFantasia: nomeFantasia,
			telefone: telefone,
			email: email,
			responsavel: responsavel
		};
		if (id === 0) {
			// Se o id for igual a 0 significa que um valor será cadastrado.
			Axios.post(Url + 'Empresas', empresa, {
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
					'Content-Type': 'application/json'
				}
			})
				.then((data) => {
					atualizaEmpresas();
					toast.success('Empresa Cadastrado!');

					setId(0);
					setNomeFantasia();
					setTelefone();
					setEmail();
					setResponsavel();
				})
				.catch((erro) => {
					toast.error('Empresa não cadastrada.');

					setId(0);
					setNomeFantasia();
					setTelefone();
					setEmail();
					setResponsavel();
				})
				.finally(() => setLoading(false));
		} else {
			empresa.id = id; // Atribui o id do state para o objeto, para que possa ser alterado.

			Axios.put(Url + 'Empresas/' + id, empresa, {
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
					'Content-Type': 'application/json'
				}
			})
				.then((data) => {
					atualizaEmpresas();
					toast.success('Empresa Atualizada!');
					setId(0);
					setNomeFantasia();
					setTelefone();
					setEmail();
					setResponsavel();
				})
				.catch((erro) => {
					toast.error('Empresa não atualizada.');

					setId(0);
					setNomeFantasia();
					setTelefone();
					setEmail();
					setResponsavel();
				})
				.finally(() => setLoading(false));

			// Se o id for diferente de 0 significa que um valor será cadastrado.
		}
	};

	const editar = (id) => {
		let empresa = listaEmpresa.filter((item) => item.id === id);

		if (empresa.length > 0) {
			setId(id);
			setNomeFantasia(empresa[0].nomeFantasia);
			setTelefone(empresa[0].telefone);
			setEmail(empresa[0].email);
			setResponsavel(empresa[0].responsavel);
		}
	};

	return (
		<Container fluid={true}>
			<ToastContainer position="top-right" autoClose={3000} />

			<Row>
				<Col xs="3" lg="2">
					<MenuNav />
				</Col>
				<Col xs="9" lg="10">
					<Row className="mt-4">
						<Col xs="12" lg="12">
							<Card className="f-linx b-r-linx">
								<Card.Header className="bg-linx bt-r-linx d-flex justify-content-between">
									Cadastrar Empresa
								</Card.Header>
								<Card.Body>
									<Form className="cadastro__form" onSubmit={handleSubmit(onSubmit)}>
										<Row className="d-flex justify-content-around mr-2 ml-2 text-left">
											<Form.Group as={Col} className="">
												<Form.Label className="text-dark">Nome fantasia empresa</Form.Label>
												<input
													type="text"
													onChange={(e) => {
														setNomeFantasia(e.target.value);
													}}
													value={nomeFantasia || ''}
													id="nomeFantasia"
													name="nomeFantasia"
													className="form-control"
													placeholder="insira o nome fantasia"
													ref={register({
														required: 'Nome Fantasia necessário.'
													})}
												/>
												{errors.nomeFantasia && (
													<span className="error">{errors.nomeFantasia.message}</span>
												)}
											</Form.Group>
											<Form.Group as={Col} className="">
												<Form.Label className="text-dark">Telefone de contato</Form.Label>
												<input
													type="tel"
													onChange={(e) => {
														setTelefone(e.target.value);
													}}
													value={telefone || ''}
													name="telefone"
													className="form-control"
													placeholder="insira o telefone"
													ref={register({
														required: 'Telefone necessário.'
													})}
												/>
												{errors.telefone && (
													<span className="error">{errors.telefone.message}</span>
												)}
											</Form.Group>
											<Form.Group as={Col} className="">
												<Form.Label className="text-dark">E-mail de contato</Form.Label>
												<input
													type="email"
													onChange={(e) => {
														setEmail(e.target.value);
													}}
													value={email || ''}
													name="email"
													className="form-control"
													placeholder="insira o email"
													ref={register({
														required: 'E-mail necessário.'
													})}
												/>
												{errors.email && <span className="error">{errors.email.message}</span>}
											</Form.Group>
										</Row>
										<Row className="d-flex justify-content-between mr-2 ml-2">
											<Form.Group className="col-4">
												<Form.Label className="text-dark">Nome Responsavel</Form.Label>
												<input
													type="text"
													onChange={(e) => {
														setResponsavel(e.target.value);
													}}
													value={responsavel || ''}
													name="responsavel"
													className="form-control"
													placeholder="insira o responsavel"
													ref={register({
														required: 'Responsável necessário.'
													})}
												/>
												{errors.responsavel && (
													<span className="error">{errors.responsavel.message}</span>
												)}
											</Form.Group>
											<Row className="d-flex flex-row-reverse">
											<ButtonSimples />

											</Row>
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
									Empresas
								</Card.Header>
								<Card.Body>
									<Table responsive>
										<thead>
											<tr>
												<th>Nome Fantasia</th>
												<th>Telefone</th>
												<th>E-amil</th>
												<th>Responsavel</th>
											</tr>
										</thead>
										<tbody>
											{listaEmpresa.map(function(element) {
												return (
													<tr key={element.id}>
														<td>{element.nomeFantasia}</td>
														<td>{element.telefone}</td>
														<td>{element.email}</td>
														<td>{element.responsavel}</td>
														<td>
															<button
																type="button"
																className="text-light editar"
																onClick={() => {
																	editar(element.id);
																}}
															>
																Editar
															</button>
														</td>
													</tr>
												);
											})}
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
};

export default CadastroEmpresa;
