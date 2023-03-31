import { configureStore } from '@reduxjs/toolkit';
import searchOrderReducer from './searchOrderSlice';
import searchCartReducer from './searchCartSlice';
import ocFulfillmentReducer from './ocFulfillmentSlice';
import MCAPIFulfillmentReducer from './MCAPIFulfillmentSlice';
import queryTableReducer from './queryTableSlice';
import deleteReservationReducer from './deleteReservationSlice';
import updateSalesLineReducer from './updateSalesLineSlice';
import reAuthReducer from './reAuthSlice';
import cancelOrderReducer from './cancelOrderSlice';
import customerWithLedgerBalanceReducer from './customerWithLedgerBalanceSlice';
import invoiceReducer from './invoiceSlice';
import tokenReducer from './tokenSlice';
import returnReducer from './returnOrderSlice';
import refundReducer from './refundOrderSlice';
import tableViewReducer from './paginatedTableSlice';
import invoiceDocumentReducer from './invoiceDocumentSlice';

export default configureStore({
  reducer: {
    searchOrders: searchOrderReducer,
    searchCart: searchCartReducer,
    ofFulfillment: ocFulfillmentReducer,
    MCAPIFulfillment: MCAPIFulfillmentReducer,
    queryTable: queryTableReducer,
    deleteReservation: deleteReservationReducer,
    updateSalesLine: updateSalesLineReducer,
    reAuth: reAuthReducer,
    cancelOrder: cancelOrderReducer,
    customerWithLedgerBalance: customerWithLedgerBalanceReducer,
    invoice: invoiceReducer,
    token: tokenReducer,
    return: returnReducer,
    refund: refundReducer,
    tableView: tableViewReducer,
    invoiceDocument: invoiceDocumentReducer,
  },
});
