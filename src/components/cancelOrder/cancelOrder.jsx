import { Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import { cancelOrderAction, validation } from './cancelOrderAction';
import { strings } from '../../util/Constants';
import InProgress from '../commonComponents/InProgress';
import JsonViewers from '../commonComponents/JsonViewers';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderId, setPuidValue, setTrackingId, setResultData, setProcessing, setShowConfirmation } from '../../store/cancelOrderSlice';
import CreateLineItems from './createLineItems';
import { handleEnterKeyPress } from '../../util/helper';
import ButtonComponent from '../commonComponents/ButtonComponent';
import ConfirmationPopUp from '../commonComponents/ConfirmationPopUp';

function CancelOrder() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { puidValue, orderId, trackingId, resultData, processing, lineItem, showConfirmation } = useSelector((state) => state.cancelOrder);
  const { isValidPuid, isValidOrderId, isValidTrackingId } = useSelector((state) => state.cancelOrder.validateFields);
  const createRequestPayload = (forConfirmation = false) => {
    let requestData = {
      trackingId: trackingId,
      lineItems: lineItem.lineItems.map(({ lineItemNumber, isValid, ...keepAttrs }) => keepAttrs),
    };
    if (forConfirmation) {
      requestData.puid = puidValue;
      requestData.orderId = orderId;
    }
    return requestData;
  };
  const cancelWithConfirm = () => {
    if (!validation(puidValue, orderId, trackingId, lineItem, dispatch)) {
      return;
    }
    dispatch(setShowConfirmation(true));
  };

  const cancelOrder = async () => {
    dispatch(setResultData(null));
    dispatch(setProcessing(true));
    const requestPayLoad = createRequestPayload();
    const cancelOrderStatus = await cancelOrderAction(puidValue, orderId, requestPayLoad, token, dispatch);
    if (cancelOrderStatus) {
      dispatch(setResultData(cancelOrderStatus));
    } else {
      dispatch(setResultData(strings.NoData));
    }
    dispatch(setProcessing(false));
  };

  return (
    <>
      <Row className="g-2">
        <Col md={2}>
          <FloatingLabel controlId="puidValue" label="PUID">
            <Form.Control
              type="Number"
              onChange={(e) => dispatch(setPuidValue(e.target.value))}
              placeholder="PUID"
              required
              isInvalid={!isValidPuid}
              onKeyPress={(e) => handleEnterKeyPress(e, cancelWithConfirm)}
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
              onKeyPress={(e) => handleEnterKeyPress(e, cancelWithConfirm)}
            />
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel controlId="trackingId" label="Tracking Id">
            <Form.Control
              type="text"
              onChange={(e) => dispatch(setTrackingId(e.target.value))}
              placeholder="Order Id"
              required
              isInvalid={!isValidTrackingId}
              onKeyPress={(e) => handleEnterKeyPress(e, cancelWithConfirm)}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <div className="lineItemContainer">
        <CreateLineItems cancelWithConfirm={cancelWithConfirm} />
      </div>
      <ButtonComponent name={'Cancel Order'} clickAction={(event) => cancelWithConfirm()} />
      {processing && <InProgress />}
      {resultData && <JsonViewers name={'Cancel Response'} data={resultData} />}
      {showConfirmation && (
        <ConfirmationPopUp
          show={showConfirmation}
          setShow={setShowConfirmation}
          actionMethod={cancelOrder}
          modalName={'cancel order'}
          requestData={createRequestPayload(true)}
        />
      )}
    </>
  );
}

export default CancelOrder;
