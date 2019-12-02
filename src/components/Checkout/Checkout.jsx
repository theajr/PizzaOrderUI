import React, { useState, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from '@reach/router';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from '../../util/appContext';
import PizzaItem from '../PizzaItem/PizzaItem';
import { PLACE_ORDER, SET_ADDRESSES, SHOW_MODAL } from '../../util/constants';
import { Button } from '@material-ui/core';
import axios from '../../util/axios';
import Loader from '../Loader';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  items: {
    width: '70%',
    [theme.breakpoints.down('md')]: {
      width: 'auto',
    },
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
const Checkout = props => {
  console.log('check', props);
  const classes = useStyles();
  const { addresses = [], setAddresses, placeOrder, showModal } = props;
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loadingAdresses, setLoadingAdresses] = useState(false);
  const [noAdderesses, setNoAdderesses] = useState(false);
  useEffect(() => {
    setLoadingAdresses(true);
    axios
      .get('/addresses')
      .then(({ data }) => {
        setAddresses(data);
        if (!data.length) {
          setNoAdderesses(true);
        }
      })
      .catch(e => {
        console.warn(e);
      })
      .finally(() => {
        setLoadingAdresses(false);
      });

    return () => {};
  }, []);
  const [addressID, setAddressID] = useState(
    addresses && addresses[0] ? addresses[0].id : 0,
  );
  const [open, setOpen] = React.useState(false);
  const [placingOrder, setPlacingOrder] = React.useState(false);

  const triggerPlaceOrder = () => {
    setPlacingOrder(true);
    axios
      .post('/orders', { cart: props.cart, address_id: addressID })
      .then(res => {
        showModal({
          title: 'Order Placed successfully!',
          description: <div>Your order will be delivered soon!</div>,
          onClickOK: () => {
            placeOrder();
            setOrderPlaced(true);
          },
        });
      })
      .catch(e => console.warn)
      .finally(() => {
        setPlacingOrder(false);
      });
  };

  const handleChange = event => {
    setAddressID(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const amount = props.items.reduce(
    (total, item) => (total += item.qty * item.price),
    0,
  );
  if (orderPlaced)
    return <Redirect from="" to="/dashboard/my-orders" noThrow />;
  return (
    <Loader message="Placing your order..." show={placingOrder}>
      <div className={classes.root}>
        <div className={classes.items}>
          <h3 style={{ textAlign: 'center' }}>
            {!props.items.length
              ? 'Ooops, Your cart is empty!'
              : 'Pizzas in your cart:'}
          </h3>

          {props.items.map(p => (
            <PizzaItem info={p} key={p.id} cart={props.cart}></PizzaItem>
          ))}
        </div>
        {props.items.length && (
          <div style={{ textAlign: 'center' }}>
            <h3>Total: {amount.toFixed(2)}</h3>
            {!loadingAdresses ? (
              noAdderesses ? (
                'Please add atleast one address under your profile'
              ) : (
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-controlled-open-select-label">
                    Select delivery address
                  </InputLabel>

                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={addressID}
                    onChange={handleChange}
                  >
                    {addresses.map(adress => (
                      <MenuItem value={adress.id} key={adress.street_address}>
                        {adress.street_address}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )
            ) : (
              'Fetching your addresses...'
            )}
            <br />
            <Button
              variant="contained"
              disabled={
                props.items.length === 0 ||
                addressID == 0 ||
                noAdderesses ||
                loadingAdresses
              }
              color="primary"
              onClick={triggerPlaceOrder}
            >
              Place order
            </Button>
          </div>
        )}
      </div>
    </Loader>
  );
};

const mapStateToProps = state => {
  return {
    cart: state?.cart,
    addresses: state?.auth?.profile?.addresses,
    items: state?.pizzas
      .filter(pizza => state.cart[pizza.id] > 0)
      .map(i => {
        i.qty = state.cart[i.id];
        return i;
      }),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setAddresses: addresses =>
      dispatch({ type: SET_ADDRESSES, payload: addresses }),
    placeOrder: cart => dispatch({ type: PLACE_ORDER, payload: cart }),
    showModal: options => dispatch({ type: SHOW_MODAL, payload: options }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
