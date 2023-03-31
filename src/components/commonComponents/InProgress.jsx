import { Spinner } from 'react-bootstrap';
import '../../App.css';
import './InProgress.css';

function InProgress() {
  return (
    <div className="lmask">
      <Spinner className="spinnerDiv" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default InProgress;
