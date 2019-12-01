import React, { useEffect, useState } from 'react';
import axios from '../../util/axios';
import { SET_ADDRESSES } from '../../util/constants';
import { connect } from '../../util/appContext';
import AddressItem from '../AddressItem';
import Loader from '../Loader';
const AddressesList = props => {
  const { setAddresses, addresses = [] } = props;
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    setIsFetching(true);
    axios
      .get('/addresses')
      .then(({ data }) => {
        setAddresses(data);
      })
      .catch(e => {
        console.warn(e);
      })
      .finally(() => setIsFetching(false));
    return () => {};
  }, []);

  return (
    <Loader show={isFetching} message="Retrieving your saved addresses">
      <div>
        {!addresses.length && (
          <h3>You haven't added a adress yet, Please add one.</h3>
        )}
        {addresses.map(address => (
          <AddressItem
            key={address.street_address}
            info={address}
          ></AddressItem>
        ))}
      </div>
    </Loader>
  );
};

const mapStateToProps = state => {
  return {
    addresses: state?.auth?.profile?.addresses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAddresses: addresses =>
      dispatch({ type: SET_ADDRESSES, payload: addresses }),
    showModal: options => dispatch({ type: SHOW_MODAL, payload: options }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressesList);
