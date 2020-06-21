import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Form, Button } from 'semantic-ui-react';

class ListClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
           enterprise: "",

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
      
      fetch('http://localhost:8080/admin/list', options)
      .then((res) => (res.json()))
      .then(
        (result) => {
          console.log(result);
          this.setState({
  
          enterprise: result.enterprise,
          nbPeripherique: result.videocam.length,
          endengagement: result.endengagement
  
          });
        },
        (error) => {
          this.setState({message: "Aucun client à affiché"});
        }
      )
    }

    _displayClientList = () => {

      var clientListing = this.state.enterprise;
      
      var list = clientListing.map((name) => {
        return(
          
          <option value={name.enterprise}>{name.enterprise}</option>
          
        )
      });
      return (
          <div>{list}</div>
        );
  }

  _displayPeripherique = () => {

    var peripheriqueListing = this.state.videocam;
    
    var peripheriques = peripheriqueListing.map((device) => {
      return(
        
        <option value={device.name}>{device.name}</option>
        
      )
    });
    return (
        <div>{peripheriques}</div>
      );
}
    
    render() {
        return (
            <div>
                

                <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Client</Table.HeaderCell>
        <Table.HeaderCell>Nombre de Péripherique</Table.HeaderCell>
        <Table.HeaderCell>Fin de Contrat</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Mairie de Cannes</Table.Cell>
        <Table.Cell>2 périphériques</Table.Cell>
        <Table.Cell>21 mars 2020</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>ESCOTA</Table.Cell>
        <Table.Cell>17 Cameras</Table.Cell>
        <Table.Cell>31 décembre 2020</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Port de Nice</Table.Cell>
        <Table.Cell>22 Cameras</Table.Cell>
        <Table.Cell>5 avril 2021</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Sophia-Antipolis</Table.Cell>
        <Table.Cell>2 Cameras</Table.Cell>
        <Table.Cell>5 avril 2031</Table.Cell>
      </Table.Row>
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='chevron right' />


            </Menu.Item>

          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>



            </div>
        );
    }
}

export default ListClient;