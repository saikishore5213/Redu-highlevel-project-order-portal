import { Row, Col, FloatingLabel, Form } from 'react-bootstrap';
import InProgress from '../commonComponents/InProgress';
import JsonViewers from '../commonComponents/JsonViewers';
import { deleteReservationAction, validation } from './deleteReservationAction';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMarket,
  setProcessing,
  setReservationId,
  setResultData,
  setShowDeleteReservationConfirmation,
  setValidReservationId,
} from '../../store/deleteReservationSlice';
import { handleEnterKeyPress } from '../../util/helper';
import ButtonComponent from '../commonComponents/ButtonComponent';
import ConfirmationPopUp from '../commonComponents/ConfirmationPopUp';

const DeleteReservation = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { reservationId, market, resultData, processing, validReservationId, showDeleteReservationConfirmation } = useSelector(
    (state) => state.deleteReservation,
  );
  const createRequestPayload = () => {
    return {
      reservationId,
      market,
    };
  };
  const confirmDeleteReservation = () => {
    if (!validation(reservationId)) {
      dispatch(setValidReservationId(false));
      return;
    }
    dispatch(setShowDeleteReservationConfirmation(true));
  };

  const deleteReservation = async () => {
    dispatch(setProcessing(true));
    const result = await deleteReservationAction(reservationId, market, token, dispatch);
    if (!result) {
      dispatch(setProcessing(false));
      return;
    }
    dispatch(setResultData(result));
    dispatch(setProcessing(false));
  };

  return (
    <>
      <Row className="g-2">
        <Col xs={6} md={3}>
          <FloatingLabel controlId="reservationId" label="Reservation Id">
            <Form.Control
              type="text"
              onChange={(e) => dispatch(setReservationId(e.target.value))}
              placeholder="reservationId"
              isInvalid={!validReservationId}
              onKeyPress={(e) => handleEnterKeyPress(e, confirmDeleteReservation)}
            />
          </FloatingLabel>
        </Col>
        <Col xs={6} md={2}>
          <FloatingLabel controlId="market" label="Market">
            <Form.Select aria-label="Select" onChange={(e) => dispatch(setMarket(e.target.value))}>
              <option value="us">USA</option>
              <option value="sg">Singapore</option>
              <option value="nz">New Zealand</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col xs={6} md={2} className="actionButton">
          <ButtonComponent name={' Delete '} variant="primary" clickAction={(event) => confirmDeleteReservation()} />
        </Col>
      </Row>
      {processing && <InProgress />}
      {resultData && <JsonViewers name={'Delete Response'} data={resultData} />}
      {showDeleteReservationConfirmation && (
        <ConfirmationPopUp
          show={showDeleteReservationConfirmation}
          setShow={setShowDeleteReservationConfirmation}
          actionMethod={deleteReservation}
          modalName={'delete reservation'}
          requestData={createRequestPayload()}
        />
      )}
    </>
  );
};

export default DeleteReservation;
