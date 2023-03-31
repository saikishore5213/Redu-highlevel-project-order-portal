import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import JsonViewers from './JsonViewers';

const ConfirmationPopUp = (props) => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(props.setShow(false));
  const handleConfirmation = () => {
    handleClose();
    props.actionMethod();
  };
  return (
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm {props.modalName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="modalWindowScroll">
          <Row>
            <Col xs={12}>
              <h5>Please confirm the request below :</h5>
            </Col>
          </Row>
          {props.requestData && (
            <Row>
              <Col xs={12}>
                <JsonViewers name={'Request Object'} data={props.requestData} collapsed={5} showSearch={false} maxHeightValue={'70vh'} />
              </Col>
            </Row>
          )}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirmation}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationPopUp;
