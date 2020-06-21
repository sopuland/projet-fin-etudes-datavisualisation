/*
 * Main app component
 */

/* Module imports */
import React, { Component } from 'react';

/* Styles imports */
import 'semantic-ui-css/semantic.min.css';


/* Component imports */
import Blocs from '../Blocs/Blocs';
import Sidebar from '../Sidebar/Sidebar';
import BreadCrumb from '../Dashboard/BreadCrumb';


/* App component */
class Dashboard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
  
        sections: [
          { key: "1", content: 'Mairie de Cannes', link: true },
          { key: '2', content: 'Dashboard', link: true }
        ]
    }
  }

 

  render() {
    return (

          <div>
            <BreadCrumb />
            {/* BreadCrumb 
   
            <div className="BreadRow">
                <div className="inline">
                    <div className="rectangle"></div>
                    <div className="BreadPolice left"></div>
                    <Breadcrumb icon='right angle' sections={this.state.sections} />
                    </div>
                    <div className="inline">
                    <p className="hello">Bonjour {this.state.user.contactFirstname} {this.state.lastname} </p>
                    <div className="rectangle"></div>
                </div>
            </div>*/}

            {/* Blocs */}
            <div className="ui grid">
              <div className="three wide column sidebar-container">
                <div className="sidebar">
                  <Sidebar />
                </div>
              </div>
              <div className="twelve wide column blocs-container">
                <Blocs />

              </div>
            </div>
          </div>








    );
  }
}

export default Dashboard;
