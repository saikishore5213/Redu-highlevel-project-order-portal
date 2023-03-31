import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { searchCartAction } from './searchCartAction';
import ButtonComponent from '../commonComponents/ButtonComponent';
import InProgress from '../commonComponents/InProgress';
import JsonViewers from '../commonComponents/JsonViewers';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchBy, setSearchValue, setProcessing, setIsDataValidated } from '../../store/searchCartSlice';
import { capitalizeFirstLetter, handleEnterKeyPress } from '../../util/helper';

function SearchCart() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { searchBy, searchValue, cartData, processing, collapsed, isDataValidated } = useSelector((state) => state.searchCart);

  const search = async () => {
    dispatch(setProcessing(true));
    dispatch(setIsDataValidated(true));
    await searchCartAction(searchBy, searchValue, dispatch, token, dispatch);
    dispatch(setProcessing(false));
  };

  return (
    <>
      <Row className="g-2">
        <Col md={2}>
          <FloatingLabel controlId="searchType" label="Search By">
            <Form.Select aria-label="Select" onChange={(e) => dispatch(setSearchBy(e.target.value))}>
              <option value="puid">Puid</option>
              <option value="cartId">Cart Id</option>
              <option value="friendlyId">Friendly Id</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col md={3}>
          <FloatingLabel controlId="searchData" label={capitalizeFirstLetter(searchBy) + ' value '}>
            <Form.Control
              placeholder="id"
              onChange={(e) => dispatch(setSearchValue(e.target.value))}
              isInvalid={!isDataValidated}
              onKeyPress={(e) => handleEnterKeyPress(e, search)}
            />
            <Form.Control.Feedback className="invalidFeedBack" type="invalid">
              Please enter a valid {capitalizeFirstLetter(searchBy)}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
        <Col md={1} className="actionButton">
          <ButtonComponent name={'Search'} clickAction={(event) => search()} />
        </Col>
      </Row>
      {processing && <InProgress />}
      {cartData && <JsonViewers name={'Cart'} data={cartData} collapsed={collapsed} />}
    </>
  );
}

export default SearchCart;
