import { updateSalesLineItemRequest } from '../../services/tools/toolsServices';
import { setValidation } from '../../store/updateSalesLineSlice';
import { strings } from '../../util/Constants';

export const updateSalesLineAction = async (state, data, token, dispatch) => {
  const orderData = await updateSalesLineItemRequest(state, data, token, dispatch);
  if (orderData && orderData === true) {
    return strings.updateSalesLineSuccessResponse;
  }
  return orderData;
};

export const constructData = (BillingState, FulfillmentState, SerialNumber, LineNumber, dispatch) => {
  let data = {};
  let validated = true;
  let validUpdateFiend = false;
  if (BillingState && BillingState.trim() !== '') {
    data.BillingState = BillingState.trim();
    validUpdateFiend = true;
  }
  if (FulfillmentState && FulfillmentState.trim() !== '') {
    data.FulfillmentState = FulfillmentState.trim();
    validUpdateFiend = true;
  }
  if (SerialNumber && SerialNumber.trim() !== '') {
    data.SerialNumber = SerialNumber.trim();
    validUpdateFiend = true;
  }
  if (LineNumber && LineNumber.trim() !== '') {
    data.LineNumber = LineNumber.trim();
  } else {
    dispatch(setValidation({ column: 'LineNumber', value: false }));
    validated = false;
  }
  if (!validUpdateFiend) {
    dispatch(setValidation({ column: 'updateColumn', value: false }));
    validated = false;
  }
  if (!validated) {
    return false;
  }
  const salesLines = [data];
  return { salesLines };
};

export const constructURLParameter = (salesTransactionId, market, storageLocation, dispatch) => {
  let state = {};
  let validated = true;
  if (salesTransactionId.trim() !== '') {
    state.salesTransactionId = salesTransactionId.trim();
  } else {
    dispatch(setValidation({ column: 'salesTransactionId', value: false }));
    validated = false;
  }
  if (market.trim() !== '') {
    state.market = market.trim();
  }
  if (storageLocation.trim() !== '') {
    state.storageLocation = storageLocation.trim();
  }
  if (validated) {
    return state;
  } else {
    return false;
  }
};
