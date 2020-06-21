import React, { Component } from 'react';

/* Styles imports */
import './login.css';
import { Button, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
/* Gestionnaire de pages - imports */
import {
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";

/* App component */
class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        redirect: false,
        user : {
            email:'',
            password:'',
            message:'',
            status: ''
        }
    }
  }
  
  _inputEmail = (event) => {
    this.setState({email: event.target.value});
  }

  _inputPassword = (event) => {
    this.setState({password: event.target.value});
  }

_inputLogin = (e) => {

  e.preventDefault();

    if(!this.state.email || !this.state.password) {
        return;
    }

    var data = {
      email: this.state.email,
      password: this.state.password
    }

    var options = {
      method: "POST",
      headers: {
        "X-Requested-With": "XmlHttpRequest",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
    }

    fetch("http://localhost:8080/users/login", options)
    .then((res) => (res.json()))
    .then(
      (result) => {
        this.setState({
          message: result.message,
          status: result.user.status,
          redirect: true
        });
      },
      (error) => {
        this.setState({message: "Please try again or create a new account."});
      }
    )
  }

  _redirect = () => {
    if(this.state.redirect) {
      if(this.state.status === 'client') {
        return <Redirect to='/Dashboard' />
      }
      else if(this.state.status === 'admin') {
        return <Redirect to='/Admin' />
      }
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
          <div className="seven wide column sidebar-container">

            <Form className="login-space">
              <div className="login-opacity">
                <h3 className="white">{this.state.message}</h3>
                <p className="login-title">Accédez à votre dashboard privé :</p>
                <Form.Field>
                <input placeholder='Email' onChange={this._inputEmail} className="login-input" />
                </Form.Field>
                <Form.Field>
                <input placeholder='Mot de passe' onChange={this._inputPassword} type="password" className="login-input" />
                </Form.Field>
                
                <Button type='Submit' onClick={this._inputLogin} className="submit-button" >Se connecter</Button>
              </div>
            </Form>
          </div>

          <div className="nine wide column">
            <img src="/assets/teste.gif" ></img>
          </div>
        </div>


      </div>

      
    );
  }
}

export default Login;