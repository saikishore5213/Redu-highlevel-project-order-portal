import { strings } from '../../util/Constants';
import { ClearCustomerLedgerBalanceRequest, GetCustomerWithLedgerBalanceRequest } from '../../services/tools/toolsServices';
import { setResultAllData } from '../../store/customerWithLedgerBalanceSlice';

export const customerWithLedgerBalanceDataAction = async (token, dispatch) => {
  const resultData = await GetCustomerWithLedgerBalanceRequest(token, dispatch);
  let dataJson;
  if (!resultData) {
    dataJson = {
      errorCode: 'NoDataFound',
      errorMessage: strings.NoData,
    };
    return dataJson;
  }
  if (resultData?.Error) {
    dataJson = {
      errorCode: 'ServiceError',
      errorMessage: resultData.Error,
    };
    return dataJson;
  }
  dispatch(setResultAllData(resultData));
  return resultData;
};

export const clearCustomerWithLedgerBalanceDataAction = async (customer, token, dispatch) => {
  const market = customer?.substring(0, 2);
  const clearData = await ClearCustomerLedgerBalanceRequest(market, customer, token, dispatch);
  if (clearData && !clearData?.Error) {
    return clearData;
  }
};

export const validation = (customer) => {
  return customer && customer !== '';
};

export const searchCustomerAccountByMarket = (market, resultAllData) => {
  if (market && resultAllData && !resultAllData?.errorCode) {
    const tempData = resultAllData;
    if (market !== 'ALL') {
      let filteredData = tempData?.filter((cust) => cust.startsWith(market));
      return filteredData;
    }
    return tempData;
  }
};

export const searchByValue = (searchValue, marketFilteredData) => {
  if (!searchValue || searchValue === '') {
    return marketFilteredData;
  }
  if (searchValue?.length < 3) {
    return marketFilteredData;
  }

  if (marketFilteredData && !marketFilteredData.errorCode) {
    const filterData = marketFilteredData?.filter((cust) => cust.includes(searchValue.toUpperCase()));
    return filterData;
  }
};
