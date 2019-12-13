import React, { Component } from 'react';
import Logo from '../../assets/imagens/logo.png';
import '../../assets/css/MenuNav.css';

export default class MenuNavegacaoComum extends Component {
    
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
                    <p><a href="dashboard">Dashboard</a></p>
                </div>
                <p className="Btn_sair_MenuNav"><a className="navega" onClick={this.realizarLogout.bind(this)}>Sair</a></p>
            </div>
        )
    }
}