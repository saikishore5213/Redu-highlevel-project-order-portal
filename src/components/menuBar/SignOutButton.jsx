import { useMsal } from '@azure/msal-react';
import Button from 'react-bootstrap/Button';

function handleLogout(instance, account) {
  const logOutRequest = {
    account,
  };
  instance.logout(logOutRequest);
}

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = () => {
  const { instance, accounts } = useMsal();
  return (
    <Button variant="link" className="signOutButton" onClick={() => handleLogout(instance, accounts[0])}>
      Sign out
    </Button>
  );
};
