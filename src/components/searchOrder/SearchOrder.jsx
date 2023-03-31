import { Row, Col, FloatingLabel, Form, InputGroup, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { searchOrders } from './searchOrderAction';
import InProgress from '../commonComponents/InProgress';
import ButtonComponent from '../commonComponents/ButtonComponent';
import JsonViewers from '../commonComponents/JsonViewers';
import {
  setEndingNumber,
  setOrderId,
  setPuid,
  setShortOrderId,
  setProcessing,
  setDataValidated,
  setRiskId,
  setSearchBy,
  setIncludeBillingEvents,
  setMarket,
} from '../../store/searchOrderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { handleEnterKeyPress } from '../../util/helper';
import '../../App.css';

function SearchOrder() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { searchData, searchBy, validation, orderData, processing, collapsed, showRiskId, showPuid, showOrder, showFriendlyId, market } = useSelector(
    (state) => state.searchOrders,
  );

  const search = async () => {
    dispatch(setProcessing(true));
    dispatch(setDataValidated({ valid: true }));
    await searchOrders(searchData, searchBy, market, token, dispatch);
    dispatch(setProcessing(false));
  };

  return (
    <>
      <Row className="g-2 mb-2">
        <Col md={4}>
          <InputGroup>
            <InputGroup.Text id="btnGroupAddon">Search BY</InputGroup.Text>
            <ToggleButtonGroup type="radio" name="searchBy" defaultValue={'puid'} onChange={(value) => dispatch(setSearchBy(value))}>
              <ToggleButton variant="secondary" id="puid" value={'puid'}>
                Puid
              </ToggleButton>
              <ToggleButton variant="secondary" id="orderId" value={'orderId'}>
                Order Id
              </ToggleButton>
              <ToggleButton variant="secondary" id="friendlyId" value={'friendlyId'}>
                Friendly Id
              </ToggleButton>
              <ToggleButton variant="secondary" id="riskId" value={'riskId'}>
                Risk Id
              </ToggleButton>
            </ToggleButtonGroup>
          </InputGroup>
        </Col>
      </Row>
      <Row className="g-2">
        {showPuid && (
          <Col md={3}>
            <FloatingLabel controlId="puidValue" label="PUID">
              <Form.Control
                type="number"
                placeholder="puid"
                onChange={(e) => dispatch(setPuid(e.target.value))}
                isInvalid={searchBy === 'puid' && !validation.validPuid}
                onKeyPress={(e) => handleEnterKeyPress(e, search)}
                defaultValue={searchData?.puid || ''}
              />
            </FloatingLabel>
          </Col>
        )}
        {(showPuid || showOrder) && (
          <Col md={3}>
            <FloatingLabel controlId="orderId" label="Order ID">
              <Form.Control
                type="text"
                placeholder="orderId"
                onChange={(e) => dispatch(setOrderId(e.target.value))}
                isInvalid={searchBy === 'orderId' && !validation.validOrderId}
                onKeyPress={(e) => handleEnterKeyPress(e, search)}
                defaultValue={searchData?.orderId || ''}
              />
            </FloatingLabel>
          </Col>
        )}
        {showRiskId && (
          <Col md={3}>
            <FloatingLabel controlId="riskId" label="Risk ID">
              <Form.Control
                placeholder="riskId"
                onChange={(e) => dispatch(setRiskId(e.target.value))}
                onKeyPress={(e) => handleEnterKeyPress(e, search)}
                isInvalid={searchBy === 'riskId' && !validation.validRiskId}
                defaultValue={searchData?.riskId || ''}
              />
            </FloatingLabel>
          </Col>
        )}
        {(showPuid || showFriendlyId) && (
          <Col md={3}>
            <FloatingLabel controlId="friendlyId" label="Friendly Id">
              <Form.Control
                placeholder="friendlyId"
                onChange={(e) => dispatch(setShortOrderId(e.target.value))}
                onKeyPress={(e) => handleEnterKeyPress(e, search)}
                isInvalid={searchBy === 'friendlyId' && !validation.validFriendlyId}
                defaultValue={searchData?.shortOrderId || ''}
              />
            </FloatingLabel>
          </Col>
        )}
        {showFriendlyId && (
          <Col md={1}>
            <FloatingLabel controlId="market" label="Market">
              <Form.Select aria-label="Select" onChange={(e) => dispatch(setMarket(e.target.value))}>
                <option value="us">USA</option>
                <option value="sg">Singapore</option>
                <option value="nz">New Zealand</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        )}
        {showPuid && (
          <>
            <Col md={1}>
              <FloatingLabel className="searchByWordWrap" controlId="includeBillingEvent" label="Billing Event">
                <Form.Select aria-label="Select" onChange={(e) => dispatch(setIncludeBillingEvents(e.target.value))}>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md={1}>
              <FloatingLabel className="searchByWordWrap" controlId="endingNumber" label="# of Orders">
                <Form.Select aria-label="Select" onChange={(e) => dispatch(setEndingNumber(e.target.value))}>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                  <option value="60">60</option>
                  <option value="70">70</option>
                  <option value="80">80</option>
                  <option value="90">90</option>
                  <option value="100">100</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </>
        )}
        <Col md={1} className="actionButton">
          <ButtonComponent name={'Search'} clickAction={(event) => search()} />
        </Col>
      </Row>
      {processing && <InProgress />}
      {orderData && <JsonViewers name={'Orders'} data={orderData} collapsed={collapsed} maxHeightValue={'75vh'} />}
    </>
  );
}

export default SearchOrder;
