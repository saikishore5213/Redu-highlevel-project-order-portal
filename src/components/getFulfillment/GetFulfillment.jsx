import { Row, Col, FloatingLabel, Form } from 'react-bootstrap';
import InProgress from '../commonComponents/InProgress';
import { searchFulfillmentDataAction } from './getFulfillmentAction';
import JsonViewers from '../commonComponents/JsonViewers';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setIsTestOrder, setOrderId, setProcessing, setIsDataValidated, setSearchBy } from '../../store/ocFulfillmentSlice';
import { capitalizeFirstLetter, handleEnterKeyPress } from '../../util/helper';
import ButtonComponent from '../commonComponents/ButtonComponent';

function GetFulfillment() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { orderId, isTestOrder, fulfillmentData, processing, isDataValidated, searchBy, rmaId } = useSelector((state) => state.ofFulfillment);

  const search = async () => {
    dispatch(setProcessing(true));
    dispatch(setIsDataValidated(true));
    await searchFulfillmentDataAction(orderId, isTestOrder, rmaId, searchBy, token, dispatch);
    dispatch(setProcessing(false));
  };

  return (
    <>
      <Row className="g-2">
        <Col md={2}>
          <FloatingLabel controlId="searchType" label="Search For">
            <Form.Select aria-label="Select" onChange={(e) => dispatch(setSearchBy(e.target.value))}>
              <option value="Order Id">Fulfillment</option>
              <option value="RMA Id">RMA</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col xs={6} md={3}>
          <FloatingLabel controlId="orderId" label={capitalizeFirstLetter(searchBy)}>
            <Form.Control
              type="text"
              onChange={(e) => dispatch(setOrderId(e.target.value))}
              placeholder="orderId"
              isInvalid={!isDataValidated}
              onKeyPress={(e) => handleEnterKeyPress(e, search)}
            />
            <Form.Control.Feedback className="invalidFeedBack" type="invalid">
              Please enter valid {capitalizeFirstLetter(searchBy)}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
        {searchBy === 'Order Id' && (
          <Col xs={6} md={2}>
            <FloatingLabel controlId="isTestOrder" label="Is Test Order">
              <Form.Select aria-label="Select" onChange={(e) => dispatch(setIsTestOrder(e.target.value))}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        )}
        <Col xs={6} md={2} className="actionButton">
          <ButtonComponent name={' Search '} variant="primary" clickAction={(event) => search()} />
        </Col>
      </Row>
      {processing && <InProgress />}
      {fulfillmentData && <JsonViewers name={'OC Fulfillment'} data={fulfillmentData} collapsed={4} />}
    </>
  );
}

export default GetFulfillment;
