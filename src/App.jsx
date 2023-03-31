import { PageLayout } from './components/menuBar/PageLayout';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { Alert } from 'react-bootstrap';
import TelemetryProvider from './config/telemetry/telemetry-provider';
import { getAppInsights } from './config/telemetry/appInsight';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNoRoles } from './store/tokenSlice';
import VerticalTab from './components/verticalTab';
import './App.css';
import TabPage from './components/tabs';

function App() {
  const dispatch = useDispatch();
  const { token, isNoRole } = useSelector((state) => state.token);
  const IsTabEnabled = () => {
    const queryParam = window.location.search;
    return queryParam && queryParam.includes('isTabEnabled=true');
  };
  return (
    <PageLayout>
      <BrowserRouter>
        <TelemetryProvider
          instrumentationKey={process.env.REACT_APP_APP_INSIGHT_INSTRUMENTATION_KEY}
          after={() => {
            getAppInsights();
          }}
        >
          <AuthenticatedTemplate>
            {!IsTabEnabled() && <div className="jsonArea ">{token ? <VerticalTab /> : undefined}</div>}
            {IsTabEnabled() && <div className=" border border-dark jsonArea ">{token ? <TabPage /> : undefined}</div>}
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            {isNoRole && (
              <Alert key={0} variant={'danger'} onClose={() => dispatch(setIsNoRoles(false))} dismissible>
                <Alert.Heading>Authorization Failed!</Alert.Heading>
                <p>The user you try to sign in does not have permission! Please contact the administrator.</p>
              </Alert>
            )}
          </UnauthenticatedTemplate>
        </TelemetryProvider>
      </BrowserRouter>
    </PageLayout>
  );
}
export default App;
