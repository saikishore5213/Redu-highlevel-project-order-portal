import { PublicClientApplication } from '@azure/msal-browser';
import { loginRequest, msalConfig } from '../config/authConfig';
import { AuditCustomEvent } from '../config/telemetry/telemetryService';
import { setToken } from '../store/tokenSlice';
import { strings } from '../util/Constants';

export const fetchAction = async (completeUrl, token, type, dispatch, state = undefined, auditData = null, executionCount = 1) => {
  const options = getHeaderParameters(token, type, state);
  let responseData = await fetch(completeUrl, options)
    .then((response) => {
      if (auditData != null && response?.status) {
        auditData.responseCode = response.status;
      }
      return handleResponse(response, state);
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      return strings.Error;
    });
  // fire audit event if auditData is not undefined
  SentAuditEvent(auditData, responseData);

  if (responseData?.authenticationError && executionCount === 1) {
    const newToken = await getAccessToken();
    dispatch(setToken(newToken));
    responseData = await fetchAction(completeUrl, newToken, type, dispatch, state, auditData, 2);
  }
  return responseData;
};

const SentAuditEvent = (auditData, responseData) => {
  if (!auditData) {
    return;
  }
  if (responseData?.code) {
    auditData.errorCode = responseData.code;
    auditData.errorMessage = responseData.message ?? undefined;
  }
  if (responseData === false) {
    auditData.responseCode = 500;
  }
  AuditCustomEvent(auditData);
};

export const getHeaderParameters = (token, method, state) => {
  const headers = new Headers();
  headers.append('Authorization', 'Bearer ' + token);
  headers.append('Content-type', 'application/json');
  let options = {
    method: method,
    headers: headers,
  };
  if (state && state !== undefined) {
    options['body'] = JSON.stringify(state);
  }
  return options;
};

const handleResponse = (response, state) => {
  switch (response?.status) {
    case 204:
      return strings.NoData;
    case 400:
      return strings.Error;
    case 403:
      return strings.authError;
    default:
  }

  // to handle json error for query table json format
  if (state?.storageLocation === 'HQ') {
    return response.text();
  }
  return response.json();
};

const getAccessToken = async () => {
  const msalInstance = new PublicClientApplication(msalConfig);
  const account = msalInstance?.getAllAccounts()[0];
  const accessTokenRequest = {
    ...loginRequest,
    account: account,
  };

  const token = await msalInstance
    .acquireTokenSilent(accessTokenRequest)
    .then(function (accessTokenResponse) {
      // Acquire token silent success
      return accessTokenResponse.accessToken;
    })
    .catch(function (error) {
      //Acquire token silent failure
      console.log(error);
    });

  return token;
};
