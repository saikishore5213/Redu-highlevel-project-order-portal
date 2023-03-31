export const strings = {
  Error: { Error: 'Something went wrong. Please try later !' },
  Loading: { Loading: ' Please Wait ... ' },
  NoData: { Empty: ' No data found ' },
  invalidData: ' Please enter a valid ',
  authError: { Error: 'Authentication Error !!', authenticationError: true },
  updateSalesLineSuccessResponse: { Status: 'Updated salesline successfully' },
  downloadResoponse: { Status: 'Downloaded invoice document successfully. Please check in downloads' },
};

export const urls = {
  orderServiceBaseUrl: process.env.REACT_APP_API_URL,
  orderServiceUrl: '/v1/users/msa:{msaValue}/Orders',
  cartServiceUrl: '/v1/CartExport',
  cartsV2ServiceUrl: '/v1/Carts',
  cartV2ServiceUrl:'/v1/Cart',
  toolsServiceUrl: '/v1/Tools',
  searchOrderByPuidUrl: '?top={top}&includeBillingEvents={includeBillingEvents}',
  searchOrderByOrderIdUrl: '/GetOrderByTransactionId?transactionId={transactionId}',
  searchOrderByRiskIdUrl: '/GetOrderByRiskId?riskId={riskId}',
  searchCartByPuidUrl: '?puid={puid}',
  searchCartByCartIdUrl: '/GetCartByCartId?id={cartId}',
  searchCartByFriendlyIdUrl: '?friendlyId={friendlyId}',
  getFulfillmentEndPoint: '/GetFulFillmentDetails?orderId={orderId}&isTestOrder={isTestOrder}',
  getMCAPIFulfillmentEndPoint: '/GetMcapiDetails?fulfillmentId={fulfillmentId}&isTestOrder={isTestOrder}',
  queryTableUrl: '/GetTableRecords?market={market}',
  queryADLSTableUrl: '/GetADLSTableRecords',
  cancelOrderUrl: '/{orderId}/cancel',
  deleteReservationUrl: '/DeleteReservation?reservationId={reservationId}&market={market}',
  refundOrderUrl: '/{orderId}/refund',
  refundTaxUrl: '/{orderId}/refundTax',
  returnTaxUrl: '/{orderId}/return',
  updateSalesLineUrl: '/UpdateSalesLinesByTransactionId?salesTransactionId={salesTransactionId}&market={market}&storageLocation={storageLocation}',
  reAuthUrl: '/Reauth?salesId={salesId}&market={market}&newAuth={newAuth}&confirmOC={confirmOC}',
  customerWithLedgerBalanceUrl: '/GetCustomerWithLedgerBalance',
  invoiceUrl: '/Invoice?salesOrderId={salesOrderId}&market={market}&forceReinvoice={forceReinvoice}',
  clearCustomerLedgerBalanceUrl: '/ClearCustomerLedgerBalance?market={market}&customerAccount={customerAccount}',
  searchRmaId: '/GetRmaByRmaId?rmaId={rmaId}',
  invoiceDocumentUrl: '/GetInvoiceDocumentById?documentId={documentId}',
  auditReportUrl:
    'https://msit.powerbi.com/reportEmbed?reportId=907dd18e-be13-48d9-b010-1bae582918cd&autoAuth=true&ctid=72f988bf-86f1-41af-91ab-2d7cd011db47&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9kZi1tc2l0LXNjdXMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D',
};

export const orderRoles = {
  OrderReadRole: 'Order.Read',
  OrderWriteRole: 'Order.Write',
};

export const requestType = {
  Get: 'GET',
  Post: 'POST',
  Put: 'PUT',
};

export const queryTableSuggestions = {
  Channel: {
    'EXT.MSE_RETAILTRANSACTIONTABLE': ['transactionid', 'recid', 'riskId'],
    'EXT.MSE_ONLINESALESLINEBILLINGSTATUS': ['transactionid', 'recid', 'riskId'],
    'EXT.MSE_RETAILTRANSACTIONORDERSTATUS': [],
  },
  HQ: {
    'dbo.RETAILTRANSACTIONTABLE': [],
    'dbo.RETAILTRANSACTIONSALESTRANS': [],
    'dbo.RETAILTRANSACTIONMARKUPTRANS': [],
    'dbo.CREDITCARDAUTHTRANS': [],
  },
  ADLS: {
    'dbo.PaymodAllStates': ['TransactionId', 'PaymentId'],
    'dbo.Paymod': ['TransactionId', 'PaymentId'],
  },
};

export const defaultColumns = ['transactionid', 'salesorderid', 'salesid', 'recid', 'riskId'];
