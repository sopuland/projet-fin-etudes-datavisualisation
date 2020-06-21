/*
 * Main app component
 */

/* Module imports */
import React, { Component } from 'react';

/* Styles imports */
import './App.css';
import 'semantic-ui-css/semantic.min.css';

/* Component imports */
import Login from '../Login/login';
import Header from '../Header/header';
import Dashboard from '../Dashboard/Dashboard';
import DeviceDashboard from '../DeviceDashboard/DeviceDashboard';
import CreateAccount from '../CreateAccount/CreateAccount';
import Admin from '../Admin/Admin';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


/* App component */
class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (

      <Router>
        <div>
       
          <Header />

          <Switch>
             
            <Route path="/Dashboard">
              <Dashboard />
            </Route>
            <Route path="/CreateAccount">
              <CreateAccount />
            </Route>
            <Route path="/DeviceDashboard" component={DeviceDashboard}>
            </Route>
            <Route path="/Admin">
              <Admin />
            </Route>
            <Route path="/">
              <Login />
            </Route>

        </Switch>  

          <div className="login-footer">
            <p className="slogan">Karroad - Flow Analysis with AI</p>
          </div>

        </div>
      </Router>



    );
  }
}

export default App;
