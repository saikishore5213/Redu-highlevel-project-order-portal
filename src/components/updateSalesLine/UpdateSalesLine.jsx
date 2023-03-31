import { Row, Col, FloatingLabel, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBillingState,
  setFulfillmentState,
  setMarket,
  setProcessing,
  setResultData,
  setLineNumber,
  setSalesTransactionId,
  setSerialNumber,
  setStorageLocation,
  resetValidation,
  setShowReAuthConfirmation,
} from '../../store/updateSalesLineSlice';
import ButtonComponent from '../commonComponents/ButtonComponent';
import InProgress from '../commonComponents/InProgress';
import JsonViewers from '../commonComponents/JsonViewers';
import { constructData, constructURLParameter, updateSalesLineAction } from './UpdateSalesLineAction';
import { handleEnterKeyPress } from '../../util/helper';
import ConfirmationPopUp from '../commonComponents/ConfirmationPopUp';

function UpdateSalesLine() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const {
    salesTransactionId,
    market,
    storageLocation,
    BillingState,
    FulfillmentState,
    SerialNumber,
    LineNumber,
    resultData,
    processing,
    showReAuthConfirmation,
  } = useSelector((state) => state.updateSalesLine);
  const { validTransactionId, validLineNumber, validUpdateColumn } = useSelector((state) => state.updateSalesLine.validation);
  const createRequestPayload = () => {
    const urlParameter = constructURLParameter(salesTransactionId, market, storageLocation, dispatch);
    const dataParameter = constructData(BillingState, FulfillmentState, SerialNumber, LineNumber, dispatch);
    return {
      request: dataParameter,
      urlParameter,
    };
  };
  const updateWithConfirmation = () => {
    dispatch(resetValidation());
    const urlParameter = constructURLParameter(salesTransactionId, market, storageLocation, dispatch);
    const dataParameter = constructData(BillingState, FulfillmentState, SerialNumber, LineNumber, dispatch);

    if (!urlParameter || !dataParameter) {
      return;
    }
    dispatch(setShowReAuthConfirmation(true));
  };

  const updateSalesAction = async () => {
    const urlParameter = constructURLParameter(salesTransactionId, market, storageLocation, dispatch);
    const dataParameter = constructData(BillingState, FulfillmentState, SerialNumber, LineNumber, dispatch);
    dispatch(setProcessing(true));
    const updateResult = await updateSalesLineAction(urlParameter, dataParameter, token, dispatch);
    dispatch(setResultData(updateResult));
    dispatch(setProcessing(false));
  };
  return (
    <>
      <Row className="g-2">
        <Col md={2}>
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
        <Col md={2}>
          <FloatingLabel controlId="storageLocation" label="Storage Location">
            <Form.Select aria-label="Select" onChange={(e) => dispatch(setStorageLocation(e.target.value))}>
              <option value="Channel">Channel</option>
              <option value="HQ">HQ</option>
              <option value="All">All</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel controlId="salesTransactionId" label="Sales Transaction Id">
            <Form.Control
              placeholder="Sales Transaction Id"
              onChange={(e) => dispatch(setSalesTransactionId(e.target.value))}
              isInvalid={!validTransactionId}
              onKeyPress={(e) => handleEnterKeyPress(e, updateWithConfirmation)}
            />
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel controlId="lineNUmber" label="Line Number">
            <Form.Control
              type="number"
              placeholder="Line Number"
              onChange={(e) => dispatch(setLineNumber(e.target.value))}
              isInvalid={!validLineNumber}
              onKeyPress={(e) => handleEnterKeyPress(e, updateWithConfirmation)}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="g-2 mt-1">
        <Col md={2}>
          <FloatingLabel controlId="billingState" label="BillingState">
            <Form.Select aria-label="Select" onChange={(e) => dispatch(setBillingState(e.target.value))} isInvalid={!validUpdateColumn}>
              <option value=""> </option>
              <option value="Authorized">Authorized</option>
              <option value="Charged">Charged</option>
              <option value="PendingCharge">PendingCharge</option>
              <option value="PendingRefund">PendingRefund</option>
              <option value="Refunded">Refunded</option>
              <option value="Voided">Voided</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel controlId="fulfillmentState" label="FulfillmentState">
            <Form.Select aria-label="Select" onChange={(e) => dispatch(setFulfillmentState(e.target.value))} isInvalid={!validUpdateColumn}>
              <option value=""> </option>
              <option value="Cancelled">Cancelled</option>
              <option value="Fulfilled">Fulfilled</option>
              <option value="None">None</option>
              <option value="PendingCancel">PendingCancel</option>
              <option value="PendingFulfill">PendingFulfill</option>
              <option value="PendingReturn">PendingReturn</option>
              <option value="Returned">Returned</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel controlId="serialNumber" label="SerialNumber">
            <Form.Control
              placeholder="SerialNumber"
              onChange={(e) => dispatch(setSerialNumber(e.target.value))}
              isInvalid={!validUpdateColumn}
              onKeyPress={(e) => handleEnterKeyPress(e, updateWithConfirmation)}
            />
          </FloatingLabel>
        </Col>
        <Col md={1} className="actionButton">
          <ButtonComponent name={'Update'} clickAction={(event) => updateWithConfirmation()} />
        </Col>
      </Row>
      {processing && <InProgress />}
      {resultData && <JsonViewers name={'Update Response'} data={resultData} />}
      {showReAuthConfirmation && (
        <ConfirmationPopUp
          show={showReAuthConfirmation}
          setShow={setShowReAuthConfirmation}
          actionMethod={updateSalesAction}
          modalName={'update sales line'}
          requestData={createRequestPayload()}
        />
      )}
    </>
  );
}

export default UpdateSalesLine;
