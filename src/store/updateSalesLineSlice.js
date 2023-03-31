import { createSlice } from '@reduxjs/toolkit';

export const updateSalesLineSlice = createSlice({
  name: 'updateSalesLine',
  initialState: {
    salesTransactionId: '',
    market: 'us',
    storageLocation: 'Channel',
    BillingState: '',
    FulfillmentState: '',
    SerialNumber: '',
    LineNumber: '',
    resultData: null,
    processing: false,
    validation: {
      validTransactionId: true,
      validLineNumber: true,
      validUpdateColumn: true,
    },
    showReAuthConfirmation: false,
  },
  reducers: {
    setSalesTransactionId: (state, action) => {
      state.salesTransactionId = action.payload.replaceAll('"', '');
      if (action.payload !== '') {
        state.validation.validTransactionId = true;
      } else {
        state.validation.validTransactionId = false;
      }
    },
    setMarket: (state, action) => {
      state.market = action.payload;
    },
    setStorageLocation: (state, action) => {
      state.storageLocation = action.payload;
    },
    setBillingState: (state, action) => {
      state.BillingState = action.payload;
      if (action.payload !== '') {
        state.validation.validUpdateColumn = true;
      } else {
        state.validation.validUpdateColumn = false;
      }
    },
    setFulfillmentState: (state, action) => {
      state.FulfillmentState = action.payload;
      if (action.payload !== '') {
        state.validation.validUpdateColumn = true;
      } else {
        state.validation.validUpdateColumn = false;
      }
    },
    setSerialNumber: (state, action) => {
      state.SerialNumber = action.payload.replaceAll('"', '');
      if (action.payload !== '') {
        state.validation.validUpdateColumn = true;
      } else {
        state.validation.validUpdateColumn = false;
      }
    },
    setLineNumber: (state, action) => {
      state.LineNumber = action.payload.replaceAll('"', '');
      if (action.payload !== '') {
        state.validation.validLineNumber = true;
      } else {
        state.validation.validLineNumber = false;
      }
    },
    setResultData: (state, action) => {
      state.resultData = action.payload;
    },
    setProcessing: (state, action) => {
      state.processing = action.payload;
    },
    setValidation: (state, action) => {
      if (action.payload?.column === 'salesTransactionId') {
        state.validation.validTransactionId = action.payload.value;
      } else if (action.payload?.column === 'LineNumber') {
        state.validation.validLineNumber = action.payload.value;
      } else if (action.payload?.column === 'updateColumn') {
        state.validation.validUpdateColumn = action.payload.value;
      }
    },
    resetValidation: (state, action) => {
      state.validation.validTransactionId = true;
      state.validation.validLineNumber = true;
      state.validation.validUpdateColumn = true;
    },
    setShowReAuthConfirmation: (state, action) => {
      state.showReAuthConfirmation = action.payload;
    },
  },
});

export const {
  setSalesTransactionId,
  setMarket,
  setStorageLocation,
  setBillingState,
  setFulfillmentState,
  setSerialNumber,
  setLineNumber,
  setResultData,
  setProcessing,
  setValidation,
  resetValidation,
  setShowReAuthConfirmation,
} = updateSalesLineSlice.actions;
export default updateSalesLineSlice.reducer;
