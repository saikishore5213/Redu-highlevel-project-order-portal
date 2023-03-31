import { fetchAction } from '../../util/fetchAction';
import { requestType } from '../../util/Constants';
import {
  constructSearchByRiskIdUrl,
  constructSearchOrderByOrderIdUrl,
  constructFulFillmentSearchUrl,
  constructMCAPIFulFillmentSearchUrl,
  constructQueryTableUrl,
  constructDeleteReservationUrl,
  constructUpdateSalesLineUrl,
  constructReAuthUrl,
  constructCustomerWithLedgerBalanceUrl,
  constructInvoiceUrl,
  constructClearCustomerLedgerBalanceUrl,
  constructGetRmaByRmaIdUrl,
  constructQueryADLSTableUrl,
  constructInvoiceDocumentUrl,
} from './helper';
import { AuditTelemetryData } from '../../config/telemetry/telemetryService';

export const searchOrdersByOrderId = async (state, token, dispatch) => {
  const actionUrl = constructSearchOrderByOrderIdUrl(state.orderId);
  const orderData = await fetchAction(actionUrl, token, requestType.Post, dispatch);
  return orderData;
};

export const searchOrdersByRiskId = async (state, token, dispatch) => {
  const actionUrl = constructSearchByRiskIdUrl(state.riskId);
  const orderData = await fetchAction(actionUrl, token, requestType.Get, dispatch);
  return orderData;
};

export const searchOCFulfillment = async (orderId, isTestOrder, token, dispatch) => {
  const actionUrl = constructFulFillmentSearchUrl(orderId, isTestOrder);
  const ocFulfillmentData = await fetchAction(actionUrl, token, requestType.Get, dispatch);
  return ocFulfillmentData;
};

export const searchMCAPIFulfillment = async (fulfillmentId, isTestOrder, token, dispatch) => {
  const actionUrl = constructMCAPIFulFillmentSearchUrl(fulfillmentId, isTestOrder);
  const ocFulfillmentData = await fetchAction(actionUrl, token, requestType.Get, dispatch);
  return ocFulfillmentData;
};

export const queryTableSearch = async (state, market, token, dispatch) => {
  const actionUrl = constructQueryTableUrl(market);
  const queryTableData = await fetchAction(actionUrl, token, requestType.Post, dispatch, state);
  if (state?.storageLocation === 'HQ') {
    try {
      const regex = /\,(?=\s*?[\}\]])/g; // eslint-disable-line
      const correctData = queryTableData?.replace(regex, '');
      if (correctData) {
        return JSON.parse(correctData);
      }
    } catch (ex) {
      // not required to throw this error
    }
  }
  return queryTableData;
};

export const queryADLSTableSearch = async (state, token, dispatch) => {
  const actionUrl = constructQueryADLSTableUrl();
  const queryADLSTableData = await fetchAction(actionUrl, token, requestType.Post, dispatch, state);
  return queryADLSTableData;
};

export const deleteReservationRequest = async (reservationId, market, token, dispatch) => {
  const actionUrl = constructDeleteReservationUrl(reservationId, market);
  const auditData = new AuditTelemetryData(reservationId, 'DeleteReservation', null);
  const deleteReservationResponse = await fetchAction(actionUrl, token, requestType.Post, dispatch, null, auditData);
  return deleteReservationResponse;
};

export const updateSalesLineItemRequest = async (state, data, token, dispatch) => {
  const actionUrl = constructUpdateSalesLineUrl(state);
  const auditData = new AuditTelemetryData(state.salesTransactionId, 'UpdateSalesLineItem', data);
  const updateSalesLineItemResponse = await fetchAction(actionUrl, token, requestType.Post, dispatch, data, auditData);
  return updateSalesLineItemResponse;
};

export const reAuthenticationRequest = async (salesId, market, newAuth, confirmOC, token, dispatch) => {
  const actionUrl = constructReAuthUrl(salesId, market, newAuth, confirmOC);
  const auditData = new AuditTelemetryData(salesId, 'ReAuthorization', { newAuthRequired: newAuth }, { confirmOC: confirmOC });
  const deleteReservationResponse = await fetchAction(actionUrl, token, requestType.Post, dispatch, null, auditData);
  return deleteReservationResponse;
};

export const GetCustomerWithLedgerBalanceRequest = async (token, dispatch) => {
  const actionUrl = constructCustomerWithLedgerBalanceUrl();
  const customerWithLedgerBalanceData = await fetchAction(actionUrl, token, requestType.Get, dispatch);
  return customerWithLedgerBalanceData;
};

export const salesInvoiceRequest = async (state, salesOrderId, market, forceReInvoice, token, dispatch) => {
  const actionUrl = constructInvoiceUrl(salesOrderId, market, forceReInvoice);
  const auditData = new AuditTelemetryData(salesOrderId, 'InvoiceSalesLines', { ...state, forceReInvoice });
  const salesInvoiceResponse = await fetchAction(actionUrl, token, requestType.Post, dispatch, state, auditData);
  return salesInvoiceResponse;
};

export const ClearCustomerLedgerBalanceRequest = async (market, customerAccount, token, dispatch) => {
  const actionUrl = constructClearCustomerLedgerBalanceUrl(market, customerAccount);
  const auditData = new AuditTelemetryData(customerAccount, 'ClearCustomerLedgerBalance', { market, customerAccount });
  const clearCustomerLedgerBalanceResponse = await fetchAction(actionUrl, token, requestType.Post, dispatch, null, auditData);
  return clearCustomerLedgerBalanceResponse;
};

export const GetRmaByRmaId = async (rmaId, token, dispatch) => {
  const actionUrl = constructGetRmaByRmaIdUrl(rmaId);
  const rmaResponse = await fetchAction(actionUrl, token, requestType.Get, dispatch);
  return rmaResponse;
};

export const invoiceDocumentRequest = async (state, documetId, token, dispatch) => {
  const actionUrl = constructInvoiceDocumentUrl(documetId);
  const invoicDocumenteResponse = await fetchAction(actionUrl, token, requestType.Get, dispatch, state);
  return invoicDocumenteResponse;
};
