import React, { Component } from 'react';
import {
    Card
} from 'react-bootstrap';

export default class CardSimples extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Card className="b-r-linx">
                 <Card.Header className="bg-linx f-linx bt-r-linx">
                     {this.props.title}
                 </Card.Header>
                 <Card.Body className="text-center h2" >
                     {this.props.texto}
                 </Card.Body>
            </Card>
        )
    }
}