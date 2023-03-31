import { createSlice } from '@reduxjs/toolkit';

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: {
    salesLineIds: [],
    salesOrderId: '',
    market: 'us',
    forceReinvoice: false,
    resultData: null,
    processing: false,
    validSalesId: true,
    validLineNo: true,
    showInvoiceConfirmation: false,
  },
  reducers: {
    setSalesId: (state, action) => {
      state.salesOrderId = action.payload.replaceAll('"', '');
      if (action.payload !== '') {
        state.validSalesId = true;
      } else {
        state.validSalesId = false;
      }
    },
    setSalesLineIds: (state, action) => {
      state.salesLineIds[0] = action.payload;
      if (action.payload !== '') {
        state.validLineNo = true;
      } else {
        state.validLineNo = false;
      }
    },
    setMarket: (state, action) => {
      state.market = action.payload;
    },
    setForceReinvoice: (state, action) => {
      state.forceReinvoice = action.payload;
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
    setValidSalesLineIds: (state, action) => {
      state.validLineNo = action.payload;
    },
    setShowInvoiceConfirmation: (state, action) => {
      state.showInvoiceConfirmation = action.payload;
    },
  },
});

export const {
  setSalesId,
  setMarket,
  setForceReinvoice,
  setResultData,
  setProcessing,
  setValidSalesId,
  setSalesLineIds,
  setValidSalesLineIds,
  setShowInvoiceConfirmation,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
