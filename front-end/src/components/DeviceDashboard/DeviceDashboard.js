import React, { Component } from 'react';

import BarChart from '../Crossfilter/BarChart';
import LineChart from '../LineChart/lineChart';
import Sidebar from '../Sidebar/DeviceSidebar';
import BreadCrumb from '../Dashboard/BreadCrumb';
import Heatmap from '../Heatmap/Heatmap';

import { Icon } from 'semantic-ui-react';

class DeviceDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          idVideocam: '',
          videocam: '',
          lat:'',
          long:''
        }
    }

  componentDidMount() {

    // Je récupère le props de la page "Blocs"
    var idVideocam = this.props.location.state.idVideocam;

    // Sécurité : Si aucun ID n'est récupéré, je return.
    if(!idVideocam) {
      return;
    }

    var data = {
      id: idVideocam
    };

    var options = {
        method: 'POST',
        headers: {
          "X-Requested-With": "XmlHttpRequest",
          "Content-Type": "application/json"
        },
        credentials: "include",
    // Les données que j'envoies : data : id Videocam
        body: JSON.stringify(data)
      }
      
    fetch('http://localhost:8080/device', options)
    .then((res) => (res.json()))
    .then(
    (result) => {
        this.setState({
        idVideocam: result.idVideocam,
        videocam: result.videocam,
        lat: result.lat,
        long: result.long
        });
    },
    (error) => {
        this.setState({message: "Attention : Vous n'avez pas sélectionné de périphérique."});
    }
    )
  }

    render() {

        return (

          <div>
            <div>
              <BreadCrumb />
            </div>

            <div className="ui grid">
              <div className="three wide column sidebar-container">
                <div className="sidebar">
                  <Sidebar />
                </div>
              </div>
              <div className="twelve wide column blocs-container">
                <h2 className="peripherique-title">Périphérique - {this.state.videocam}</h2>
                <p className="left"><Icon name='map pin' /> Latitude: {this.state.lat} - Longitude: {this.state.long}</p>
                <div>
                  <br />
                  <Heatmap />
                </div>
                <div>
                  <br />
                  <BarChart />
                </div>
                <div>
                  <br />
                  <LineChart />
                </div>
              </div>
            </div>
          </div>

        );
    }
}

export default DeviceDashboard;

