import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../config/authConfig';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { orderRoles } from '../../util/Constants';
import { useDispatch } from 'react-redux';
import { setIsNoRoles, setRoles, setToken, setUserName } from '../../store/tokenSlice';

function handleLogin(instance, dispatch) {
  instance
    .loginPopup(loginRequest)
    .then((loginResponse) => {
      dispatch(setToken(loginResponse.accessToken));
    })
    .catch((e) => {
      console.error(e);
    });
}

function handleLogout(instance) {
  instance.logoutPopup().catch((e) => {
    console.error(e);
  });
}

export const SignInButton = (props) => {
  const dispatch = new useDispatch();
  const [signOut, SetSignOut] = useState(null);
  const { instance, accounts } = useMsal();

  if (accounts && accounts.length > 0) {
    const userRoles = accounts[0]?.idTokenClaims?.roles;
    dispatch(setRoles(userRoles));
    dispatch(setUserName(accounts[0]?.username));
    if (!(userRoles.includes(orderRoles.OrderReadRole) || userRoles.includes(orderRoles.OrderWriteRole))) {
      handleLogout(instance);
      dispatch(setIsNoRoles(true));
    }
  }

  if (!signOut && props.forceSignOut) {
    SetSignOut(true);
    handleLogout(instance);
  }
  return (
    <Button variant="light" className="ml-auto" onClick={() => handleLogin(instance, dispatch)}>
      Sign in
    </Button>
  );
};
