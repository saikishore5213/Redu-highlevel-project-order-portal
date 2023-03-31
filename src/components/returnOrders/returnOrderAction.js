import { returnOrder } from '../../services/orders/orderServices';
import { setValidOrderId, setValidPuid, setValidTrackingId, updateLineItem } from '../../store/returnOrderSlice';

export const returnOrderAction = async (puid, orderId, lineItemDetails, token, dispatch) => {
  const resultData = await returnOrder(puid, orderId, lineItemDetails, token, dispatch);
  return resultData;
};

export const validation = (request, dispatch) => {
  if (!request.puidValue || request.puidValue.trim() === '') {
    dispatch(setValidPuid(false));
    return false;
  } else if (!request.orderId || request.orderId.trim() === '') {
    dispatch(setValidOrderId(false));
    return false;
  } else if (!request.trackingId || request.trackingId.trim() === '') {
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
