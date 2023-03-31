import { InputGroup, FormControl, Col, FloatingLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateLineItem, addLineItemInputElement, removeLineItemInputElement } from '../../store/cancelOrderSlice';
import { handleEnterKeyPress } from '../../util/helper';

const CreateLineItems = (props) => {
  const dispatch = useDispatch();
  const { showAddLineItem, showRemoveLineItem, lineItem } = useSelector((state) => state.cancelOrder);
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
            required
            isInvalid={!el.isValid}
            onKeyPress={(e) => handleEnterKeyPress(e, props.cancelWithConfirm)}
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
            required
            onKeyPress={(e) => handleEnterKeyPress(e, props.cancelWithConfirm)}
          />
        </FloatingLabel>
      </Col>
      <Col md={2}>
        <FloatingLabel controlId="reasonCode" label="Reason Code">
          <FormControl
            type="text"
            onChange={(e) => dispatch(updateLineItem({ index: i, changedItem: 'reasonCode', changedValue: e.target.value }))}
            defaultValue={el.reasonCode || ''}
            placeholder="Reason Code"
            onKeyPress={(e) => handleEnterKeyPress(e, props.cancelWithConfirm)}
          />
        </FloatingLabel>
      </Col>
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
};

export default CreateLineItems;
