import SearchOrder from './searchOrder/SearchOrder';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CancelOrder from './cancelOrder/cancelOrder';
import SearchCart from './searchCart/SearchCart';
import QueryTable from './queryTable/QueryTable';
import GetFulfillment from './getFulfillment/GetFulfillment';
import MCAPIFulfillment from './MCAPIFulfillment/MCAPIFulfillment';
import DeleteReservation from './deleteReservation/DeleteReservation';
import { orderRoles } from '../util/Constants';
import RefundOrders from './refundOrders/RefundOrders';
import ReturnOrders from './returnOrders/ReturnOrders';
import UpdateSalesLine from './updateSalesLine/UpdateSalesLine';
import ReAuth from './reAuth/ReAuth';
import CustomerWithLedgerBalance from './customerWithLedgerBalance/CustomerWithLedgerBalance';
import Invoice from './invoice/Invoice';
import { PageViewAction } from '../config/telemetry/telemetryService';
import '../App.css';
import { useSelector } from 'react-redux';
import { showTab } from '../util/helper';
import InvoiceDocument from './invoiceDocument/InvoiceDocument';

function TabPage() {
  const { roles } = useSelector((state) => state.token);
  return (
    <Tabs id="uncontrolled-tab-example" className="mb-3" defaultActiveKey="Search Orders" onSelect={(e) => PageViewAction(e)}>
      {showTab(roles, orderRoles.OrderReadRole) && (
        <Tab mountOnEnter={true} className="itemTabs" eventKey="Search Orders" title="Search Orders">
          <SearchOrder />
        </Tab>
      )}
      {showTab(roles, orderRoles.OrderReadRole) && (
        <Tab mountOnEnter={true} className="itemTabs" eventKey="Search Cart" title="Search Cart">
          <SearchCart />
        </Tab>
      )}
      {showTab(roles, orderRoles.OrderReadRole) && (
        <Tab mountOnEnter={true} className="itemTabs" eventKey="OC Fulfillment" title="OC Fulfillment">
          <GetFulfillment />
        </Tab>
      )}
      {showTab(roles, orderRoles.OrderReadRole) && (
        <Tab mountOnEnter={true} className="itemTabs" eventKey="MCAPI Fulfillment" title="MCAPI Fulfillment">
          <MCAPIFulfillment />
        </Tab>
      )}
      {showTab(roles, orderRoles.OrderReadRole) && (
        <Tab mountOnEnter={true} className="itemTabs" eventKey="Query Tables" title="Query Tables">
          <QueryTable />
        </Tab>
      )}
      {showTab(roles, orderRoles.OrderWriteRole) && (
        <Tab mountOnEnter={true} className="itemTabs" eventKey="Cancel Order" title="Cancel Order">
          <CancelOrder />
        </Tab>
      )}
      {showTab(roles, orderRoles.OrderWriteRole) && (
        <Tab mountOnEnter={true} className="itemTabs" eventKey="Delete Reservation" title="Delete Reservation">
          <DeleteReservation />
        </Tab>
      )}
      {showTab(roles, orderRoles.OrderWriteRole) && (
        <Tab mountOnEnter={true} className="itemTabs" eventKey="Refund Order" title="Refund Order">
          <RefundOrders />
        </Tab>
      )}
      {showTab(roles, orderRoles.OrderWriteRole) && (
        <Tab mountOnEnter={true} className="itemTabs" eventKey="Return Order" title="Return Order">
          <ReturnOrders />
        </Tab>
      )}
      {showTab(roles, orderRoles.OrderWriteRole) && (
        <Tab mountOnEnter={true} className="itemTabs" eventKey="Update Sales Line" title="Update Sales Line">
          <UpdateSalesLine />
        </Tab>
      )}
      {showTab(roles, orderRoles.OrderWriteRole) && (
        <Tab mountOnEnter={true} className="itemTabs" eventKey="ReAuth" title="ReAuth">
          <ReAuth />
        </Tab>
      )}
      {showTab(roles, orderRoles.OrderWriteRole) && (
        <Tab mountOnEnter={true} className="itemTabs" eventKey="Invoice" title="Invoice Sales Order">
          <Invoice />
        </Tab>
      )}
      {showTab(roles, orderRoles.OrderWriteRole) && (
        <Tab mountOnEnter={true} className="itemTabs" eventKey="CustomerWithLedgerBalance" title="Ledger Balance">
          <CustomerWithLedgerBalance />
        </Tab>
      )}
      {showTab(roles, orderRoles.OrderReadRole) && (
        <Tab mountOnEnter={true} className="itemTabs" eventKey="InvoiceDocument" title="Tax Document">
          <InvoiceDocument />
        </Tab>
      )}
    </Tabs>
  );
}

export default TabPage;
