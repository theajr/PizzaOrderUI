import { Redirect } from '@reach/router';
import React, { useContext } from 'react';
import { AppContext } from '../util/appContext';
import axios from '../util/axios';
import Loader from './Loader';

export const protectedComponent = Component => props => {
  const { state } = useContext(AppContext);
  const [stay, setStay] = React.useState(false);
  const [fetching, setFetching] = React.useState(true);
  React.useEffect(() => {
    setFetching(true);
    axios
      .get('/user')
      .then(res => {
        state.auth.profile = res;
        setStay(true);
      })
      .catch(e => {
        setStay(false);
      })
      .finally(() => {
        setFetching(false);
      });
    return () => {};
  }, []);

  if (!stay && !fetching) return <Redirect from="" to="login" noThrow />;

  return (
    <Loader show={fetching} message="Authenticating your session..">
      <Component {...props} />
    </Loader>
  );
};
