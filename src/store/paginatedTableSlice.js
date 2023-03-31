import { createSlice } from '@reduxjs/toolkit';
export const paginatedTable = createSlice({
  name: 'tableView',
  initialState: {
    pageCount: 0,
    isNext: false,
    isPrev: false,
    fullData: null,
    currentData: [],
    currentSearchData: [],
    columnSearch: '',
    valueSearch: '',
  },
  reducers: {
    setPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
    setIsNext: (state, action) => {
      state.isNext = action.payload;
    },
    setIsPrev: (state, action) => {
      state.isPrev = action.payload;
    },
    setFullData: (state, action) => {
      state.fullData = action.payload.resultData;
      state.currentData = state.fullData?.length > 0 ? state.fullData[0] : [];
      state.isNext = state.fullData?.length > 1 ? true : false;
      state.isPrev = false;
      state.pageCount = 0;
      state.columnSearch = '';
      state.valueSearch = '';
    },
    setCurrentData: (state, action) => {
      state.currentData = action.payload;
    },
    setColumnSearch: (state, action) => {
      state.columnSearch = action.payload;
    },
    setValueSearch: (state, action) => {
      state.valueSearch = action.payload;
    },
    setCurrentSearchData: (state, action) => {
      state.currentSearchData = action.payload;
    },
  },
});

export const { setPageCount, setIsNext, setIsPrev, setFullData, setCurrentData, setColumnSearch, setValueSearch } = paginatedTable.actions;
export default paginatedTable.reducer;
