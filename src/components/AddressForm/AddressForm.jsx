import React, { useState } from 'react';
// import PropTypes from 'prop-types'
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ADD_ADDRESS_SUCCESSFUL,
  ADD_ADDRESS_FAIL,
} from '../../util/constants';
import { connect } from '../../util/appContext';
import axios from '../../util/axios';
import { toBase64 } from '../../util/image';
import Loader from '../Loader';

const validationSchema = Yup.object({
  street_address: Yup.string('Enter Flat/Buidling number/Street name').required(
    'Flat/Buidling number/Street name is required',
  ),
  city: Yup.string('Enter city').required('City is required'),
  landmark: Yup.string('Enter Landmark'),

  state: Yup.string('Enter state').required('state is required'),
  country: Yup.string('Enter country').required('Country is required'),
  pincode: Yup.string('Enter PIN code').required('PIN code is required'),
});

const AddressForm = props => {
  const [inProgress, setInProgress] = useState(false);
  const { onSuccessFullAddressAdd, onSuccess } = props;
  const values = {
    street_address: '',
    city: '',
    landmark: '',
    state: '',
    country: '',
    pincode: '',
  };

  return (
    <Loader
      show={inProgress}
      message="Please wait, we are trying to save your address.."
    >
      <Formik initialValues={values} validationSchema={validationSchema}>
        {props => {
          const {
            values,
            values: { street_address, city, landmark, state, country, pincode },
            errors,
            touched,
            handleChange,
            isValid,
            setFieldTouched,
          } = props;

          const attemptSignUp = e => {
            e.preventDefault();
            setInProgress(true);
            axios
              .post('/addresses', values)
              .then(res => {
                onSuccessFullAddressAdd(res);

                onSuccess();
              })
              .catch(e => {
                debugger;
              })
              .finally(() => {
                debugger;
                setInProgress(false);
              });
          };
          const change = (name, e) => {
            e.persist();

            handleChange(e);
            setFieldTouched(name, true, false);
          };
          return (
            <div>
              <h3>Add new address</h3>
              <form autoComplete="off" onSubmit={attemptSignUp}>
                <TextField
                  id="street_address"
                  name="street_address"
                  helperText={
                    touched.street_address ? errors.street_address : ''
                  }
                  error={
                    touched.street_address && Boolean(errors.street_address)
                  }
                  label="Flat Number/Buidling/Street"
                  value={street_address}
                  onChange={change.bind(null, 'street_address')}
                  fullWidth
                />
                <TextField
                  id="city"
                  name="city"
                  helperText={touched.city ? errors.city : ''}
                  error={touched.city && Boolean(errors.city)}
                  label="City"
                  value={city}
                  onChange={change.bind(null, 'city')}
                  fullWidth
                />
                <TextField
                  id="landmark"
                  name="landmark"
                  helperText={touched.landmark ? errors.landmark : ''}
                  error={touched.landmark && Boolean(errors.landmark)}
                  label="Landmark"
                  fullWidth
                  value={landmark}
                  onChange={change.bind(null, 'landmark')}
                />

                <TextField
                  id="state"
                  name="state"
                  helperText={touched.state ? errors.state : ''}
                  error={touched.state && Boolean(errors.state)}
                  label="State"
                  fullWidth
                  value={state}
                  onChange={change.bind(null, 'state')}
                />
                <TextField
                  id="country"
                  name="country"
                  helperText={touched.country ? errors.country : ''}
                  error={touched.country && Boolean(errors.country)}
                  label="country"
                  fullWidth
                  value={country}
                  onChange={change.bind(null, 'country')}
                />
                <TextField
                  id="pincode"
                  name="pincode"
                  helperText={touched.pincode ? errors.pincode : ''}
                  error={touched.pincode && Boolean(errors.pincode)}
                  label="pincode"
                  fullWidth
                  value={pincode}
                  onChange={change.bind(null, 'pincode')}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!isValid}
                >
                  Submit
                </Button>
              </form>
            </div>
          );
        }}
      </Formik>
    </Loader>
  );
};

const mapStateToProps = state => {
  return {
    auth: state?.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSuccessFullAddressAdd: ({ data }) => {
      dispatch({ type: ADD_ADDRESS_SUCCESSFUL, payload: data });
    },
    onSignUpFail: err => dispatch({ type: ADD_ADDRESS_FAIL, payload: err }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);
