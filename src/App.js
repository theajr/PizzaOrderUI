/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Router, Redirect } from '@reach/router';
import _ from 'lodash';
import React, {
  Component,
  useState,
  useReducer,
  useContext,
  useEffect,
} from 'react';
import Drawer from '@material-ui/core/Drawer';

import Layout from './components/Layout/Layout';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import LandingPage from './components/LandingPage';
import { Provider, AppContext } from './util/appContext';
import Messages from './components/Messages';

import { Map, fromJS, mergeDeep } from 'immutable';
import * as Constants from './util/constants';
import UserDashboard from './components/UserDashboard/UserDashboard';
import Modal from './components/Modal/Modal';
import { Button } from '@material-ui/core';
import Loader from './components/Loader/Loader';
const NotFound = () => <p>Sorry, nothing here</p>;

const t = {
  auth: {
    access_token: null,
    token_type: null,
    user: null,
    loading: false,
    profile: {
      orders: [],
    },
  },
  cart: {},
  errors: [],
  pizzas: [],
  signup: {
    errors: null,
  },
  modalConf: {
    active: false,
    options: {},
  },
};

const App = () => {
  let initialState = { ...t };
  initialState.modalConf = { active: false, options: {} };

  const [showData, toggleShowData] = useState(false);
  const [state, dispatch] = useReducer((state, action) => {
    let prev = Map(state);

    const { type, payload } = action;
    console.log('ACTION UPDATE', type, payload);
    switch (type) {
      case 'ATTEMPT_LOGIN': {
        let n = prev.setIn(['auth', 'loading'], true);
        return n.toObject();
      }
      case Constants.LOGOUT: {
        localStorage.removeItem('pzzData');
        localStorage.removeItem('token');
        debugger;
        return {};
      }
      case Constants.LOGIN_SUCCESS: {
        // debugger;
        let n = prev.set('auth', payload);
        return n.toObject();
      }

      case Constants.SET_PROFILE: {
        const n = { ...state };
        n.auth.profile = { ...n.auth.profile, ...payload };
        debugger;
        console.log(n);
        return n;
      }
      case Constants.LOGIN_FAIL: {
        console.warn(payload);
        let n = prev.set('auth', {
          user: null,
          token: null,
          loading: false,
        });
        n = n.updateIn(['errors'], errors => [...errors, payload]);

        return n.toObject();
      }

      case Constants.REMOVE_MESSAGE: {
        let n = prev.updateIn(['errors'], errors => [
          ...errors.filter(e => e.id !== payload),
        ]);

        return n.toObject();
      }

      case Constants.SIGNUP_FAIL: {
        console.log(payload);

        let n = prev.setIn(['signup', 'errors'], payload.errors);

        return n.toObject();
      }
      case Constants.SHOW_MODAL: {
        let n = prev.set('modalConf', {
          active: true,
          options: payload,
        });
        return n.toObject();
      }
      case Constants.HIDE_MODAL: {
        let n = prev.set('modalConf', {
          active: false,
          options: {},
        });
        return n.toObject();
      }
      case Constants.UPDATE_PIZZA_RESULTS: {
        let n = prev.updateIn(['pizzas'], prev => {
          debugger;
          return _.uniqBy([...prev, ...payload], 'id');
        });
        return n.toObject();
      }
      case Constants.UPDATE_ITEM_IN_CART: {
        let prevQty = prev.getIn(['cart', payload.pizzaId]) || 0;

        if (payload.operation === 'INC') {
          let n = prev.setIn(['cart', payload.pizzaId], prevQty + 1);
          return n.toObject();
        } else if (prevQty && payload.operation === 'DEC') {
          let n = prev.setIn(['cart', payload.pizzaId], prevQty - 1);
          return n.toObject();
        }
        break;
      }

      case Constants.SET_ADDRESSES: {
        let n = prev.setIn(['auth', 'profile', 'addresses'], payload);
        return n.toObject();
      }

      case Constants.PLACE_ORDER: {
        let n = prev.setIn(['cart'], {});
        return n.toObject();
      }

      case Constants.ADD_ADDRESS_SUCCESSFUL: {
        let n = prev.updateIn(
          'auth.profile.addresses'.split('.'),
          (prev = []) => _.uniqBy([...prev, payload], 'id'),
        );

        return n.toObject();
      }

      case Constants.REMOVE_ADDRESS: {
        let n = prev.updateIn(
          'auth.profile.addresses'.split('.'),
          (prev = []) => prev.filter(a => a.id !== payload),
        );
        return n.toObject();
      }
      case Constants.LOAD_MY_ORDERS: {
        let n = prev.updateIn(['auth', 'profile', 'orders'], (prev = []) => {
          return _.orderBy(
            _.uniqBy([...payload, ...prev], 'id'),
            ['created_at'],
            ['desc'],
          );
        });

        console.log('n - ', n.toJSON());
        return n.toObject();
      }
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    initialState = mergeDeep(
      fromJS(t),
      fromJS(JSON.parse(localStorage.getItem('pzzData'))),
    ).toJS();
    window.onbeforeunload = function() {};
    return () => {};
  });
  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    toggleShowData(open);
  };

  return (
    <Provider value={{ state, dispatch }}>
      <Layout>
        <Router>
          <LandingPage path="/" />
          <LoginForm path="/login" />
          <UserDashboard path="dashboard/*" />
          <NotFound default />
          <SignUpForm path="/signup" />
        </Router>
      </Layout>

      <Modal />
      <Messages />
    </Provider>
  );
};

export default App;
