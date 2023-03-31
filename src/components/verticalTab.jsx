import { useMsal } from '@azure/msal-react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { PageViewAction } from '../config/telemetry/telemetryService';
import { orderRoles } from '../util/Constants';
import { showTab } from '../util/helper';
import CancelOrder from './cancelOrder/cancelOrder';
import GetCustomerWithLedgerBalance from './customerWithLedgerBalance/CustomerWithLedgerBalance';
import DeleteReservation from './deleteReservation/DeleteReservation';
import GetFulfillment from './getFulfillment/GetFulfillment';
import Invoice from './invoice/Invoice';
import InvoiceDocument from './invoiceDocument/InvoiceDocument';
import MCAPIFulfillment from './MCAPIFulfillment/MCAPIFulfillment';
import QueryTable from './queryTable/QueryTable';
import ReAuth from './reAuth/ReAuth';
import RefundOrders from './refundOrders/RefundOrders';
import ReturnOrders from './returnOrders/ReturnOrders';
import SearchCart from './searchCart/SearchCart';
import SearchOrder from './searchOrder/SearchOrder';
import UpdateSalesLine from './updateSalesLine/UpdateSalesLine';

const VerticalTab = () => {
  const { accounts } = useMsal();
  const { roles } = useSelector((state) => state.token);
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="Search Orders" onSelect={(e) => PageViewAction(e, accounts)}>
      <Row className="mainMenuRow">
        <Col sm={1} className={'verticalTabs'}>
          <Nav variant="pills" className="flex-column">
            {showTab(roles, orderRoles.OrderReadRole) && (
              <Nav.Item className="tabMainMenu">
                <Nav.Link eventKey="Search Orders">SearchOrder</Nav.Link>
              </Nav.Item>
            )}
            {showTab(roles, orderRoles.OrderReadRole) && (
              <Nav.Item className="tabMainMenu">
                <Nav.Link eventKey="Search Cart">Search Cart</Nav.Link>
              </Nav.Item>
            )}
            {showTab(roles, orderRoles.OrderReadRole) && (
              <Nav.Item className="tabMainMenu">
                <Nav.Link eventKey="OC Fulfillment">OC Fulfillment</Nav.Link>
              </Nav.Item>
            )}
            {showTab(roles, orderRoles.OrderReadRole) && (
              <Nav.Item className="tabMainMenu">
                <Nav.Link eventKey="MCAPI Fulfillment">MCAPI Fulfillment</Nav.Link>
              </Nav.Item>
            )}
            {showTab(roles, orderRoles.OrderReadRole) && (
              <Nav.Item className="tabMainMenu">
                <Nav.Link eventKey="Query Tables">Query Tables</Nav.Link>
              </Nav.Item>
            )}
            {showTab(roles, orderRoles.OrderWriteRole) && (
              <Nav.Item className="tabMainMenu">
                <Nav.Link eventKey="Cancel Order">Cancel Order</Nav.Link>
              </Nav.Item>
            )}
            {showTab(roles, orderRoles.OrderWriteRole) && (
              <Nav.Item className="tabMainMenu">
                <Nav.Link eventKey="Refund Order">Refund Order</Nav.Link>
              </Nav.Item>
            )}
            {showTab(roles, orderRoles.OrderWriteRole) && (
              <Nav.Item className="tabMainMenu">
                <Nav.Link eventKey="Return Order">Return Order</Nav.Link>
              </Nav.Item>
            )}
            {showTab(roles, orderRoles.OrderWriteRole) && (
              <Nav.Item className="tabMainMenu">
                <Nav.Link eventKey="Delete Reservation">Delete Reservation</Nav.Link>
              </Nav.Item>
            )}
            {showTab(roles, orderRoles.OrderWriteRole) && (
              <Nav.Item className="tabMainMenu">
                <Nav.Link eventKey="Update Sales Line">Update Sales Line</Nav.Link>
              </Nav.Item>
            )}
            {showTab(roles, orderRoles.OrderWriteRole) && (
              <Nav.Item className="tabMainMenu">
                <Nav.Link eventKey="ReAuth">ReAuth</Nav.Link>
              </Nav.Item>
            )}
            {showTab(roles, orderRoles.OrderWriteRole) && (
              <Nav.Item className="tabMainMenu">
                <Nav.Link eventKey="Invoice">Invoice</Nav.Link>
              </Nav.Item>
            )}
            {showTab(roles, orderRoles.OrderWriteRole) && (
              <Nav.Item className="tabMainMenu">
                <Nav.Link eventKey="CustomerWithLedgerBalance">Ledger Balance</Nav.Link>
              </Nav.Item>
            )}
            {showTab(roles, orderRoles.OrderWriteRole) && (
              <Nav.Item className="tabMainMenu">
                <Nav.Link eventKey="InvoiceDocument">Invoice Document</Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Col>
        <Col sm={10} className={'tabSpace'}>
          <Tab.Content>
            <Tab.Pane mountOnEnter={true} eventKey="Search Orders" className={'itemTabs'}>
              <SearchOrder />
            </Tab.Pane>
            <Tab.Pane mountOnEnter={true} eventKey="Search Cart" className={'itemTabs'}>
              <SearchCart />
            </Tab.Pane>
            <Tab.Pane mountOnEnter={true} eventKey="OC Fulfillment" className={'itemTabs'}>
              <GetFulfillment />
            </Tab.Pane>
            <Tab.Pane mountOnEnter={true} eventKey="MCAPI Fulfillment" className={'itemTabs'}>
              <MCAPIFulfillment />
            </Tab.Pane>
            <Tab.Pane mountOnEnter={true} eventKey="Query Tables" className={'itemTabs'}>
              <QueryTable />
            </Tab.Pane>
            <Tab.Pane mountOnEnter={true} eventKey="Cancel Order" className={'itemTabs'}>
              <CancelOrder />
            </Tab.Pane>
            <Tab.Pane mountOnEnter={true} eventKey="Refund Order" className={'itemTabs'}>
              <RefundOrders />
            </Tab.Pane>
            <Tab.Pane mountOnEnter={true} eventKey="Return Order" className={'itemTabs'}>
              <ReturnOrders />
            </Tab.Pane>
            <Tab.Pane mountOnEnter={true} eventKey="Delete Reservation" className={'itemTabs'}>
              <DeleteReservation />
            </Tab.Pane>
            <Tab.Pane mountOnEnter={true} eventKey="Update Sales Line" className={'itemTabs'}>
              <UpdateSalesLine />
            </Tab.Pane>
            <Tab.Pane mountOnEnter={true} eventKey="ReAuth" className={'itemTabs'}>
              <ReAuth />
            </Tab.Pane>
            <Tab.Pane mountOnEnter={true} eventKey="Invoice" className={'itemTabs'}>
              <Invoice />
            </Tab.Pane>
            <Tab.Pane mountOnEnter={true} eventKey="CustomerWithLedgerBalance" className={'itemTabs'}>
              <GetCustomerWithLedgerBalance />
            </Tab.Pane>
            <Tab.Pane mountOnEnter={true} eventKey="InvoiceDocument" className={'itemTabs'}>
              <InvoiceDocument />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default VerticalTab;
