import React, { Component } from 'react';
import Logo from '../../assets/imagens/logo.png';
import '../../assets/css/MenuNav.css';

export default class MenuNavegacao extends Component {

    realizarLogout() {
        localStorage.clear();
        window.location.href = '/';
    } 

    render() {
        return (
            <div id="MenuNav_Principal">
                <div id="Bloco_imagem_MenuNav">
                    <a href="/Dashboard"><img src={Logo} alt="Linx logotipo" id="imgNavegador" /></a>
                </div>
                <div id="Ul_RotasMenu">
                    <p><a href="/Dashboard">Dashboard</a></p>
                    <p><a href="/RegistrosPlacas">Registros</a></p>
                    <p><a href="/Usuarios">Usuarios</a></p>
                    <p><a href="/Empresas">Empresas</a></p>
                    <p><a href="/Enderecos">Endereços</a></p>
                    <p><a href="/Placas">Placas</a></p>
                </div>
                <p className="Btn_sair_MenuNav"><a className="navega" onClick={this.realizarLogout.bind(this)}>Sair</a></p>
                

            </div>
        )
    }
}