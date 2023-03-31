import React from 'react';
import { Col, FloatingLabel, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addLineItemInputElement, removeLineItemInputElement, updateLineItem } from '../../store/returnOrderSlice';
import { handleEnterKeyPress } from '../../util/helper';

const ReturnLineItems = (props) => {
  const dispatch = useDispatch();
  const { showAddLineItem, showRemoveLineItem, lineItem } = useSelector((state) => state.return);
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
            onKeyPress={(e) => handleEnterKeyPress(e, props.returnOrder)}
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
            onKeyPress={(e) => handleEnterKeyPress(e, props.returnOrder)}
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
            onKeyPress={(e) => handleEnterKeyPress(e, props.returnOrder)}
            placeholder="Reason Code"
          />
        </FloatingLabel>
      </Col>
      <Col md={2}>
        <FloatingLabel controlId="shipToAddressId" label="Shipping Address Id">
          <FormControl
            type="text"
            onChange={(e) => dispatch(updateLineItem({ index: i, changedItem: 'shipToAddressId', changedValue: e.target.value }))}
            defaultValue={el.shipToAddressId || ''}
            onKeyPress={(e) => handleEnterKeyPress(e, props.returnOrder)}
            placeholder="Shipping Address Id"
          />
        </FloatingLabel>
      </Col>
      <Col md={2}>
        <FloatingLabel controlId="serialNumber" label="Serial Number">
          <FormControl
            type="text"
            onChange={(e) => dispatch(updateLineItem({ index: i, changedItem: 'serialNumber', changedValue: e.target.value }))}
            defaultValue={el.serialNumber || ''}
            onKeyPress={(e) => handleEnterKeyPress(e, props.returnOrder)}
            placeholder="Serial Number"
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

export default ReturnLineItems;
