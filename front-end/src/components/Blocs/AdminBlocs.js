import React, { Component } from 'react';

import { Segment, Icon } from 'semantic-ui-react';
import './Blocs.css';

class AdminBlocs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            endengagement: ''
        }
    }

    componentDidMount() {
      
        var options = {
          method: 'GET',
          headers: {
            "X-Requested-With": "XmlHttpRequest",
            "Content-Type": "application/json"
          },
          credentials: "include"
        }
        
        fetch('http://localhost:8080/users/user', options)
        .then((res) => (res.json()))
        .then(
          (result) => {
            this.setState({
    
            clients: result.enterprise.length,
    
            });
          },
          (error) => {
            this.setState({message: "Vous n'avez pas de client."});
          }
        )

      }

    render() {

        return (

            <div>

                <div className="ui grid">
                    <div className="eight wide column">
                        <Segment raised className="blue">
                            <div className="inline perifColor">
                                <div className="ui grid">
                                    <div className="four wide column">
                                        <Icon name='video' size='huge' />
                                    </div>
                                    <div className="twelve wide column">
                                        <p className="nbActif">7</p>
                                        <p className="blocText">Nbre de clients</p>
                                    </div>
                                </div>
                            </div>
                        </Segment>
                    </div>
                    <div className="eight wide column">
                        <Segment raised className="orange">
                            <div className="dateColor inline">
                                <div className="ui grid">
                                    <div className="four wide column">
                                        <Icon name='attention' size='huge' />
                                    </div>
                                    <div className="twelve wide column">
                                        <p className="dateContrat">0 </p>
                                        <p className="blocText">Nb clients en fin de contrat.</p>
                                    </div>
                                </div>
                            </div>
                        </Segment>
                    </div>

                </div>
            </div>


        );
    }
}

export default AdminBlocs;

