import { Button } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import '../../App.css';
import { handleEnterKeyPress } from '../../util/helper';

const ButtonComponent = ({ name, clickAction }) => {
  return (
    <Button
      className="buttonStyle"
      variant="primary"
      size="lg"
      type="button"
      onClick={clickAction}
      onKeyPress={(e) => handleEnterKeyPress(e, clickAction)}
      active
    >
      {name}
    </Button>
  );
};

ButtonComponent.prototypes = {
  name: propTypes.string,
  clickAction: propTypes.func,
};

export default ButtonComponent;
