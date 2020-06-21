import React, { Component } from 'react';

import { Segment, Icon } from 'semantic-ui-react';
import './Blocs.css';
import Maping from '../Map/map';
import {
    BrowserRouter as Router,
    Redirect
  } from "react-router-dom";

class Blocs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videocam: [],
            endengagement: '',
            redirect: false,
            idVideocam: ''
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
    
            endengagement: result.endengagement,
            nbVideocam: result.videocam.length,
            videocam: result.videocam,
            nameVideocam: result.videocam.name
    
            });
          },
          (error) => {
            this.setState({message: "Vous n'avez pas de périphérique actif."});
          }
        )

      }

      _displayVideocam = () => {

        var videocam = this.state.videocam;
        
        var peripheriques = videocam.map((device) => {
          return(

        // Je récupère la valeur ID pour la page DeviceDashboard
        // J'affiche le name dans le menu déroulant
            
            <option value={device.id}>{device.name}</option>
            
          )
        });

        // J'ajoute une entrée dans le menu déroulant -> dans le tableau
        // Obligé car la donnée est prise en compte au : onChange

        peripheriques.unshift((<option value={''}>Choisissez un périphérique</option>))

        return (
            <div><select className="select-css" onChange={(event) => {
                this.setState({idVideocam:event.target.value,redirect:true})
            }}>{peripheriques}</select></div>
          );
    }
    
    // Redirection vers la page du Dashboard avec l'ID en props
    _redirect = () => {
        if(this.state.redirect) {
            return <Redirect to={{
                pathname: '/DeviceDashboard',
                state: { idVideocam: this.state.idVideocam }
            }} />
        } 
        else {
            return;
        }
    } 

    render() {

        return (

            <div>

                {this._redirect()}
                <div className="ui grid">
                    <div className="eight wide column">
                        <Segment raised className="blue">
                            <div className="inline perifColor">
                                <div className="ui grid">
                                    <div className="four wide column">
                                        <Icon name='video' size='huge' />
                                    </div>
                                    <div className="twelve wide column">
                                        <p className="nbActif">{this.state.nbVideocam}</p>
                                        <p className="blocText">Périphériques actifs</p>
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
                                        <p className="dateContrat">{this.state.endengagement} </p>
                                        <p className="blocText">date de fin de contrat.</p>
                                    </div>
                                </div>
                            </div>
                        </Segment>
                    </div>
                    <div className="sixteen wide column">
                        <p>{this._displayVideocam()}</p>
                       
                    
                    </div>
                    <div className="sixteen wide column">

                        <Segment raised>
                            <Maping />
                        </Segment>
                    </div>

                </div>
            </div>


        );
    }
}

export default Blocs;

