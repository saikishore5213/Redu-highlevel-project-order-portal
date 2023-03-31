import { createSlice } from '@reduxjs/toolkit';
import { defaultColumns, queryTableSuggestions } from '../util/Constants';

export const queryTableSlice = createSlice({
  name: 'queryTable',
  initialState: {
    searchParameter: {
      tableName: '',
      storageLocation: 'Channel',
      filterBy: '',
      filterValue: '',
      top: 100,
    },
    market: 'US',
    queryData: null,
    processing: false,
    showOriginalResult: true,
    validation: {
      validTableName: true,
      validColumnName: true,
      validSearchValue: true,
    },
    isResultTableView: true,
    tableSuggested: Object.keys(queryTableSuggestions.Channel),
    defaultColumns: defaultColumns,
    suggestedColumns: [],
  },
  reducers: {
    setTableName: (state, action) => {
      state.searchParameter.tableName = action.payload.replaceAll('"', '');
      if (action.payload !== '') {
        state.validation.validTableName = true;
      } else {
        state.validation.validTableName = false;
      }
    },
    setStorageLocation: (state, action) => {
      state.searchParameter.storageLocation = action.payload;
    },
    setFilterBy: (state, action) => {
      state.searchParameter.filterBy = action.payload;
      if (action.payload !== '') {
        state.validation.validColumnName = true;
      } else {
        state.validation.validColumnName = false;
      }
    },
    setFilterValue: (state, action) => {
      state.searchParameter.filterValue = action.payload?.trim();
      if (action.payload !== '') {
        state.validation.validSearchValue = true;
      } else {
        state.validation.validSearchValue = false;
      }
    },
    setTop: (state, action) => {
      state.searchParameter.top = action.payload;
    },
    setMarket: (state, action) => {
      state.market = action.payload;
    },
    setQueryData: (state, action) => {
      state.queryData = action.payload;
    },
    setProcessing: (state, action) => {
      state.processing = action.payload;
    },
    setValidTableName: (state, action) => {
      state.validation.validTableName = action.payload;
    },
    setValidSearchValue: (state, action) => {
      state.validation.validSearchValue = action.payload;
    },
    setValidColumnValue: (state, action) => {
      state.validation.validColumnName = action.payload;
    },
    setResultTableView: (state, action) => {
      state.isResultTableView = action.payload[1] === 'tableView' ? true : false;
    },
    setTableSuggested: (state, action) => {
      state.tableSuggested = action.payload;
    },
    setSuggestedColumns: (state, action) => {
      state.suggestedColumns = action.payload;
    },
    setShowOriginalResult: (state, action) => {
      state.showOriginalResult = action.payload === 'yes' ? true : false;
    },
  },
});

export const {
  setTableName,
  setStorageLocation,
  setFilterBy,
  setFilterValue,
  setTop,
  setMarket,
  setQueryData,
  setProcessing,
  setValidTableName,
  setValidSearchValue,
  setResultTableView,
  setTableSuggested,
  setSuggestedColumns,
  setValidColumnValue,
  setShowOriginalResult,
} = queryTableSlice.actions;
export default queryTableSlice.reducer;
