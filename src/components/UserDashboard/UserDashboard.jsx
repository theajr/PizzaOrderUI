import React, { useEffect } from 'react';
import { Router, Link } from '@reach/router';
import { protectedComponent } from '../Protected';
import { connect } from '../../util/appContext';
import PizzaItemsList from '../PizzaItemsList/PizzaItemsList';
import Profile from '../Profile/Profile';
import Checkout from '../Checkout';
import MyOrders from '../MyOrders/MyOrders';

const UserDashboard = props => {
  console.log('DASH board', props);
  const { profile = {} } = props;

  return (
    <div>
      <Router>
        <PizzaItemsList path="/" />
        <Profile path="profile" />
        <Checkout path="checkout" />
        <MyOrders path="my-orders" />
      </Router>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state?.auth?.access_token ? true : false,
    profile: state?.auth?.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: item => dispatch({ type: 'ADD_TO_CART', payload: item }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(protectedComponent(UserDashboard));
