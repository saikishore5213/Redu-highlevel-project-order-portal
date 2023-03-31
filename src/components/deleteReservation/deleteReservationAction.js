import { strings } from '../../util/Constants';
import { deleteReservationRequest } from '../../services/tools/toolsServices';

export const deleteReservationAction = async (reservationId, market, token, dispatch) => {
  const resultData = await deleteReservationRequest(reservationId, market, token, dispatch);
  if (resultData) {
    return resultData;
  } else {
    return strings.NoData;
  }
};

export const validation = (reservationId) => {
  return reservationId && reservationId !== '';
};
