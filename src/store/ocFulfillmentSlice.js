import { createSlice } from '@reduxjs/toolkit';

export const ofFulfillmentSlice = createSlice({
  name: 'ofFulfillment',
  initialState: {
    orderId: '',
    rmaId: '',
    isTestOrder: false,
    fulfillmentData: null,
    processing: false,
    isDataValidated: true,
    searchBy: 'Order Id',
  },
  reducers: {
    setOrderId: (state, action) => {
      if (state.searchBy === 'Order Id') {
        state.orderId = action.payload.trim().replaceAll('"', '');
      } else {
        state.rmaId = action.payload.trim().replaceAll('"', '');
      }

      if (action.payload !== '') {
        state.isDataValidated = true;
      } else {
        state.isDataValidated = false;
      }
    },
    setIsTestOrder: (state, action) => {
      state.isTestOrder = action.payload === 'yes' ? true : false;
    },
    setFulfillmentData: (state, action) => {
      state.fulfillmentData = action.payload;
    },
    setProcessing: (state, action) => {
      state.processing = action.payload;
    },
    setIsDataValidated: (state, action) => {
      state.isDataValidated = action.payload;
    },
    setSearchBy: (state, action) => {
      state.searchBy = action.payload;
    },
  },
});

export const { setOrderId, setIsTestOrder, setFulfillmentData, setProcessing, setIsDataValidated, setSearchBy, setRmaId } =
  ofFulfillmentSlice.actions;
export default ofFulfillmentSlice.reducer;
