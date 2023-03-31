import { urls } from '../../util/Constants';

const baseUrl = urls.orderServiceBaseUrl + urls.orderServiceUrl;

export const constructSearchOrderUrl = (state) => {
  if (!state || !state.puid || !state.endingNumber) {
    return;
  }
  let url =
    baseUrl.replace('{msaValue}', state.puid) +
    urls.searchOrderByPuidUrl.replace('{top}', state.endingNumber).replace('{includeBillingEvents}', state.includeBillingEvents);

  if (state.orderId && state.orderId !== '') {
    url = url + '&orderId=' + state.orderId;
  }

  if (state.shortOrderId && state.shortOrderId !== '') {
    url = url + '&friendlyId=' + state.shortOrderId;
  }
  return url;
};

export const constructCancelOrderUrl = (puid, orderId) => {
  if (!puid || !orderId) {
    return;
  }
  return baseUrl.replace('{msaValue}', puid) + urls.cancelOrderUrl.replace('{orderId}', orderId);
};

export const constructRefundFullOrPartialOrderUrl = (puid, orderId) => {
  if (!puid || !orderId) {
    return;
  }
  return baseUrl.replace('{msaValue}', puid) + urls.refundOrderUrl.replace('{orderId}', orderId);
};

export const constructTaxRefundOrderUrl = (puid, orderId) => {
  if (!puid || !orderId) {
    return;
  }
  return baseUrl.replace('{msaValue}', puid) + urls.refundTaxUrl.replace('{orderId}', orderId);
};

export const constructReturnOrderUrl = (puid, orderId) => {
  if (!puid || !orderId) {
    return;
  }
  return baseUrl.replace('{msaValue}', puid) + urls.returnTaxUrl.replace('{orderId}', orderId);
};
