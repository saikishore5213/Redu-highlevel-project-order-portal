import InProgress from '../commonComponents/InProgress';
import { customerWithLedgerBalanceDataAction } from './customerWithLedgerBalanceAction';
import { useDispatch, useSelector } from 'react-redux';
import { setProcessing, setResultData } from '../../store/customerWithLedgerBalanceSlice';
import JsonViewers from '../commonComponents/JsonViewers';
import CustomerWithLedgerBalanceTable from './CustomerWithLedgerBalanceTable';
import '../../App.css';
import { useEffect } from 'react';

function GetCustomerWithLedgerBalance() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  const { resultData, processing } = useSelector((state) => state.customerWithLedgerBalance);

  const getCustomerWithLedgerBalanceReq = async (searchMethod) => {
    dispatch(setProcessing(true));
    const dataJson = await customerWithLedgerBalanceDataAction(token, dispatch);
    if (searchMethod) {
      const filteredData = searchMethod({ searchData: dataJson });
      dispatch(setResultData(filteredData));
      dispatch(setProcessing(false));
      return;
    }
    dispatch(setResultData(dataJson));
    dispatch(setProcessing(false));
  };

  useEffect(() => {
    if (!resultData) {
      getCustomerWithLedgerBalanceReq();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CustomerWithLedgerBalanceTable ActionMethod={getCustomerWithLedgerBalanceReq} />
      {processing && <InProgress />}
      {resultData?.errorCode && <JsonViewers name={'Response'} data={resultData.errorMessage} showSearch={false} />}
    </>
  );
}

export default GetCustomerWithLedgerBalance;
