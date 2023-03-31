import { fetchAction } from '../../util/fetchAction';
import { requestType } from '../../util/Constants';
import { constructSearchCartByCartIdUrl, constructSearchCartByFriendlyIdUrl, constructSearchCartByPuidUrl } from './helper';

export const searchCartByPuid = async (puid, token, dispatch) => {
  const actionUrl = constructSearchCartByPuidUrl(puid);
  const cartData = await fetchAction(actionUrl, token, requestType.Get, dispatch);
  return cartData;
};

export const searchCartByCartId = async (cartId, token, dispatch) => {
  const actionUrl = constructSearchCartByCartIdUrl(cartId);
  const cartData = await fetchAction(actionUrl, token, requestType.Get, dispatch);
  return cartData;
};

export const searchCartByFriendlyId = async (friendlyId, token, dispatch) => {
  const actionUrl = constructSearchCartByFriendlyIdUrl(friendlyId);
  const cartData = await fetchAction(actionUrl, token, requestType.Get, dispatch);
  return cartData;
};
