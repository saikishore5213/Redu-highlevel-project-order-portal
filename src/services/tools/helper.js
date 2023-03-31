import { urls } from '../../util/Constants';

const baseUrl = urls.orderServiceBaseUrl + urls.toolsServiceUrl;

export const constructSearchOrderByOrderIdUrl = (transactionId) => {
  if (!transactionId) {
    return;
  }
  return baseUrl + urls.searchOrderByOrderIdUrl.replace('{transactionId}', transactionId);
};

export const constructSearchByRiskIdUrl = (riskId) => {
  if (!riskId) {
    return;
  }
  return baseUrl + urls.searchOrderByRiskIdUrl.replace('{riskId}', riskId);
};

export const constructFulFillmentSearchUrl = (orderId, isTestOrder) => {
  if (!orderId) {
    return;
  }
  return baseUrl + urls.getFulfillmentEndPoint.replace('{orderId}', orderId).replace('{isTestOrder}', isTestOrder);
};

export const constructMCAPIFulFillmentSearchUrl = (fulfillmentId, isTestOrder) => {
  if (!fulfillmentId) {
    return;
  }
  return baseUrl + urls.getMCAPIFulfillmentEndPoint.replace('{fulfillmentId}', fulfillmentId).replace('{isTestOrder}', isTestOrder);
};

export const constructQueryTableUrl = (market) => {
  if (!market) {
    return;
  }
  return baseUrl + urls.queryTableUrl.replace('{market}', market);
};

export const constructQueryADLSTableUrl = () => {
  return baseUrl + urls.queryADLSTableUrl;
};

export const constructDeleteReservationUrl = (reservationId, market) => {
  if (!market) {
    return;
  }
  return baseUrl + urls.deleteReservationUrl.replace('{reservationId}', reservationId).replace('{market}', market);
};

export const constructUpdateSalesLineUrl = (state) => {
  if (!state || !state.salesTransactionId || !state.market || !state.storageLocation) {
    return;
  }
  return (
    baseUrl +
    urls.updateSalesLineUrl
      .replace('{salesTransactionId}', state.salesTransactionId)
      .replace('{market}', state.market)
      .replace('{storageLocation}', state.storageLocation)
  );
};

export const constructReAuthUrl = (salesId, market, newAuth, confirmOC) => {
  if (!salesId) {
    return;
  }
  return (
    baseUrl + urls.reAuthUrl.replace('{salesId}', salesId).replace('{market}', market).replace('{newAuth}', newAuth).replace('{confirmOC}', confirmOC)
  );
};

export const constructInvoiceUrl = (salesOrderId, market, forceReinvoice) => {
  if (!salesOrderId) {
    return;
  }
  return baseUrl + urls.invoiceUrl.replace('{salesOrderId}', salesOrderId).replace('{market}', market).replace('{forceReinvoice}', forceReinvoice);
};

export const constructCustomerWithLedgerBalanceUrl = () => {
  return baseUrl + urls.customerWithLedgerBalanceUrl;
};

export const constructGetRmaByRmaIdUrl = (rmaId) => {
  return baseUrl + urls.searchRmaId.replace('{rmaId}', rmaId);
};

export const constructClearCustomerLedgerBalanceUrl = (market, customerAccount) => {
  return baseUrl + urls.clearCustomerLedgerBalanceUrl.replace('{market}', market).replace('{customerAccount}', customerAccount);
};

export const constructInvoiceDocumentUrl = (documentId) => {
  return baseUrl + urls.invoiceDocumentUrl.replace('{documentId}', documentId);
};
