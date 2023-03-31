import { createSlice } from '@reduxjs/toolkit';

export const searchCartSlice = createSlice({
  name: 'searchCart',
  initialState: {
    searchValue: '',
    searchBy: 'puid',
    cartData: null,
    processing: false,
    collapsed: 1,
    isDataValidated: true,
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload.replaceAll('"', '');
      if (action.payload !== '') {
        state.isDataValidated = true;
      } else {
        state.isDataValidated = false;
      }
    },
    setSearchBy: (state, action) => {
      state.searchBy = action.payload;
    },
    setCartData: (state, action) => {
      state.cartData = action.payload;
    },
    setProcessing: (state, action) => {
      state.processing = action.payload;
    },
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
    setIsDataValidated: (state, action) => {
      state.isDataValidated = action.payload;
    },
  },
});

export const { setSearchBy, setSearchValue, setCartData, setProcessing, setCollapsed, setIsDataValidated } = searchCartSlice.actions;
export default searchCartSlice.reducer;
