import { createSlice } from "@reduxjs/toolkit";

export const MCAPISlice = createSlice({
    name: 'MCAPIFulfillment',
    initialState: {
        fulfillmentId: '',
        isTestOrder: false,
        fulfillmentData: null,
        processing: false,
        isDataValidated: true
    },
    reducers: {
        setFulfillmentId: (state, action) => {
            state.fulfillmentId = action.payload.replaceAll('"', '');
            if (action.payload !== '') {
                state.isDataValidated = true;
            } else {
                state.isDataValidated = false;
            }
        },
        setIsTestOrder: (state, action) => {
            state.isTestOrder = action.payload === 'yes' ? true : false;
        },
        setFulfillmentData: (state, action) => {
            state.fulfillmentData = action.payload;
        },
        setProcessing: (state, action) => {
            state.processing = action.payload;
        },
        setIsDataValidated: (state, action) => {
            state.isDataValidated = action.payload;
        }
    }
});

export const { setFulfillmentId, setIsTestOrder, setFulfillmentData, setProcessing, setIsDataValidated } = MCAPISlice.actions;
export default MCAPISlice.reducer;