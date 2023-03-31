import { setFulfillmentData, setIsDataValidated } from '../../store/MCAPIFulfillmentSlice';
import { strings } from '../../util/Constants';
import { searchMCAPIFulfillment } from '../../services/tools/toolsServices';

export const searchFulfillmentDataAction = async (fulfillmentId, isTestOrder, token, dispatch) => {
  if (!fulfillmentId || fulfillmentId.length < 15) {
    dispatch(setIsDataValidated(false));
    return;
  }
  dispatch(setFulfillmentData(null));
  const orderData = await searchMCAPIFulfillment(fulfillmentId, isTestOrder, token, dispatch);
  if (orderData) {
    dispatch(setFulfillmentData(orderData));
  } else {
    dispatch(setFulfillmentData(strings.NoData));
  }
};
