import { strings } from '../../util/Constants';
import { setCartData, setCollapsed, setIsDataValidated } from '../../store/searchCartSlice';
import { searchCartByPuid, searchCartByCartId, searchCartByFriendlyId } from '../../services/cartExport/cartExportServices';

export const searchCartAction = async (searchBy, searchValue, dispatch, token) => {
  if (!searchValue || searchValue === '') {
    dispatch(setIsDataValidated(false));
    return;
  }
  dispatch(setCartData(null));
  let cartSearchData = '';
  if (searchBy === 'puid') {
    cartSearchData = await searchCartByPuid(searchValue, token, dispatch);
  } else if (searchBy === 'cartId') {
    cartSearchData = await searchCartByCartId(searchValue, token, dispatch);
  } else if (searchBy === 'friendlyId') {
    cartSearchData = await searchCartByFriendlyId(searchValue, token, dispatch);
  } else {
    return;
  }

  if (cartSearchData) {
    // if the cartData is an array of length 1 or
    // length is not a property for a single cart response
    if (cartSearchData.length === 1 || !cartSearchData.length) {
      dispatch(setCollapsed(4));
    } else {
      dispatch(setCollapsed(1));
    }
    dispatch(setCartData(cartSearchData));
  } else {
    dispatch(setCartData(strings.NoData));
  }
};
