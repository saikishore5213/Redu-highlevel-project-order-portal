import { createSlice } from '@reduxjs/toolkit';

export const reAuthSlice = createSlice({
  name: 'reAuth',
  initialState: {
    salesId: '',
    market: 'us',
    newAuth: false,
    resultData: null,
    processing: false,
    validSalesId: true,
    showReAuthConfirmation: false,
    confirmOC: false,
  },
  reducers: {
    setSalesId: (state, action) => {
      state.salesId = action.payload.replaceAll('"', '');
      if (action.payload !== '') {
        state.validSalesId = true;
      } else {
        state.validSalesId = false;
      }
    },
    setMarket: (state, action) => {
      state.market = action.payload;
    },
    setNewAuth: (state, action) => {
      state.newAuth = action.payload;
    },
    setResultData: (state, action) => {
      state.resultData = action.payload;
    },
    setProcessing: (state, action) => {
      state.processing = action.payload;
    },
    setValidSalesId: (state, action) => {
      state.validSalesId = action.payload;
    },
    setShowReAuthConfirmation: (state, action) => {
      state.showReAuthConfirmation = action.payload;
    },
    setconfirmOC: (state, action) => {
      state.confirmOC = action.payload;
    },
  },
});

export const { setSalesId, setMarket, setNewAuth, setResultData, setProcessing, setValidSalesId, setShowReAuthConfirmation, setconfirmOC } =
  reAuthSlice.actions;
export default reAuthSlice.reducer;
