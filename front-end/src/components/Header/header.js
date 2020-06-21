import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Contact from '../Contact/Contact'

/* Styles imports */
import './header.css';
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

/* App component */
class Header extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        logout: false,

    }
  }

  _redirection = () => {
      if(this.state.logout) {
        return <Redirect to='https://karroad.com/'/>
      }
  }
  
  _logout = () => {
    var options = {
    method: 'GET',
    headers: {
      "X-Requested-With": "XmlHttpRequest",
      "Content-Type": "application/json"
      },
    credentials: "include"
    }
  
    fetch('http://localhost:8080/users/logout', options)
    .then((res) => (res.json()))
    .then(
      (result) => {
        this.setState({
          logout: true
        });
      },
      (error) => {
        this.setState({message: "Please, create an account or login."});
    }
    )
  }
  

  render() {
    return (

<div>
        <div className = "header-container">
          <img src="../assets/logo.png" id="logo" alt="Karroad" />
          <nav className="inline">
            <Contact /> 
            <Icon className="user outline large" />
            <button onClick={this._logout} className="menu-icon"><Icon className="log out large" /></button>
          </nav>
        </div>
​
      </div>

  
   
    );
  }
}

export default Header;



        