import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { SHOW_MODAL, UPDATE_ITEM_IN_CART } from '../../util/constants';
import { connect } from '../../util/appContext';

const useStyles = makeStyles({
  card: {
    // maxWidth: 345
    marginBottom: 10,
  },
  content: {
    display: 'flex',
  },
  imgWrapper: {
    marginRight: 10,
  },
});

const PizzaItem = props => {
  const {
    info,
    actions,
    children,
    updateCartWithItem,
    cart,
    showModal,
    ...rest
  } = props;
  const classes = useStyles();
  return (
    <Card className={classes.card} {...rest}>
      <CardActionArea>
        <CardContent>
          <div className={classes.content}>
            <div className={classes.imgWrapper}>
              <img src={info.imageUrl} alt={info.title} />
            </div>
            <div>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                color="textPrimary"
              >
                {info.title}
              </Typography>
              <Typography variant="body1" color="textPrimary" component="p">
                <b style={{ fontSize: '18px' }}> ${info.price}</b>{' '}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {info.description}
              </Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ButtonGroup size="small" aria-label="small outlined button group">
          <Button
            variant="outlined"
            color="primary"
            disabled={!cart.hasOwnProperty(info.id) || cart[info.id] < 1}
            onClick={() =>
              updateCartWithItem({ pizzaId: info.id, operation: 'DEC' })
            }
          >
            -
          </Button>
          <Button color="secondary" variant="outlined">
            {cart[info.id] || 0}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() =>
              updateCartWithItem({ pizzaId: info.id, operation: 'INC' })
            }
          >
            +
          </Button>
        </ButtonGroup>
        {cart[info.id] > 0 && (
          <div>
            Amount: <b>${(info.price * cart[info.id]).toFixed(2)}</b>
          </div>
        )}
        {children}
      </CardActions>
    </Card>
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
    showModal: options => dispatch({ type: SHOW_MODAL, payload: options }),
    updateCartWithItem: opts =>
      dispatch({ type: UPDATE_ITEM_IN_CART, payload: opts }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PizzaItem);
