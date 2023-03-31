import { createSlice } from '@reduxjs/toolkit';

const initialStoreState = {
  searchData: {
    puid: '',
    orderId: '',
    shortOrderId: '',
    riskId: '',
    endingNumber: 10,
    includeBillingEvents: false,
  },
  orderData: null,
  processing: false,
  collapsed: 1,
  isDataValidated: true,
  market: 'us',
  validation: {
    validPuid: true,
    validOrderId: true,
    validRiskId: true,
    validFriendlyId: true,
  },
  searchBy: 'puid',
  showPuid: true,
  showOrder: false,
};

export const searchOrderSlice = createSlice({
  name: 'searchOrders',
  initialState: initialStoreState,
  reducers: {
    setPuid: (state, action) => {
      state.searchData.puid = action.payload.replaceAll('"', '');
      if (action.payload !== '') {
        state.validation.validPuid = true;
      } else {
        state.validation.validPuid = false;
      }
    },
    setOrderId: (state, action) => {
      state.searchData.orderId = action.payload.trim().replaceAll('"', '');
      if (action.payload !== '') {
        state.validation.validOrderId = true;
      } else if (action.payload === '' && state.searchBy === 'orderId') {
        state.validation.validOrderId = false;
      }
    },
    setShortOrderId: (state, action) => {
      state.searchData.shortOrderId = action.payload.replaceAll('"', '');
    },
    setEndingNumber: (state, action) => {
      state.searchData.endingNumber = action.payload;
    },
    setOrderData: (state, action) => {
      state.orderData = action.payload;
    },
    setProcessing: (state, action) => {
      state.processing = action.payload;
    },
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
    setIncludeBillingEvents: (state, action) => {
      state.searchData.includeBillingEvents = action.payload === 'yes' ? true : false;
    },
    setDataValidated: (state, action) => {
      if (action.payload.type) {
        state.validation[action.payload.type] = action.payload.valid;
      } else {
        state.validation.validPuid = action.payload.valid;
        state.validation.validOrderId = action.payload.valid;
        state.validation.validRiskId = action.payload.valid;
      }
    },
    setMarket: (state, action) => {
      state.market = action.payload;
    },
    setSearchBy: (state, action) => {
      state.showPuid = false;
      state.showOrder = false;
      state.showRiskId = false;
      state.showFriendlyId = false;

      state.searchBy = action.payload;
      if (action.payload === 'riskId') {
        state.showRiskId = true;
      } else if (action.payload === 'puid') {
        state.showPuid = true;
      } else if (action.payload === 'orderId') {
        state.showOrder = true;
      } else if (action.payload === 'friendlyId') {
        state.showFriendlyId = true;
      }
    },
    setRiskId: (state, action) => {
      state.searchData.riskId = action.payload.replaceAll('"', '').trim();
      if (action.payload !== '') {
        state.validation.validRiskId = true;
      } else if (action.payload === '' && state.searchBy === 'riskId') {
        state.validation.validRiskId = false;
      }
    },
  },
});

export const {
  setSearchBy,
  setPuid,
  setShortOrderId,
  setOrderId,
  setEndingNumber,
  setOrderData,
  setProcessing,
  setCollapsed,
  setDataValidated,
  setRiskId,
  setIncludeBillingEvents,
  setMarket,
} = searchOrderSlice.actions;
export default searchOrderSlice.reducer;
