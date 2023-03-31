import { urls } from '../../util/Constants';

const baseUrl = urls.orderServiceBaseUrl + urls.cartServiceUrl;
const cartsbaseUrl = urls.orderServiceBaseUrl+ urls.cartsV2ServiceUrl;
const cartbaseUrl = urls.orderServiceBaseUrl+urls.cartV2ServiceUrl;

export const constructSearchCartByPuidUrl = (puid) => {
  if (!puid) {
    return;
  }
  return cartsbaseUrl + urls.searchCartByPuidUrl.replace('{puid}', puid);
};

export const constructSearchCartByCartIdUrl = (cartId) => {
  if (!cartId) {
    return;
  }
  return baseUrl + urls.searchCartByCartIdUrl.replace('{cartId}', cartId);
};

export const constructSearchCartByFriendlyIdUrl = (friendlyId) => {
  if (!friendlyId) {
    return;
  }
  return cartbaseUrl + urls.searchCartByFriendlyIdUrl.replace('{friendlyId}', friendlyId);
};
