import React, { Component } from 'react';

/* Styles imports */
import './Sidebar.css';
import { Icon, Menu } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

/* App component */
class AdminSidebar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        activeItem: 'Dashboard'
    }
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {

    const { activeItem } = this.state;

    return (

      <div>
<Menu text vertical>

<div className='MenuRow'>
    <Icon name='dashboard' className="large" />
    <Link to="/Admin" className="link">Dashboard</Link>
</div>

<div className='MenuRow'>
    <Icon name='user plus' className="large" />
    <Link to="/CreateAccount" className="link">Créer un compte</Link>
</div>

<div className='MenuRow'>
    <Icon name='video' className="large" />
    <Menu.Item
        name='Ajouter un périphérique'
        onClick={this.handleItemClick}
        className="sidebar-menu"
    />
</div>


</Menu>


    </div>
   
    );
  }
}

export default AdminSidebar;