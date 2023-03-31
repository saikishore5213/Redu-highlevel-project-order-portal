import { cancelOrderRequest } from '../../services/orders/orderServices';
import { setValidOrderId, setValidPuid, setValidTrackingId, updateLineItem } from '../../store/cancelOrderSlice';

export const cancelOrderAction = async (puid, orderId, requestPayLoad, token, dispatch) => {
  const resultData = cancelOrderRequest(puid, orderId, requestPayLoad, token, dispatch);
  return resultData;
};

export const validation = (puidValue, orderId, trackingId, lineItem, dispatch) => {
  if (!puidValue || puidValue.trim() === '') {
    dispatch(setValidPuid(false));
    return false;
  } else if (!orderId || orderId.trim() === '') {
    dispatch(setValidOrderId(false));
    return false;
  } else if (!trackingId || trackingId.trim() === '') {
    dispatch(setValidTrackingId(false));
    return false;
  }
  let isLineItemValid = true;
  let index = 0;
  lineItem.lineItems.map((element) => {
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
