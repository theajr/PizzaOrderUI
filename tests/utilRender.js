import Enzyme, { shallow } from 'enzyme';
import React from 'react';
import { AppContext } from '../src/util/appContext';
const dummyData = {
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
export const renderComp = Komp => {
  return shallow(
    <AppContext.Provider value={dummyData}>
      <Komp />
    </AppContext.Provider>,
  );
};
