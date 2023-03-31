import { createSlice } from '@reduxjs/toolkit';

export const customerWithLedgerBalanceSlice = createSlice({
  name: 'customerWithLedgerBalance',
  initialState: {
    resultData: null,
    processing: false,
    resultAllData: null,
    showClearLedgerBalanceConfirmation: false,
    customerAccount: null,
    marketFilter: 'ALL',
    searchValue: '',
  },
  reducers: {
    setResultData: (state, action) => {
      state.resultData = action.payload;
    },
    setProcessing: (state, action) => {
      state.processing = action.payload;
    },
    setResultAllData: (state, action) => {
      state.resultAllData = action.payload;
    },
    setShowClearLedgerBalanceConfirmation: (state, action) => {
      state.showClearLedgerBalanceConfirmation = action.payload;
    },
    setCustomer: (state, action) => {
      state.customerAccount = action.payload;
    },
    setMarketFilter: (state, action) => {
      state.marketFilter = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setResultData, setProcessing, setResultAllData, setShowClearLedgerBalanceConfirmation, setCustomer, setMarketFilter, setSearchValue } =
  customerWithLedgerBalanceSlice.actions;
export default customerWithLedgerBalanceSlice.reducer;
