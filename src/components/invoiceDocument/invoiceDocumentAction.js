import { constructInvoiceDocumentUrl } from '../../services/tools/helper';
import { setValidDocumentId } from '../../store/invoiceDocumentSlice';
import { requestType } from '../../util/Constants';
import { getHeaderParameters } from '../../util/fetchAction';

export const invoiceDocumentAction = async (documentId, token, dispatch) => {
  if (!documentId) {
    dispatch(setValidDocumentId(false));
    return;
  }

  const actionUrl = constructInvoiceDocumentUrl(documentId);
  const options = getHeaderParameters(token, requestType.Get);
  let responseData = await fetch(actionUrl, options).then((response) => {
    response.blob().then((blob) => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  });
};
