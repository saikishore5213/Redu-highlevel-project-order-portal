import { Col, Container, FloatingLabel, Form, FormControl, InputGroup, OverlayTrigger, Row, Stack, Table, Tooltip } from 'react-bootstrap';
import { ArrowRepeat } from 'react-bootstrap-icons';
import {
  setResultData,
  setShowClearLedgerBalanceConfirmation,
  setCustomer,
  setProcessing,
  setMarketFilter,
  setSearchValue,
} from '../../store/customerWithLedgerBalanceSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCustomerWithLedgerBalanceDataAction,
  searchByValue,
  searchCustomerAccountByMarket,
  validation,
} from './customerWithLedgerBalanceAction';
import ConfirmationPopUp from '../commonComponents/ConfirmationPopUp';

const CustomerWithLedgerBalanceTable = (props) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { resultData, resultAllData, showClearLedgerBalanceConfirmation, customerAccount, marketFilter, searchValue } = useSelector(
    (state) => state.customerWithLedgerBalance,
  );
  const renderRefreshTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Reload customer accounts
    </Tooltip>
  );

  const renderClearTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Clear customer balance
    </Tooltip>
  );

  const createRequestPayload = (customerAccount) => {
    return {
      customerAccount: customerAccount,
    };
  };

  const confirmClearLedgerBalance = (customerAccount) => {
    if (!validation(customerAccount)) {
      return;
    }
    dispatch(setCustomer(customerAccount));
    dispatch(setShowClearLedgerBalanceConfirmation(true));
  };

  const clearBalance = async () => {
    dispatch(setProcessing(true));
    const clearData = await clearCustomerWithLedgerBalanceDataAction(customerAccount, token, dispatch);
    if (clearData) {
      props.ActionMethod();
    }
    dispatch(setProcessing(false));
  };

  const search = ({ market, search, searchData }) => {
    const marketSearchValue = market ? market : marketFilter;
    const searchText = search ? search : searchValue;
    const searchResultData = searchData ? searchData : resultAllData;
    if (market) {
      dispatch(setMarketFilter(marketSearchValue));
    } else if (search) {
      dispatch(setSearchValue(searchText));
    }
    const filteredMarketData = searchCustomerAccountByMarket(marketSearchValue, searchResultData);
    const filteredData = searchByValue(searchText, filteredMarketData);
    dispatch(setResultData(filteredData));
    return filteredData;
  };

  return (
    <>
      <Table striped hover>
        <thead>
          <tr>
            <th>
              <Stack direction="horizontal" gap={3}>
                <span className="m-2">#</span>
                <span className="m-2 customerAccountNameNoWrap">Customer Accounts</span>
                <span className="m-2">
                  <div className={'buttonStyle'}>
                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderRefreshTooltip}>
                      <ArrowRepeat color="royalblue" size={20} onClick={(event) => props.ActionMethod(search)}></ArrowRepeat>
                    </OverlayTrigger>
                  </div>
                </span>
                <div className="vr" />
                <Container className="ledgerBalanceSearchLeftAlign">
                  <Row>
                    <Col md={3}>
                      <FloatingLabel controlId="market" label="Market">
                        <Form.Select aria-label="select" onChange={(e) => search({ market: e.target.value })}>
                          <option value="ALL">All</option>
                          <option value="US">USA</option>
                          <option value="SG">Singapore</option>
                          <option value="NZ">New Zealand</option>
                          <option value="CA">Canada</option>
                          <option value="AU">Australia</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col md={4}>
                      <InputGroup size="lg">
                        <FormControl
                          placeholder="Search Value"
                          aria-label="Search"
                          aria-describedby="basic-addon2"
                          onChange={(e) => search({ search: e.target.value })}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                </Container>
              </Stack>
            </th>
          </tr>
        </thead>
        <tbody>
          {!resultData?.errorCode &&
            resultData?.map((obj, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Stack direction="horizontal" gap={3}>
                      <span className="m-2">{index + 1}</span>
                      <span className="m-2">{obj}</span>
                    </Stack>
                  </td>
                  <td>
                    <OverlayTrigger placement="left" delay={{ show: 250, hide: 400 }} className={'buttonStyle'} overlay={renderClearTooltip}>
                      <button id={index} className={'btn-clear'} onClick={(event) => confirmClearLedgerBalance(obj)}>
                        Clear
                      </button>
                    </OverlayTrigger>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {showClearLedgerBalanceConfirmation && (
        <ConfirmationPopUp
          show={showClearLedgerBalanceConfirmation}
          setShow={setShowClearLedgerBalanceConfirmation}
          actionMethod={clearBalance}
          modalName={'clear ledger balance'}
          requestData={createRequestPayload(customerAccount)}
        />
      )}
    </>
  );
};

export default CustomerWithLedgerBalanceTable;
