import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { StyledUIProvider } from 'app/components/StyledUI';
import colorStyles from 'app/config/color.styles';
import layoutStyles from 'app/config/layout.styles';
import reduxStore from 'app/store/redux';
import i18next from 'app/i18next';

export const GlobalProvider = ({ children }) => (
  <StyledUIProvider
    colorMode="dark"
    colorStyles={colorStyles}
    layoutStyles={layoutStyles}
  >
    <ReduxProvider store={reduxStore}>
      <I18nextProvider i18n={i18next}>
        <HashRouter>
          {children}
        </HashRouter>
      </I18nextProvider>
    </ReduxProvider>
  </StyledUIProvider>
);
