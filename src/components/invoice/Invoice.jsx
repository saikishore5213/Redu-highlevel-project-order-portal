import { Row, Col, FloatingLabel, Form } from 'react-bootstrap';
import InProgress from '../commonComponents/InProgress';
import JsonViewers from '../commonComponents/JsonViewers';
import {
  setSalesId,
  setMarket,
  setForceReinvoice,
  setProcessing,
  setResultData,
  setSalesLineIds,
  setShowInvoiceConfirmation,
  setValidSalesId,
  setValidSalesLineIds,
} from '../../store/invoiceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { invoiceAction, salesOrderValidation, salesLineValidation } from './invoiceAction';
import ButtonComponent from '../commonComponents/ButtonComponent';
import { handleEnterKeyPress } from '../../util/helper';
import ConfirmationPopUp from '../commonComponents/ConfirmationPopUp';

const Invoice = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { salesLineIds, salesOrderId, market, forceReinvoice, resultData, processing, validSalesId, validLineNo, showInvoiceConfirmation } =
    useSelector((state) => state.invoice);

  const createRequestPayload = () => {
    return {
      salesOrderId,
      salesLineIds,
      market,
      forceReinvoice: forceReinvoice,
    };
  };
  const invoiceWithConfirmation = () => {
    if (!salesOrderValidation(salesOrderId)) {
      dispatch(setValidSalesId(false));
      return;
    }
    if (!salesLineValidation(salesLineIds)) {
      dispatch(setValidSalesLineIds(false));
      return;
    }
    dispatch(setShowInvoiceConfirmation(true));
  };
  const invoiceSales = async () => {
    dispatch(setProcessing(true));
    dispatch(setResultData(null));
    const result = await invoiceAction(salesLineIds, salesOrderId, market, forceReinvoice, token, dispatch);
    dispatch(setResultData(result));
    dispatch(setProcessing(false));
  };

  return (
    <>
      <Row className="g-2">
        <Col xs={6} md={3}>
          <FloatingLabel controlId="salesOrderId" label="Sales Order Id">
            <Form.Control
              type="text"
              onChange={(e) => dispatch(setSalesId(e.target.value))}
              placeholder="salesOrderId"
              isInvalid={!validSalesId}
              required
              onKeyPress={(e) => handleEnterKeyPress(e, invoiceWithConfirmation)}
            />
          </FloatingLabel>
        </Col>
        <Col xs={6} md={2}>
          <FloatingLabel controlId="salesLineIds" label="Line Number">
            <Form.Control
              type="number"
              onChange={(e) => dispatch(setSalesLineIds(e.target.value))}
              placeholder="salesLineIds"
              isInvalid={!validLineNo}
              required
              onKeyPress={(e) => handleEnterKeyPress(e, invoiceWithConfirmation)}
            />
          </FloatingLabel>
        </Col>
        <Col xs={6} md={2}>
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
        <Col xs={6} md={2}>
          <FloatingLabel controlId="forceReinvoice" label="Force Reinvoice">
            <Form.Select aria-label="Select" onChange={(e) => dispatch(setForceReinvoice(e.target.value))}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col md={1} className="actionButton">
          <ButtonComponent name={'Invoice'} clickAction={(event) => invoiceWithConfirmation()} />
        </Col>
      </Row>
      {processing && <InProgress />}
      {resultData && <JsonViewers name={'Invoice Status'} data={resultData} />}
      {showInvoiceConfirmation && (
        <ConfirmationPopUp
          show={showInvoiceConfirmation}
          setShow={setShowInvoiceConfirmation}
          actionMethod={invoiceSales}
          modalName={'invoice'}
          requestData={createRequestPayload()}
        />
      )}
    </>
  );
};

export default Invoice;
