import { Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import { returnOrderAction, validation } from './returnOrderAction';
import { strings } from '../../util/Constants';
import InProgress from '../commonComponents/InProgress';
import JsonViewers from '../commonComponents/JsonViewers';
import ButtonComponent from '../commonComponents/ButtonComponent';
import { handleEnterKeyPress } from '../../util/helper';
import { useDispatch, useSelector } from 'react-redux';
import ReturnLineItems from './returnLineItems';
import {
  setIsPreview,
  setOrderData,
  setOrderId,
  setProcessing,
  setPuidValue,
  setShowConfirmation,
  setTrackingId,
} from '../../store/returnOrderSlice';
import '../../App.css';
import ConfirmationPopUp from '../commonComponents/ConfirmationPopUp';

const ReturnOrders = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { puidValue, orderId, orderData, processing, lineItem, showConfirmation } = useSelector((state) => state.return);
  const { isValidPuid, isValidOrderId, isValidTrackingId } = useSelector((state) => state.return.validateFields);

  const createRequestPayload = (forConfirmation = false) => {
    let requestData = {
      trackingId: lineItem.trackingId,
      isPreview: lineItem.isPreview,
      lineItems: lineItem.lineItems.map(({ lineItemNumber, isValid, ...keepAttrs }) => keepAttrs),
    };
    if (forConfirmation) {
      requestData.puidValue = puidValue;
      requestData.orderId = orderId;
    } else {
      requestData.clientContext = lineItem.clientContext;
    }
    return requestData;
  };

  const returnOrderWithConfirm = () => {
    if (!validation(createRequestPayload(true), dispatch)) {
      return;
    }
    dispatch(setShowConfirmation(true));
  };

  const returnOrder = async () => {
    dispatch(setOrderData(null));
    dispatch(setProcessing(true));
    const refundOrderStatus = await returnOrderAction(puidValue, orderId, createRequestPayload(), token, dispatch);
    if (refundOrderStatus) {
      dispatch(setOrderData(refundOrderStatus));
    } else {
      dispatch(setOrderData(strings.NoData));
    }
    dispatch(setProcessing(false));
  };

  return (
    <div className="scrollableForm">
      <Row className="g-2">
        <Col md={2}>
          <FloatingLabel controlId="puidValue" label="PUID">
            <Form.Control
              type="Number"
              onChange={(e) => dispatch(setPuidValue(e.target.value))}
              placeholder="PUID"
              required
              isInvalid={!isValidPuid}
              onKeyPress={(e) => handleEnterKeyPress(e, returnOrderWithConfirm)}
            />
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel controlId="orderId" label="Order Id">
            <Form.Control
              type="text"
              onChange={(e) => dispatch(setOrderId(e.target.value))}
              placeholder="Order Id"
              required
              isInvalid={!isValidOrderId}
              onKeyPress={(e) => handleEnterKeyPress(e, returnOrderWithConfirm)}
            />
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel controlId="trackingId" label="Tracking Id">
            <Form.Control
              type="text"
              onChange={(e) => dispatch(setTrackingId(e.target.value))}
              placeholder="Tracking Id"
              isInvalid={!isValidTrackingId}
              required
              onKeyPress={(e) => handleEnterKeyPress(e, returnOrderWithConfirm)}
            />
          </FloatingLabel>
        </Col>
        <Col md={1}>
          <FloatingLabel controlId="isPreview" label="Is Preview">
            <Form.Select aria-label="Select" onChange={(e) => dispatch(setIsPreview(e.target.value))}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
      <div className="lineItemContainer">{<ReturnLineItems returnOrder={returnOrderWithConfirm} />}</div>
      <ButtonComponent name={' Return Order'} variant="primary" clickAction={(event) => returnOrderWithConfirm()} />
      {processing && <InProgress />}
      {orderData && <JsonViewers name={'Return Response'} data={orderData} />}
      {showConfirmation && (
        <ConfirmationPopUp
          show={showConfirmation}
          setShow={setShowConfirmation}
          actionMethod={returnOrder}
          modalName={'return order'}
          requestData={createRequestPayload(true)}
        />
      )}
    </div>
  );
};

export default ReturnOrders;
