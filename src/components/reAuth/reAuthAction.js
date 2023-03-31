import { setValidSalesId } from '../../store/reAuthSlice';
import { strings } from '../../util/Constants';
import { reAuthenticationRequest } from '../../services/tools/toolsServices';

export const reAuthAction = async (salesId, market, newAuth, confirmOC, token, dispatch) => {
  if (!salesId) {
    dispatch(setValidSalesId(false));
    return false;
  }
  const resultData = await reAuthenticationRequest(salesId, market, newAuth, confirmOC, token, dispatch);
  if (resultData) {
    return { Status: ' Reauth successful for sales id ' + salesId };
  }
  return strings.Error;
};

export const validation = (salesId) => {
  if (!salesId || salesId === '') {
    return false;
  }
  return true;
};
