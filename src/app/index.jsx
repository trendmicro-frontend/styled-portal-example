import { CSSBaseline } from '@trendmicro/react-styled-ui';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app/containers/App';
import { GlobalProvider } from 'app/context';
import rootSaga from 'app/sagas';
import reduxStore from 'app/store/redux';
import './styles/app.styl';

reduxStore.runSaga(rootSaga);

const container = document.createElement('div');
document.body.appendChild(container);

ReactDOM.render(
  <GlobalProvider>
    <CSSBaseline />
    <App />
  </GlobalProvider>,
  container
);
