import { Global, css } from '@emotion/core';
import {
  Box,
  Flex,
  useTheme,
} from '@trendmicro/react-styled-ui';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import compose from 'recompose/compose';
import { useStyledUI } from 'app/components/StyledUI';
import SideNav from 'app/containers/App/SideNav';
import TopNav from 'app/containers/App/TopNav';
import Dashboard from 'app/containers/Dashboard';

const NotFound = () => {
  return null;
};

const Layout = (props) => {
  const { fontSizes, lineHeights } = useTheme();
  const { getColorStyle } = useStyledUI();
  const backgroundColor = getColorStyle('defaultBackgroundColor');
  const color = getColorStyle('defaultTextColor');

  return (
    <>
      <Global
        styles={css`
          body {
            font-size: ${fontSizes.sm};
            line-height: ${lineHeights.sm};
          }
        `}
      />
      <Box
        backgroundColor={backgroundColor}
        color={color}
        fontSize="sm"
        lineHeight="sm"
        height="100vh"
        {...props}
      />
    </>
  );
};

const App = ({
  isInitializing,
}) => {
  if (isInitializing) {
    return null;
  }

  return (
    <Layout>
      <Flex height="100%">
        <Flex flex="none">
          <SideNav />
        </Flex>
        <Flex flex="auto" direction="column">
          <TopNav flex="none" />
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/dashboard" />}
            />
            <Route
              path="/dashboard"
              component={Dashboard}
            />
            <Route component={NotFound} />
          </Switch>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default compose(
  connect(
    (state, ownProps) => ({ // mapStateToProps
      isInitializing: state.container.app.isInitializing,
      error: state.container.app.error,
    }),
    (dispatch) => ({ // mapDispatchToProps
    })
  ),
)(App);
