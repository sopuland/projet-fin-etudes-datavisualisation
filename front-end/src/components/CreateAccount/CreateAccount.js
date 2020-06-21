/*
 * Main app component
 */

/* Module imports */
import React, { Component } from 'react';

/* Styles imports */
import 'semantic-ui-css/semantic.min.css';
import { Form, Grid, Button } from 'semantic-ui-react';
import './CreateAccount.css';

import Sidebar from '../Sidebar/AdminSidebar';
import BreadCrumb from '../Dashboard/BreadCrumb';
  

/* App component */
class CreateAccount extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        user: {
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        endengagement: '',
        status: '',
        enterprise: '',
        message:''
    }
  }}

  _createAccount = (event) => {
    event.preventDefault();

    var data = {
        user: {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            endengagement: this.state.endengagement,
            status: this.state.status,
            enterprise: this.state.enterprise
        }
    }

    var options = {
        method: 'POST',
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        credentials: "include"
    }

    fetch('http://localhost:8080/users', options)
    .then((res) => (res.json()))
    .then(
        (result) => {
            this.setState({message: result.message});
        },
        (error) => {
            this.setState({message: "Oups. Please try again."});
        }
    )
  }

  render() {

    return (
        <div>
            <BreadCrumb />

            <div className="ui grid">
                <div className="three wide column sidebar-container">

                    <div className="sidebar">
                        <Sidebar />
                    </div>
                </div>
                <div className="twelve wide column sidebar-container">
                <h3 className="center">Créer un compte utilisateur</h3>

                <Grid centered columns={2}>
                    <Grid.Column>
                        <h3 >{this.state.message}</h3>
                        <Form>

                            <div className="field input-style">
                            <input onChange={(event) => {this.setState({enterprise:event.target.value})}} type="text" placeholder="Entreprise" required/>
                            </div><div className="field input-style">
                                <p>Fin de contrat, le :</p>
                            <input onChange={(event) => {this.setState({endengagement:event.target.value})}} type="date" placeholder="Fin d'engagement" required/>
                            </div>
                    
                                <p>Contact principal:</p>
                            <div className="field input-style">
                            <input onChange={(event) => {this.setState({firstname:event.target.value})}} type="text" placeholder="Prénom" required/>
                            </div><div className="field input-style">
                            <input onChange={(event) => {this.setState({lastname:event.target.value})}} type="text" placeholder="Nom" required/>
                            </div>
                    
                            <div className="field input-style">
                                <input onChange={(event) => {this.setState({email:event.target.value})}} type="email" placeholder="eMail" required />
                            </div><div className="field input-style">    
                                <input onChange={(event) => {this.setState({password:event.target.value})}} id="password-login" type="password" placeholder="Mot de passe" required />
                           </div>


                            <div className="field input-style">
                                <select onChange={(event) => {this.setState({status:event.target.value})}} className="select-css" >
                                    <option value="client">Choisir le type d'accès</option>
                                    <option value="client">Accès client</option>
                                    <option value="admin"> Accès Admin</option>
                                </select>
                            </div>

                            <Button onClick={this._createAccount} type="submit" className="bloc-center">VALIDER</Button>
                    
                        </Form>

                    </Grid.Column>
                </Grid>
            </div>
            </div>
      </div>
    );
  }
}

export default CreateAccount;
