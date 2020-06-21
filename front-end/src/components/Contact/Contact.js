import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Form, TextArea } from 'semantic-ui-react';

import './Contact.css';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mailsending: "",
            comment: ""
        }
    }

    _changeComment = (event) => {
        this.setState({comment: event.target.value});
      }



      _sendmail = () => {
        
        /* Check value */
        if(!this.state.comment) {
          return;
        }
    
        /* Request */
        var data =  {
          comment: this.state.comment
        }
    
        var options = {
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
    
        fetch('http://localhost:8080/users/messagerie', options)
        .then((res) => (res.json()))
        .then(
          (result) => {
            this.setState({message: result.message});
          },
          (error) => {
            this.setState({message: "Une  erreur s'est produite"});
          }
        )
      }



    render() {
        return (
            <div className="emailButton">

                <Modal trigger={<Icon className="mail outline large" />} basic size='small'>
                    <Header icon='archive' content='Votre message' />
                    <Modal.Content>

                        <Form>
                            <TextArea onChange={this._changeComment} value={this.state.comment} placeholder='Ecrivez votre message' />
                        </Form>

                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this._sendmail} color='green' inverted>
                            <Icon name='checkmark' /> Envoyez
                        </Button>
                    </Modal.Actions>
                </Modal>


            </div>
        );
    }
}

export default Contact;