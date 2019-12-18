import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import Axios from "axios";
import Url from '../../../services/api'

const options = {
  maintainAspectRatio: false,
  title: {
    display: false,
    text: 'Title',
    fontSize: 25
  },
  legend: {
    display: false,
    position: 'bottom'
  },
  scales: {
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Data',
        fontSize: 20
      },
      //type: 'linear',
      position: 'bottom',
      gridLines: {
        display: false
      }
    }],
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Amperagem',
        fontSize: 20
      }
    }]
  }
}
// Estrutura a Tabela
let line = {
  // informa a date dos Resets
  labels: null,
  datasets: [
    {
      label: 'Quantidade de Resets no dia',
      fill: 'none',          // Don't fill area under the line
      borderColor: '#C409FF',  // Line color
      lineTension: 0.0,
      width: 100,
      height: 250,
      data: null
    }
  ]
};

export default class GraficoSaudePlaca extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelsRelatorioResets: [],
      dataRelatorioResets: [],
      legendaGrafico: [],
      placaEnderecoId: 0 

    }
  }

  formataData(data) {
    var d = new Date(data);
    return d.toLocaleString().replace(' 00:00:00', '');
  }

  componentDidMount() {
    Axios.get(Url + 'SaudePlacas/'+ this.props.id, {
      headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('usuario'),
          'Content-Type': 'application/json'
      }
  })
      .then(data => {
        data.data.map((item) => {
          this.state.labelsRelatorioResets.push(this.formataData(item.dataSalva))
        })

        line.labels = this.state.labelsRelatorioResets;

        data.data.map((item) => {
          console.log( "Item" + item.energiaConsumida)
          this.state.dataRelatorioResets.push(item.energiaConsumida.replace( "W", "" ))
        })


        line.datasets[0].data = this.state.dataRelatorioResets;
      });
   }

  render() {

    return (
      <div className="gb-linx">
        <Line data={line} options={options} height="250" />
      </div>
    );
  }
}