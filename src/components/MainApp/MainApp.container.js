import React from 'react';
import { withAuthenticationService } from '@mulesoft/anypoint-ui-react-services';
import MainApp from './MainApp';

const connectToAnypointPlatform = (ComponentToWrap) => {
  const ConnectedComponent = class AnypointMainApp extends React.PureComponent {
    componentWillMount() {
      const { authenticationService } = this.props;

      if (authenticationService.isOAuthRedirectUri() && window.location.hash !== '') {
        authenticationService.authenticateUser();
        return;
      }

      if (!authenticationService.isUserAuthenticated()) {
        authenticationService.redirectToLogin();
      }
    }

    render() {
      const { authenticationService } = this.props;

      if (!authenticationService.isUserAuthenticated()) {
        return null;
      }

      return (
        <ComponentToWrap
          {...this.props}
          userToken={authenticationService.getUserToken()}
        />
      );
    }
  };

  return withAuthenticationService(ConnectedComponent);
};


export default connectToAnypointPlatform(MainApp);
