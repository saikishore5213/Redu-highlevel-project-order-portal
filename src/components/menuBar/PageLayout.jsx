import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useIsAuthenticated, useMsal, useMsalAuthentication } from '@azure/msal-react';
import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';
import { Nav, NavDropdown } from 'react-bootstrap';
import { orderRoles, urls } from '../../util/Constants';
import { useSelector } from 'react-redux';
import { showTab } from '../../util/helper';

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = useMsalAuthentication();
  const { accounts } = useMsal();
  const name = accounts[0] && accounts[0].name;
  const isSignedOut = isUserSignedOut(auth, isAuthenticated);
  const { roles } = useSelector((state) => state.token);
  console.log(roles)
  const openAuditReport = () => {
    window.open(urls.auditReportUrl, '_blank').focus();
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>Orders Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {isSignedOut ? (
                <SignInButton forceSignOut={isSignedOut} />
              ) : isAuthenticated ? (
                <NavDropdown title={name} id="collasible-nav-dropdown">
                  {showTab(roles, orderRoles.OrderWriteRole) && (
                    <NavDropdown.Item onClick={(e) => openAuditReport()}> Audit Report </NavDropdown.Item>
                  )}
                  <NavDropdown.Item>{<SignOutButton />}</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <SignInButton />
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {props.children}
    </>
  );
};

function isUserSignedOut(auth, isAuthenticated) {
  if (!auth?.result?.accessToken && isAuthenticated) {
    return true;
  }
  return false;
}
