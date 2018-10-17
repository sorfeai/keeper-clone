import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import configureStore from './store';
import { App } from './components';
import registerServiceWorker from './registerServiceWorker';

import './styles/bulma.scss';
import './styles/global.scss';


ReactDOM.render(
  <Provider store={configureStore()}>
    <IntlProvider locale='en'>
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
);


registerServiceWorker();
