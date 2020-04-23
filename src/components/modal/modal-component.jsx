import React from 'react'
import {Modal } from 'react-bootstrap'

const ModalComponent = ({showModal,modalHeading, closeModal, modalSize="lg", children})=> {
    // console.log(children)
    return (
        <Modal size={modalSize} show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    )
}

export default ModalComponent
