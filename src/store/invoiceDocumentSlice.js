import { createSlice } from '@reduxjs/toolkit';

export const invoiceDocumentSlice = createSlice({
  name: 'invoiceDocument',
  initialState: {
    documentId: '',
    resultData: null,
    processing: false,
    validDocumentId: true,
  },
  reducers: {
    setDocumentId: (state, action) => {
      state.documentId = action.payload.replaceAll('"', '');
      if (action.payload !== '') {
        state.validDocumentId = true;
      } else {
        state.validDocumentId = false;
      }
    },
    setResultData: (state, action) => {
      state.resultData = action.payload;
    },
    setProcessing: (state, action) => {
      state.processing = action.payload;
    },
    setValidDocumentId: (state, action) => {
      state.validDocumentId = action.payload;
    },
  },
});

export const { setDocumentId, setResultData, setProcessing, setValidDocumentId } = invoiceDocumentSlice.actions;
export default invoiceDocumentSlice.reducer;
