import React from 'react'
import { Button,Modal } from 'react-bootstrap';
import CustomerForm from './../customers/CustomerForm'
class ModalForm extends React.Component{
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false
        };
      }
    
      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }
    
      render() {
        
    
        return (
          <div>
           
    
            <Button onClick={this.handleShow}>
              Add Customer
            </Button>
    
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Customer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <CustomerForm handleSubmit={this.props.handleFormSubmit}/>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
      }
}
export default ModalForm 