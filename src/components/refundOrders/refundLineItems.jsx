import { Col, FloatingLabel, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addLineItemInputElement, removeLineItemInputElement, updateLineItem } from '../../store/refundOrderSlice';
import { handleEnterKeyPress } from '../../util/helper';

function RefundLineItems(props) {
  const dispatch = useDispatch();
  const { isPartialRefund, showAddLineItem, showRemoveLineItem, lineItem } = useSelector((state) => state.refund);
  return lineItem.lineItems.map((el, i) => (
    <InputGroup size="sm" className="mb-3" key={el.lineItemNumber}>
      <Col md={2}>
        <FloatingLabel controlId="lineItemId" label="LineItem Id">
          <FormControl
            type="text"
            onChange={(e) => dispatch(updateLineItem({ index: i, changedItem: 'lineItemId', changedValue: e.target.value }))}
            defaultValue={el.lineItemId || ''}
            placeholder="LineItem Id"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            isInvalid={!el.isValid}
            onKeyPress={(e) => handleEnterKeyPress(e, props.refundOrder)}
            required
          />
        </FloatingLabel>
      </Col>
      <Col md={2}>
        <FloatingLabel controlId="quantity" label="Quantity">
          <FormControl
            type="number"
            onChange={(e) => dispatch(updateLineItem({ index: i, changedItem: 'quantity', changedValue: e.target.value }))}
            defaultValue={el.quantity || 1}
            placeholder="Quantity"
            onKeyPress={(e) => handleEnterKeyPress(e, props.refundOrder)}
            required
          />
        </FloatingLabel>
      </Col>
      <Col md={2}>
        <FloatingLabel controlId="reasonCode" label="Reason Code">
          <FormControl
            type="text"
            onChange={(e) => dispatch(updateLineItem({ index: i, changedItem: 'reasonCode', changedValue: e.target.value }))}
            defaultValue={el.reasonCode || ''}
            onKeyPress={(e) => handleEnterKeyPress(e, props.refundOrder)}
            placeholder="Reason Code"
          />
        </FloatingLabel>
      </Col>
      {isPartialRefund && (
        <Col md={2}>
          <FloatingLabel controlId="RefundAmount" label="Refund Amount">
            <FormControl
              type="text"
              onChange={(e) => dispatch(updateLineItem({ index: i, changedItem: 'RefundAmount', changedValue: e.target.value }))}
              defaultValue={el.RefundAmount || 0}
              onKeyPress={(e) => handleEnterKeyPress(e, props.refundOrder)}
              placeholder="Refund Amount"
            />
          </FloatingLabel>
        </Col>
      )}
      {showAddLineItem && (
        <InputGroup.Text onClick={(e) => dispatch(addLineItemInputElement())} style={{ cursor: 'pointer' }}>
          +
        </InputGroup.Text>
      )}
      {showRemoveLineItem && (
        <InputGroup.Text onClick={(e) => dispatch(removeLineItemInputElement({ index: i }))} style={{ cursor: 'pointer' }}>
          X
        </InputGroup.Text>
      )}
    </InputGroup>
  ));
}

export default RefundLineItems;
