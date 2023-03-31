import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setDocumentId, setProcessing, setValidDocumentId } from '../../store/invoiceDocumentSlice';
import { handleEnterKeyPress } from '../../util/helper';
import ButtonComponent from '../commonComponents/ButtonComponent';
import JsonViewers from '../commonComponents/JsonViewers';
import { invoiceDocumentAction } from './invoiceDocumentAction';

const InvoiceDocument = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { documentId, resultData, validDocumentId } = useSelector((state) => state.invoiceDocument);

  const download = async () => {
    dispatch(setProcessing(true));
    dispatch(setValidDocumentId(true));
    await invoiceDocumentAction(documentId, token, dispatch);
    dispatch(setProcessing(false));
  };

  return (
    <>
      <Row className="g-2">
        <span className="m-2 downloadInvoice">Download invoice document</span>
        <Col xs={6} md={3}>
          <FloatingLabel controlId="documentId" label="Document Id">
            <Form.Control
              type="text"
              onChange={(e) => dispatch(setDocumentId(e.target.value))}
              placeholder="DocumentId"
              isInvalid={!validDocumentId}
              required
              onKeyPress={(e) => handleEnterKeyPress(e, download)}
            />
          </FloatingLabel>
        </Col>
        <Col md={1} className="actionButton">
          <ButtonComponent name={'Download'} clickAction={(event) => download()} />
        </Col>

        {resultData && <JsonViewers name={'Download response'} data={resultData} />}
      </Row>
    </>
  );
};

export default InvoiceDocument;
