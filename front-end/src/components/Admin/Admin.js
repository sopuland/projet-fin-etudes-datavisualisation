import React, { Component } from 'react';
import AdminSidebar from '../Sidebar/AdminSidebar';
import ListClient from '../ListClient/ListClient';
import AdminBlocs from '../Blocs/AdminBlocs';


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    render() {

        return (

          <div>
            <div className="BreadRow">
              <div className="inline">
                <div className="rectangle"></div>
                  <div className="BreadPolice left">
                    <p className="hello">Dashboard d'administration
                    </p>
                  </div>
                </div>
              <div className="rectangle"></div>
            </div>

            <div className="ui grid">
              <div className="three wide column sidebar-container">

                <div className="sidebar">
                  <AdminSidebar />
                </div>
              </div>
              <div className="twelve wide column blocs-container">
                <AdminBlocs />
                <br />
                <h2>Liste clients:</h2>
                <div>
                  <br />
                  <ListClient />
                </div>
              </div>
            </div>
          </div>


        );
    }
}

export default Admin;

