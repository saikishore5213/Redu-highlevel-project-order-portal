import { Row, Col, FloatingLabel, Form } from 'react-bootstrap';
import InProgress from '../commonComponents/InProgress';
import { searchFulfillmentDataAction } from './MCAPIFulfillmentAction';
import JsonViewers from '../commonComponents/JsonViewers';
import '../../App.css';
import { setFulfillmentId, setIsTestOrder, setProcessing, setIsDataValidated } from '../../store/MCAPIFulfillmentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { handleEnterKeyPress } from '../../util/helper';
import ButtonComponent from '../commonComponents/ButtonComponent';

function MCAPIFulfillment() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { fulfillmentId, isTestOrder, fulfillmentData, processing, isDataValidated } = useSelector((state) => state.MCAPIFulfillment);

  const search = async () => {
    dispatch(setProcessing(true));
    dispatch(setIsDataValidated(true));
    await searchFulfillmentDataAction(fulfillmentId, isTestOrder, token, dispatch);
    dispatch(setProcessing(false));
  };

  return (
    <>
      <Row className="g-2">
        <Col xs={6} md={3}>
          <FloatingLabel controlId="fulfillmentId" label="Fulfillment Id">
            <Form.Control
              type="text"
              onChange={(e) => dispatch(setFulfillmentId(e.target.value))}
              placeholder="fulfillmentId"
              isInvalid={!isDataValidated}
              onKeyPress={(e) => handleEnterKeyPress(e, search)}
            />
            <Form.Control.Feedback className="invalidFeedBack" type="invalid">
              Please enter valid Fulfillment Id
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
        <Col xs={6} md={2}>
          <FloatingLabel controlId="isTestOrder" label="Is Test Order">
            <Form.Select aria-label="Select" onChange={(e) => dispatch(setIsTestOrder(e.target.value))}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col xs={6} md={2} className="actionButton">
          <ButtonComponent name={' Search '} variant="primary" clickAction={(event) => search()} />
        </Col>
      </Row>
      {processing && <InProgress />}
      {fulfillmentData && <JsonViewers name={'MCAPI Fulfillment'} data={fulfillmentData} collapsed={4} />}
    </>
  );
}

export default MCAPIFulfillment;
