import { createSlice } from '@reduxjs/toolkit';

export const defaultLineItemValue = {
  lineItemNumber: 0,
  lineItemId: '',
  quantity: 1,
  reasonCode: '',
  shipToAddressId: '',
  serialNumber: '',
  isValid: true,
};
let lineItemNumberIndex = 0;
export const returnOrderSlice = createSlice({
  name: 'return',
  initialState: {
    puidValue: '',
    orderId: '',
    lineItem: {
      lineItems: [defaultLineItemValue],
      trackingId: '',
      isPreview: false,
      clientContext: {
        client: 'D365',
      },
    },
    orderData: null,
    processing: false,
    showAddLineItem: true,
    showRemoveLineItem: false,
    showConfirmation: false,
    validateFields: {
      isValidPuid: true,
      isValidOrderId: true,
      isValidTrackingId: true,
    },
  },
  reducers: {
    setPuidValue: (state, action) => {
      state.puidValue = action.payload.replaceAll('"', '');
      if (action.payload.replaceAll('"', '').trim() !== '') {
        state.validateFields.isValidPuid = true;
      } else {
        state.validateFields.isValidPuid = false;
      }
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload.replaceAll('"', '');
      if (action.payload.replaceAll('"', '').trim() !== '') {
        state.validateFields.isValidOrderId = true;
      } else {
        state.validateFields.isValidOrderId = false;
      }
    },
    setTrackingId: (state, action) => {
      state.lineItem.trackingId = action.payload.replaceAll('"', '');
      if (action.payload.replaceAll('"', '').trim() !== '') {
        state.validateFields.isValidTrackingId = true;
      } else {
        state.validateFields.isValidTrackingId = false;
      }
    },
    setOrderData: (state, action) => {
      state.orderData = action.payload;
    },
    setProcessing: (state, action) => {
      state.processing = action.payload;
    },
    setShowAddLineItem: (state, action) => {
      state.showAddLineItem = action.payload;
    },
    setShowRemoveLineItem: (state, action) => {
      state.showRemoveLineItem = action.payload;
    },
    updateLineItem: (state, action) => {
      const { index, changedItem, changedValue } = action.payload;
      state.lineItem.lineItems[index][changedItem] = changedValue;
      if (changedItem === 'lineItemId') {
        if (changedValue && changedValue.trim() !== '') {
          state.lineItem.lineItems[index]['isValid'] = true;
        } else {
          state.lineItem.lineItems[index]['isValid'] = false;
        }
      }
    },
    addLineItemInputElement: (state, action) => {
      state.showRemoveLineItem = true;
      if (state.lineItem.lineItems.length > 8) {
        state.showAddLineItem = false;
      }
      let lineItemData = JSON.parse(JSON.stringify(defaultLineItemValue));
      lineItemData['lineItemNumber'] = ++lineItemNumberIndex;
      state.lineItem.lineItems = [...state.lineItem.lineItems, lineItemData];
    },
    removeLineItemInputElement: (state, action) => {
      state.showAddLineItem = true;
      let localStateLineItems = [...state.lineItem.lineItems];
      localStateLineItems.splice(action.payload.index, 1);
      state.lineItem.lineItems = localStateLineItems;
      if (state.lineItem.lineItems.length < 2) {
        state.showRemoveLineItem = false;
      }
    },
    setValidPuid: (state, action) => {
      state.validateFields.isValidPuid = action.payload;
    },
    setValidOrderId: (state, action) => {
      state.validateFields.isValidOrderId = action.payload;
    },
    setValidTrackingId: (state, action) => {
      state.validateFields.isValidTrackingId = action.payload;
    },
    setShowConfirmation: (state, action) => {
      state.showConfirmation = action.payload;
    },
    setIsPreview: (state, action) => {
      state.lineItem.isPreview = action.payload === 'yes' ? true : false;
    },
  },
});

export const {
  setPuidValue,
  setOrderId,
  setTrackingId,
  setOrderData,
  setProcessing,
  setShowAddLineItem,
  setShowRemoveLineItem,
  updateLineItem,
  addLineItemInputElement,
  removeLineItemInputElement,
  setValidPuid,
  setValidOrderId,
  setValidTrackingId,
  setShowConfirmation,
  setIsPreview,
} = returnOrderSlice.actions;

export default returnOrderSlice.reducer;
