import { Redirect } from '@reach/router';

import React, { useContext, useState } from 'react';
// import PropTypes from 'prop-types'
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import axios from '../../util/axios';
import { connect } from '../../util/appContext';
import Loader from '../Loader/Loader';

const LoginForm = props => {
  console.log('Login fprops', props);

  const { onLoginSuccess, onLoginFail } = props;
  const [reqInProgress, toggleReqInProgress] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string('')
      .min(8, 'Password must contain at least 8 characters')
      .required('Enter your password'),
  });

  const values = {
    email: '',
    password: '',
    rememberMe: false,
  };
  if (props.auth.access_token)
    return <Redirect from="" to="/dashboard" noThrow />;
  return (
    <Loader show={reqInProgress} message="Trying to log you in..">
      <Formik initialValues={values} validationSchema={validationSchema}>
        {props => {
          const {
            values,
            values: { email, password, rememberMe },
            errors,
            touched,
            handleChange,
            isValid,
            setFieldTouched,
          } = props;

          const attemptLogin = e => {
            e.preventDefault();
            toggleReqInProgress(true);
            axios
              .post('/login', values)
              .then(res => {
                localStorage.setItem('token', res.data.access_token);
                onLoginSuccess(res);
              })
              .catch(e => {
                onLoginFail({
                  id: 'loginFail',
                  message: e?.response?.data,
                });
              })
              .finally(() => {
                toggleReqInProgress(false);
              });
          };
          const changeHandler = e => {
            console.log(e.target.checked, values);
            e.stopPropagation();

            handleChange(e);
            if (e.target.name === 'rememberMe') {
              values['rememberMe'] = !e.target.checked;
            }
            setFieldTouched(e.target.name, true, false);
          };
          if (reqInProgress) return 'Loading... Please wait';
          return (
            <div>
              <h3>Login</h3>
              <form autoComplete="off" onSubmit={attemptLogin}>
                <TextField
                  id="email"
                  name="email"
                  helperText={touched.email ? errors.email : ''}
                  error={touched.email && Boolean(errors.email)}
                  label="Email"
                  fullWidth
                  value={email}
                  onChange={changeHandler}
                />
                <TextField
                  id="password"
                  name="password"
                  helperText={touched.password ? errors.password : ''}
                  error={touched.password && Boolean(errors.password)}
                  label="Password"
                  fullWidth
                  style={{ marginBottom: 10 }}
                  type="password"
                  value={password}
                  onChange={changeHandler}
                />
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={rememberMe}
                        onChange={changeHandler}
                        color="primary"
                        name="rememberMe"
                      />
                    }
                    label="Remember me"
                  />
                </FormGroup>
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
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginSuccess: ({ data }) => {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    },
    onLoginFail: err => dispatch({ type: 'LOGIN_FAIL', payload: err.message }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
