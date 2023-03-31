import { createSlice } from '@reduxjs/toolkit';

export const deleteReservationSlice = createSlice({
  name: 'deleteReservation',
  initialState: {
    reservationId: '',
    market: 'us',
    resultData: null,
    processing: false,
    validReservationId: true,
    showDeleteReservationConfirmation: false,
  },
  reducers: {
    setReservationId: (state, action) => {
      state.reservationId = action.payload.replaceAll('"', '');
      if (action.payload !== '') {
        state.validReservationId = true;
      } else {
        state.validReservationId = false;
      }
    },
    setMarket: (state, action) => {
      state.market = action.payload;
    },
    setResultData: (state, action) => {
      state.resultData = action.payload;
    },
    setProcessing: (state, action) => {
      state.processing = action.payload;
    },
    setValidReservationId: (state, action) => {
      state.validReservationId = action.payload;
    },
    setShowDeleteReservationConfirmation: (state, action) => {
      state.showDeleteReservationConfirmation = action.payload;
    },
  },
});

export const { setReservationId, setMarket, setResultData, setProcessing, setValidReservationId, setShowDeleteReservationConfirmation } =
  deleteReservationSlice.actions;
export default deleteReservationSlice.reducer;
