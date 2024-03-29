import Button from '@material-ui/core/Button';
import React, { useEffect, useState, useRef } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { connect } from '../../util/appContext';
import axios from '../../util/axios';
import {
  SHOW_MODAL,
  UPDATE_ITEM_IN_CART,
  UPDATE_PIZZA_RESULTS,
} from '../../util/constants';
import PizzaItem from '../PizzaItem/PizzaItem';
import Loader from '../Loader';
import { useIntersection } from '../../util/intersectionObserver';

const PizzaItemsList = props => {
  const { updateCartWithItem, cart, pizzas, appendToPizzas } = props;
  const [options, setOptions] = useState({ page: 1, limit: 20 });
  const [fetching, setFetching] = useState(false);
  const { observerEntry, elRef } = useIntersection({ threshold: 0.5 });

  const [noMoreResults, setNoMoreResults] = useState(false);

  useEffect(() => {
    setFetching(true);

    axios
      .get('/pizzas', { params: options })
      .then(res => {
        appendToPizzas(res.data);
        if (res.data.length == 0) {
          setNoMoreResults(true);
        }
      })
      .catch(e => console.warn)
      .finally(() => {
        setFetching(false);
      });
    return () => {};
  }, []);

  let filtered = pizzas.filter(p => {
    return true;
  });

  if (observerEntry.isIntersecting) {
    console.log('OOOOO');
  }
  return (
    <Loader message="Fetching Pizzas for you.." show={fetching}>
      <div>
        {filtered.map(p => (
          <PizzaItem
            info={p}
            key={p.id}
            updateCartWithItem={updateCartWithItem}
            cart={props.cart}
          ></PizzaItem>
        ))}
        <div className="sentinel" ref={elRef}>
          Loading more..
        </div>
      </div>
    </Loader>
  );
};

const mapStateToProps = state => {
  const { pizzas, cart } = state;

  return {
    pizzas,
    cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    appendToPizzas: morePizzas =>
      dispatch({ type: UPDATE_PIZZA_RESULTS, payload: morePizzas }),
    showModal: options => dispatch({ type: SHOW_MODAL, payload: options }),
    updateCartWithItem: opts =>
      dispatch({ type: UPDATE_ITEM_IN_CART, payload: opts }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PizzaItemsList);
