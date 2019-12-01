import { Redirect } from '@reach/router';
import React, { useContext } from 'react';
import { AppContext } from '../util/appContext';

export const protectedComponent = Component => props => {
  const { state } = useContext(AppContext);

  if (!state.auth.access_token) return <Redirect from="" to="login" noThrow />;
  return <Component {...props} />;
};
