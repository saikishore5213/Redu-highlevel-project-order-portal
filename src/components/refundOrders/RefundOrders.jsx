import { Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import { refundFullOrderAction, refundPartialOrderAction, refundTaxOrderAction, validation } from './refundOrderAction';
import { strings } from '../../util/Constants';
import InProgress from '../commonComponents/InProgress';
import JsonViewers from '../commonComponents/JsonViewers';
import ButtonComponent from '../commonComponents/ButtonComponent';
import { handleEnterKeyPress } from '../../util/helper';
import { useDispatch, useSelector } from 'react-redux';
import RefundLineItems from './refundLineItems';
import {
  setOrderData,
  setProcessing,
  setRefundType,
  setShowConfirmation,
  setPuidValue,
  setOrderId,
  setTrackingId,
  setIsPreview,
} from '../../store/refundOrderSlice';
import ConfirmationPopUp from '../commonComponents/ConfirmationPopUp';
import '../../App.css';

const RefundOrders = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { puidValue, orderId, orderData, processing, lineItem, showConfirmation, isPartialRefund, isTaxRefund, refundType } = useSelector(
    (state) => state.refund,
  );
  const { isValidPuid, isValidOrderId, isValidTrackingId } = useSelector((state) => state.refund.validateFields);

  const createRequestPayload = (forConfirmation = false) => {
    let requestData = {};
    if (refundType === 'partialRefund') {
      requestData = {
        trackingId: lineItem.trackingId,
        isPreview: lineItem.isPreview,
        lineItems: lineItem.lineItems.map(({ lineItemNumber, isValid, RefundAmount, ...keepAttrs }) => {
          if (RefundAmount > 0) {
            return { ...keepAttrs, RefundAmount };
          }
          return keepAttrs;
        }),
      };
    } else if (refundType === 'fullRefund') {
      requestData = {
        trackingId: lineItem.trackingId,
        isPreview: lineItem.isPreview,
        lineItems: lineItem.lineItems.map(({ lineItemNumber, isValid, RefundAmount, ...keepAttrs }) => keepAttrs),
      };
    }

    if (forConfirmation) {
      requestData.puidValue = puidValue;
      requestData.orderId = orderId;
      requestData.refundType = refundType;
    } else {
      requestData.clientContext = lineItem.clientContext;
      requestData.revokeEntitlementOnFullRefund = false;
    }
    return requestData;
  };

  const refundOrderConfirmation = () => {
    if (!validation(createRequestPayload(true), dispatch)) {
      return;
    }
    dispatch(setShowConfirmation(true));
  };

  const refundOrder = async () => {
    dispatch(setOrderData(null));
    dispatch(setProcessing(true));
    let refundOrderStatus;
    if (isTaxRefund) {
      refundOrderStatus = await refundTaxOrderAction(puidValue, orderId, token, dispatch);
    } else if (isPartialRefund) {
      const requestData = createRequestPayload();
      refundOrderStatus = await refundPartialOrderAction(puidValue, orderId, requestData, token, dispatch);
    } else {
      const requestData = createRequestPayload();
      refundOrderStatus = await refundFullOrderAction(puidValue, orderId, requestData, token, dispatch);
    }
    if (refundOrderStatus) {
      dispatch(setOrderData(refundOrderStatus));
    } else {
      dispatch(setOrderData(strings.NoData));
    }
    dispatch(setProcessing(false));
  };

  return (
    <>
      <Row className="g-2">
        <Col md={2}>
          <FloatingLabel controlId="TypeOfRefund" label="Type Of Refund">
            <Form.Select aria-label="Select" onChange={(e) => dispatch(setRefundType(e.target.value))}>
              <option value="fullRefund">Full Refund</option>
              <option value="partialRefund">Partial Refund</option>
              <option value="taxRefund">Tax Refund</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel controlId="puidValue" label="PUID">
            <Form.Control
              type="Number"
              onChange={(e) => dispatch(setPuidValue(e.target.value))}
              placeholder="PUID"
              isInvalid={!isValidPuid}
              onKeyPress={(e) => handleEnterKeyPress(e, refundOrderConfirmation)}
            />
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel controlId="orderId" label="Order Id">
            <Form.Control
              type="text"
              onChange={(e) => dispatch(setOrderId(e.target.value))}
              placeholder="Order Id"
              onKeyPress={(e) => handleEnterKeyPress(e, refundOrderConfirmation)}
              isInvalid={!isValidOrderId}
            />
          </FloatingLabel>
        </Col>
        {!isTaxRefund && (
          <Col md={2}>
            <FloatingLabel controlId="trackingId" label="Tracking Id">
              <Form.Control
                type="text"
                onChange={(e) => dispatch(setTrackingId(e.target.value))}
                placeholder="Order Id"
                onKeyPress={(e) => handleEnterKeyPress(e, refundOrderConfirmation)}
                isInvalid={!isValidTrackingId}
              />
            </FloatingLabel>
          </Col>
        )}
        {!isTaxRefund && (
          <Col md={1}>
            <FloatingLabel controlId="isPreview" label="Is Preview">
              <Form.Select aria-label="Select" onChange={(e) => dispatch(setIsPreview(e.target.value))}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        )}
      </Row>
      {!isTaxRefund && <div className="lineItemContainer">{<RefundLineItems refundOrder={refundOrderConfirmation} />}</div>}
      <div className={isTaxRefund ? 'taxRefundButton' : ''}>
        <ButtonComponent name={' Refund Order'} variant="primary" clickAction={(event) => refundOrderConfirmation()} />
      </div>
      {processing && <InProgress />}
      <div className="jsonOverFlowForMultiLayer">{orderData && <JsonViewers name={'Refund Response'} data={orderData} />}</div>
      {showConfirmation && (
        <ConfirmationPopUp
          show={showConfirmation}
          setShow={setShowConfirmation}
          actionMethod={refundOrder}
          modalName={'refund order'}
          requestData={createRequestPayload(true)}
        />
      )}
    </>
  );
};

export default RefundOrders;
