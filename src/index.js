import React from 'react';
import { render } from 'react-dom';
import { ShellContext, LocalStorageStoreService, LocationRouterService } from '@mulesoft/anypoint-ui-react-services';

import './styles.scss';

const mainAppContainer = document.getElementById('root');

const renderMainApp = () => {
  const authCredentials = { clientId: 'ui-shell', oauthRedirectUri: '/' };
  const MainApp = require('./components').default; // eslint-disable-line global-require
  render(
    <ShellContext
      authCredentials={authCredentials}
      storeService={new LocalStorageStoreService()}
      routerService={new LocationRouterService()}
    >
      <MainApp />
    </ShellContext>,
    mainAppContainer,
  );
};

// In production, this flag will be set to false
// and the (dead) code will be removed by the uglify plugin
// (see https://webpack.github.io/docs/hot-module-replacement.html)
if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./components', () => {
      renderMainApp();
    });
  }
}

renderMainApp();
