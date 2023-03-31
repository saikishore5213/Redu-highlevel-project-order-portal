import { strings } from '../../util/Constants';
import { setOrderData, setCollapsed, setDataValidated } from '../../store/searchOrderSlice';
import { queryTableSearch, searchOrdersByOrderId, searchOrdersByRiskId } from '../../services/tools/toolsServices';
import { searchOrdersByPuid } from '../../services/orders/orderServices';

export const searchOrders = async (stateData, searchBy, market, token, dispatch) => {
  const isSearchByOrderIdOnly = searchBy === 'orderId';
  const isSearchByRiskIdOnly = searchBy === 'riskId';
  const isSearchByFriendlyIdOnly = searchBy === 'friendlyId';

  if (isSearchByFriendlyIdOnly && !stateData?.shortOrderId) {
    dispatch(setDataValidated({ type: 'validFriendlyId', valid: false }));
    return;
  }
  if (isSearchByOrderIdOnly && !stateData?.orderId) {
    dispatch(setDataValidated({ type: 'validOrderId', valid: false }));
    return;
  }
  if (isSearchByRiskIdOnly && !stateData?.riskId) {
    dispatch(setDataValidated({ type: 'validRiskId', valid: false }));
    return;
  }
  if (!isSearchByOrderIdOnly && !isSearchByRiskIdOnly && !isSearchByFriendlyIdOnly) {
    if (!stateData?.puid || stateData.puid.length < 15) {
      dispatch(setDataValidated({ type: 'validPuid', valid: false }));
      return;
    }
  }
  dispatch(setOrderData(null));
  let dataJSON;
  if (isSearchByOrderIdOnly) {
    dataJSON = await searchOrdersByOrderId(stateData, token, dispatch);
    dataJSON = await searchOrdersByPuidAfterSearchByOrderId(stateData, dataJSON, token, dispatch);
  } else if (isSearchByRiskIdOnly) {
    dataJSON = await searchOrdersByRiskId(stateData, token, dispatch);
    dataJSON = await searchOrdersByPuidAfterSearchByOrderId(stateData, dataJSON, token, dispatch);
  } else if (isSearchByFriendlyIdOnly) {
    const queryTableResult = await searchOrderByFriendlyId(stateData, market, token, dispatch);
    if (queryTableResult?.orderId) {
      if (queryTableResult?.puid) {
        // We can hit searchOrder directly if PUID available
        dataJSON = await searchOrdersByPuidAfterSearchByOrderId(stateData, queryTableResult, token, dispatch);
      } else {
        dataJSON = await searchOrdersByOrderId(dataJSON, token, dispatch);
        dataJSON = await searchOrdersByPuidAfterSearchByOrderId(stateData, dataJSON, token, dispatch);
      }
    }
  } else {
    const orderData = await searchOrdersByPuid(stateData, token, dispatch);
    dataJSON = orderData['items'];
  }

  if (dataJSON) {
    if (dataJSON.length === 1) {
      dispatch(setCollapsed(4));
    } else {
      dispatch(setCollapsed(1));
    }
    dispatch(setOrderData(dataJSON));
  } else {
    dispatch(setOrderData(strings.NoData));
  }
};

const searchOrderByFriendlyId = async (stateData, market, token, dispatch) => {
  const friendlyId = stateData.shortOrderId;
  if (!friendlyId) {
    return;
  }
  const queryTableRequestObj = makeQueryTableRequest(friendlyId);
  const returnData = await queryTableSearch(queryTableRequestObj, market, token, dispatch);
  let returnObj = {};
  if (returnData?.length > 0 && returnData[0]?.TRANSACTIONID) {
    returnObj['orderId'] = returnData[0].TRANSACTIONID;
  }
  if (returnData?.length > 0 && returnData[0]?.PUID) {
    returnObj['puid'] = returnData[0].PUID;
  }
  return returnObj;
};

const searchOrdersByPuidAfterSearchByOrderId = async (stateData, searchByOrderIdResult, token, dispatch) => {
  const puid = searchByOrderIdResult.puid + '';
  if (!puid || puid === null || puid === 0) {
    return searchByOrderIdResult;
  }

  // constructing the request as if the user selected the PUID for searching
  const orderId = searchByOrderIdResult.orderId;
  const endingNumber = stateData.endingNumber;
  const includeBillingEvents = stateData.includeBillingEvents;
  const searchData = { puid, orderId, endingNumber, includeBillingEvents };
  const orderData = await searchOrdersByPuid(searchData, token, dispatch);

  if (!orderData || orderData.Error || orderData.code) {
    return searchByOrderIdResult;
  }
  return orderData['items'];
};

const makeQueryTableRequest = (friendlyId) => {
  return {
    tableName: 'EXT.MSE_RETAILTRANSACTIONTABLE',
    storageLocation: 'Channel',
    filterBy: 'FRIENDLYIDV2',
    filterValue: friendlyId,
    top: 10,
  };
};
