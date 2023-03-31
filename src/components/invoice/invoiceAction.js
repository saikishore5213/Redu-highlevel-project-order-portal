import { setValidSalesId } from '../../store/invoiceSlice';
import { setValidSalesLineIds } from '../../store/invoiceSlice';
import { strings } from '../../util/Constants';
import { salesInvoiceRequest } from '../../services/tools/toolsServices';

export const invoiceAction = async (state, salesOrderId, market, forceReinvoice, token, dispatch) => {
  if (!salesOrderId) {
    dispatch(setValidSalesId(false));
    return false;
  }
  if (!state.length || state[0] === '') {
    dispatch(setValidSalesLineIds(false));
    return false;
  }

  const resultData = await salesInvoiceRequest(state, salesOrderId, market, forceReinvoice, token, dispatch);
  if (resultData) {
    if (resultData.code === 'ServiceError') {
      return strings.Error;
    }
    return { Status: ' Invoice successful for sales order id ' + salesOrderId };
  }
  return strings.Error;
};
export const salesOrderValidation = (salesOrderId) => {
  return salesOrderId && salesOrderId !== '';
};
export const salesLineValidation = (salesLineIds) => {
  return salesLineIds && salesLineIds[0] && salesLineIds[0] !== '';
};
