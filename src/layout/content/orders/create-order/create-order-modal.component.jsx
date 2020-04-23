import React from 'react'
import { Modal } from 'react-bootstrap';
import CreateOrderForm from '../../orders/forms/create-order.form'

const  CreateOrderModal =(props)=>{
    return (
      <Modal size="lg" {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New Order --
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateOrderForm />
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }

  export default CreateOrderModal;