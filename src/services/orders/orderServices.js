import {
  constructCancelOrderUrl,
  constructRefundFullOrPartialOrderUrl,
  constructReturnOrderUrl,
  constructSearchOrderUrl,
  constructTaxRefundOrderUrl,
} from './helper';
import { fetchAction } from '../../util/fetchAction';
import { requestType } from '../../util/Constants';
import { AuditTelemetryData } from '../../config/telemetry/telemetryService';

export const searchOrdersByPuid = async (state, token, dispatch) => {
  const actionUrl = constructSearchOrderUrl(state);
  const orderData = await fetchAction(actionUrl, token, requestType.Get, dispatch);
  return orderData;
};

export const cancelOrderRequest = async (puid, orderId, requestPayload, token, dispatch) => {
  const actionUrl = constructCancelOrderUrl(puid, orderId, requestPayload);
  const auditData = new AuditTelemetryData(orderId, 'CancelOrder', requestPayload);
  const cancelResponse = await fetchAction(actionUrl, token, requestType.Post, dispatch, requestPayload, auditData);
  return cancelResponse;
};

export const refundFullOrder = async (puid, orderId, lineItemDetails, token, dispatch) => {
  const actionUrl = constructRefundFullOrPartialOrderUrl(puid, orderId);
  const auditData = new AuditTelemetryData(orderId, 'FullRefund', lineItemDetails);
  const refundResponse = await fetchAction(actionUrl, token, requestType.Post, dispatch, lineItemDetails, auditData);
  return refundResponse;
};

export const refundPartialOrder = async (puid, orderId, lineItemDetails, token, dispatch) => {
  const actionUrl = constructRefundFullOrPartialOrderUrl(puid, orderId);
  const auditData = new AuditTelemetryData(orderId, 'PartialRefund', lineItemDetails);
  const refundResponse = await fetchAction(actionUrl, token, requestType.Post, dispatch, lineItemDetails, auditData);
  return refundResponse;
};

export const refundTaxForOrder = async (puid, orderId, token, dispatch) => {
  const actionUrl = constructTaxRefundOrderUrl(puid, orderId);
  const auditData = new AuditTelemetryData(orderId, 'TaxRefund', null);
  const refundResponse = await fetchAction(actionUrl, token, requestType.Post, dispatch, null, auditData);
  return refundResponse;
};

export const returnOrder = async (puid, orderId, lineItemDetails, token, dispatch) => {
  const actionUrl = constructReturnOrderUrl(puid, orderId);
  const auditData = new AuditTelemetryData(orderId, 'ReturnOrder', lineItemDetails);
  const refundResponse = await fetchAction(actionUrl, token, requestType.Post, dispatch, lineItemDetails, auditData);
  return refundResponse;
};
