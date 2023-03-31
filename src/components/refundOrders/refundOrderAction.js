import { refundFullOrder, refundPartialOrder, refundTaxForOrder } from '../../services/orders/orderServices';
import { setValidOrderId, setValidPuid, setValidTrackingId, updateLineItem } from '../../store/refundOrderSlice';

export const refundFullOrderAction = async (puid, orderId, lineItemDetails, token, dispatch) => {
  const resultData = await refundFullOrder(puid, orderId, lineItemDetails, token, dispatch);
  return resultData;
};

export const refundPartialOrderAction = async (puid, orderId, lineItemDetails, token, dispatch) => {
  const resultData = await refundPartialOrder(puid, orderId, lineItemDetails, token, dispatch);
  return resultData;
};

export const refundTaxOrderAction = async (puid, orderId, token, dispatch) => {
  const resultData = await refundTaxForOrder(puid, orderId, token, dispatch);
  return resultData;
};

export const validation = (request, dispatch) => {
  if (!request.puidValue || request.puidValue.trim() === '') {
    dispatch(setValidPuid(false));
  }
  if (!request.orderId || request.orderId.trim() === '') {
    dispatch(setValidOrderId(false));
    return false;
  }

  if (request.refundType === 'taxRefund') {
    // taxRefund has only PUID and ORDER ID
    return true;
  }
  if (!request.trackingId || request.trackingId.trim() === '') {
    dispatch(setValidTrackingId(false));
    return false;
  }

  let isLineItemValid = true;
  let index = 0;
  request.lineItems.map((element) => {
    if (!element.lineItemId || element.lineItemId.trim() === '') {
      dispatch(updateLineItem({ index, changedItem: 'isValid', changedValue: false }));
      isLineItemValid = false;
      return false;
    }
    index++;
    return true;
  });
  return isLineItemValid;
};
