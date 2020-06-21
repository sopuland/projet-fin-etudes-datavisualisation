/*
 * Main app component
 */

/* Module imports */
import React, { Component } from 'react';

/* Styles imports */
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';


/* App component */
class Breadcrumb extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        enterprise: '',
        email: ''
      }
    }

  componentDidMount() {
    this._fetchUser();
  }
  
  _fetchUser = () => {
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

          enterprise: result.enterprise,
          email: result.email

        });
      },
      (error) => {
        this.setState({message: "Please, create an account or login."});
      }
    )        
  }

  _displayUser = () => {
    if(this.state.email) {
      return(
        <div className="BreadRow">
          <div className="inline">
              <div className="rectangle"></div>
                <div className="BreadPolice left">
                  <p className="hello">Dashboard
                  <Icon name='right angle' />
                  {this.state.enterprise}
                  </p>
                </div>
            </div>
          <div className="rectangle"></div>
        </div>
      )
    }
  }

  render() {
    return (

      <div>
        {this._displayUser()}
      </div>

    );
  }
}

export default Breadcrumb;

