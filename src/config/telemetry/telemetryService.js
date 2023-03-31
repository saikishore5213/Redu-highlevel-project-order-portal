import store from '../../store/store';
import { getAppInsights } from './appInsight';
import('@microsoft/applicationinsights-web');

export const PageViewAction = (pageName) => {
  const properties = {
    userName: GetUserName(),
    refUri: getPathFromPageName(pageName),
  };
  const appInsight = getAppInsights();
  appInsight.trackPageView({ name: pageName, properties });
};

const getPathFromPageName = (pageName) => {
  const name = pageName?.trim().replace(' ', '');
  return '/' + name.charAt(0).toLowerCase() + name.slice(1);
};

export const AuditCustomEvent = (auditData) => {
  const customEvent = {
    name: 'AuditEvent',
  };

  const properties = {
    userName: GetUserName(),
    operationName: auditData.operationName,
    orderId: auditData.orderId,
    resultStatus: auditData.responseCode,
  };
  if (auditData.operationData) {
    properties['requestDetails'] = auditData.operationData;
  }
  if (auditData.errorCode) {
    properties['errorCode'] = auditData.errorCode;
    properties['errorMessage'] = auditData.errorMessage;
  }

  const appInsight = getAppInsights();
  appInsight.trackEvent(customEvent, properties);
};

const GetUserName = () => {
  const state = store.getState();
  return state?.token?.userName;
};

export class AuditTelemetryData {
  constructor(orderId, operationName, operationData) {
    this.orderId = orderId;
    this.operationName = operationName;
    this.operationData = operationData;
  }
}
