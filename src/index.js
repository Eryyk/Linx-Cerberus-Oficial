import React from 'react';
import ReactDOM from 'react-dom';

import Login from './pages/Login/Login';

import 'bootstrap/dist/css/bootstrap.min.css';

//imports das paginas de cadastros
import CadastroUsuario from './pages/Usuarios/CadastroUsuarios';
import CadastroEmpresa from './pages/Empresas/CadastroEmpresas'
import CadastroEndereco from './pages/Enderecos/CadastroEnderecos';
import CadastroPlaca from './pages/Placas/CadastroPlacas'
import Registro from './pages/Registros/Registro';
import RegistrosPlacas from './pages/Registros/RegistrosPlacas';
import Dashboard from './pages/Resets/Dashboard';
import { usuarioAutenticado } from '../src/services/auth';
import { parseJwt } from '../src/services/auth';

import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

const PermissaoAdmin = ({ component: Component }) => (
    <Route
        render={props =>
            usuarioAutenticado() && parseJwt().Role === "Administrador" ? (
                <Component {...props} />
            ) : (
                    <Route to={{ pathname: "/Login" }} />
                )
        }
    />
);

const Permissao = ({component : Component}) => (
    <Route 
        render = {props =>
             usuarioAutenticado() ?
        (<Component {...props} />) :
        (<Route to={{pathname : '/Login', state : {from : props.location}}} />)
        }
    />
);

const rotas = ( 
    <Router>
        <div>
            <Switch>
                {/* <Permissao exact path='/usuarios' component={CadastroUsuario} /> */}
                <Route exact path='/Usuarios' component={CadastroUsuario} />
                {/* <Permissao exact path='/empresas' component={CadastroEmpresa} /> */}
                <Route exact path='/Empresas' component={CadastroEmpresa} />
                {/* <Permissao exact path='/enderecos' component={CadastroEndereco} /> */}
                <Route exact path='/Enderecos' component={CadastroEndereco} />
                {/* <Permissao exact path='/placas' component={CadastroPlaca} /> */}
                <Route exact path='/Placas' component={CadastroPlaca} />
                {/* <Permissao exact path='/alterarTempos' component={AlterarTempos} /> */}
                <Route exact path='/Registro/:id' component={Registro} />

                {/* <Route exact path='/registrarPlaca' component={CadastroPlacaEndereco} /> */}
                <Route exact path='/RegistrosPlacas' component={RegistrosPlacas} />
                {/* <Permissao exact path='/Dashboard' component={Dashboard} /> */}
                <Route exact path='/Dashboard' component={Dashboard} />
                {/* <Route path='/login' component={Login} />
                <Route path='' component={Login}/> */}
                <Route exact path="/" component={Login} />

            </Switch>
        </div>
    </Router>
)

ReactDOM.render(rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();