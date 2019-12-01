import React, { useState } from 'react';
import { connect } from '../../util/appContext';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from '../AddressForm/AddressForm';
import { Collapse } from '@material-ui/core';
import AddressesList from '../AddressesList/AddressesList';

const useStyles = makeStyles(theme => ({
  card: {
    // maxWidth: 300,
  },
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));

const Profile = React.memo(props => {
  const { profile, totalOrders } = props;
  const [addAdress, setAddAddress] = useState(false);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          component="img"
          alt={profile.first_name}
          height="140"
          image={
            profile.avatar || 'https://www.w3schools.com/howto/img_avatar.png'
          }
          title={profile.first_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {profile.first_name}, {profile.last_name}
          </Typography>
          <Typography variant="caption" color="textSecondary" component="p">
            Orders Placed so far: <b>{totalOrders} </b>
          </Typography>
        </CardContent>
      </Card>
      <div>
        <Button onClick={() => setAddAddress(true)}>Add New Address</Button>
        {!addAdress && (
          <>
            {' '}
            <Typography variant="h6" gutterBottom align="left">
              Saved Addresses
            </Typography>
            <AddressesList />
          </>
        )}
        {addAdress && <AddressForm onSuccess={() => setAddAddress(false)} />}
      </div>
    </div>
  );
});

const mapStateToProps = state => {
  return {
    totalOrders: state.auth.totalOrders,
    profile: state.auth.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: data => dispatch({ type: 'UPDATE_PROFILE', paylod: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
