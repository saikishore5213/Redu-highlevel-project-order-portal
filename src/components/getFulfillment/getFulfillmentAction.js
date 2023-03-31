import { strings } from '../../util/Constants';
import { setFulfillmentData, setIsDataValidated } from '../../store/ocFulfillmentSlice';
import { GetRmaByRmaId, searchOCFulfillment } from '../../services/tools/toolsServices';

export const searchFulfillmentDataAction = async (orderId, isTestOrder, rmaId, searchBy, token, dispatch) => {
  if (searchBy === 'Order Id' && (!orderId || orderId.length < 15)) {
    dispatch(setIsDataValidated(false));
    return;
  }
  if (searchBy === 'RMA Id' && !rmaId) {
    dispatch(setIsDataValidated(false));
    return;
  }
  dispatch(setFulfillmentData(null));

  let orderData;
  if (searchBy === 'Order Id') {
    orderData = await searchOCFulfillment(orderId, isTestOrder, token, dispatch);
  } else {
    orderData = await GetRmaByRmaId(rmaId, token, dispatch);
  }

  if (orderData) {
    dispatch(setFulfillmentData(orderData));
  } else {
    setFulfillmentData(strings.NoData);
  }
};
