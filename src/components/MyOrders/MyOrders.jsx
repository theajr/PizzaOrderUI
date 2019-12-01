import React, { useEffect, useState } from 'react';
import axios from '../../util/axios';
import { LOAD_MY_ORDERS } from '../../util/constants';
import OrderSummary from '../OrderSummary/OrderSummary';
import { connect } from '../../util/appContext';
import Loader from '../Loader';

const MyOrders = props => {
  const [fetching, setFetching] = useState(!false);
  const { updateMyOrders, orders } = props;
  useEffect(() => {
    setFetching(true);
    axios
      .get('/orders', { params: {} })
      .then(res => {
        console.log('----', res);
        updateMyOrders(res.data);
      })
      .catch(e => console.warn)
      .finally(() => setFetching(false));
    return () => {};
  }, []);
  return (
    <Loader message="Fetching your orders.." show={fetching}>
      <div>
        {!orders.length && <h3>You didn't place any orders, yet!</h3>}
        {!fetching &&
          orders.map(order => <OrderSummary key={order.id} info={order} />)}
      </div>
    </Loader>
  );
};

const mapStateToProps = state => {
  const { orders = [] } = state?.auth?.profile || {};

  return {
    orders,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateMyOrders: orders =>
      dispatch({ type: LOAD_MY_ORDERS, payload: orders }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
