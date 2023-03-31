import { Row, Col, FloatingLabel, Form } from 'react-bootstrap';
import InProgress from '../commonComponents/InProgress';
import JsonViewers from '../commonComponents/JsonViewers';
import {
  setSalesId,
  setMarket,
  setNewAuth,
  setProcessing,
  setResultData,
  setShowReAuthConfirmation,
  setValidSalesId,
  setconfirmOC,
} from '../../store/reAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { reAuthAction, validation } from './reAuthAction';
import ButtonComponent from '../commonComponents/ButtonComponent';
import { handleEnterKeyPress } from '../../util/helper';
import ConfirmationPopUp from '../commonComponents/ConfirmationPopUp';

const ReAuth = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { salesId, market, newAuth, resultData, processing, validSalesId, showReAuthConfirmation, confirmOC } = useSelector((state) => state.reAuth);

  const createRequestPayload = () => {
    return {
      salesId,
      market,
      newAuthRequired: newAuth,
      confirmOC: confirmOC,
    };
  };
  const reAuthorizationWithConfirmation = () => {
    if (!validation(salesId)) {
      dispatch(setValidSalesId(false));
      return;
    }
    dispatch(setValidSalesId(true));
    dispatch(setShowReAuthConfirmation(true));
  };
  const reAuthorization = async () => {
    dispatch(setProcessing(true));
    dispatch(setResultData(null));
    const result = await reAuthAction(salesId, market, newAuth, confirmOC, token, dispatch);
    if (result) {
      dispatch(setResultData(result));
    }
    dispatch(setProcessing(false));
  };

  return (
    <>
      <Row className="g-2">
        <Col xs={6} md={3}>
          <FloatingLabel controlId="salesId" label="Sales Id">
            <Form.Control
              type="text"
              onChange={(e) => dispatch(setSalesId(e.target.value))}
              placeholder="salesId"
              isInvalid={!validSalesId}
              required
              onKeyPress={(e) => handleEnterKeyPress(e, reAuthorizationWithConfirmation)}
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
          <FloatingLabel controlId="newAuth" label="New Auth Required">
            <Form.Select aria-label="Select" onChange={(e) => dispatch(setNewAuth(e.target.value))}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col xs={6} md={2}>
          <FloatingLabel controlId="confirmOC" label="Confirm FulFillment">
            <Form.Select aria-label="Select" onChange={(e) => dispatch(setconfirmOC(e.target.value))}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col md={1} className="actionButton">
          <ButtonComponent name={'ReAuth'} clickAction={(event) => reAuthorizationWithConfirmation()} />
        </Col>
      </Row>
      {processing && <InProgress />}
      {resultData && <JsonViewers name={'ReAuth Status'} data={resultData} />}
      {showReAuthConfirmation && (
        <ConfirmationPopUp
          show={showReAuthConfirmation}
          setShow={setShowReAuthConfirmation}
          actionMethod={reAuthorization}
          modalName={'reauth'}
          requestData={createRequestPayload()}
        />
      )}
    </>
  );
};

export default ReAuth;
