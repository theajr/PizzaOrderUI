import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CameraEnhanceOutlinedIcon from '@material-ui/icons/CameraEnhanceOutlined';
import { Redirect } from '@reach/router';
// import PropTypes from 'prop-types'
import { Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { connect } from '../../util/appContext';
import axios from '../../util/axios';
import { SIGNUP_FAIL, SIGNUP_SUCCESS } from '../../util/constants';
import { toBase64 } from '../../util/image';
import Loader from '../Loader';

const validationSchema = Yup.object({
  first_name: Yup.string('Enter a First name').required(
    'First Name is required',
  ),
  last_name: Yup.string('Enter a Last name').required('Last Name is required'),

  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string('')
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password'),
  confirmPassword: Yup.string('Enter your password')
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Password does not match'),
});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  dp: {
    backgroundPosition: ' center center',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '50%',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      maxWidth: 300,
    },
  },
}));

const SignUpForm = props => {
  const classes = useStyles();
  const { onSignUpSuccess, onSignUpFail } = props;
  const [avatar, setAvatar] = useState(
    'https://www.w3schools.com/howto/img_avatar.png',
  );
  const values = {
    first_name: 'AJay Kumar',
    last_name: 'Pathuri',
    email: 'theajr@gmail.com',
    confirmPassword: '12121212',
    password: '12121212',
  };
  const [signingUp, setSigningUp] = useState(false);
  const [signedUP, setSignedUP] = useState(false);

  if (props.auth.access_token || signedUP)
    return <Redirect from="" to="/login" noThrow />;
  return (
    <Loader message="Creating your profile..." show={signingUp}>
      <Formik initialValues={values} validationSchema={validationSchema}>
        {props => {
          const {
            values,
            values: { first_name, last_name, email, password, confirmPassword },
            errors,
            touched,
            handleChange,
            isValid,
            setFieldTouched,
          } = props;

          const attemptSignUp = e => {
            e.preventDefault();
            setSigningUp(true);
            if (avatar) values.avatar = avatar;
            axios
              .post('/signup', values)
              .then(res => {
                onSignUpSuccess(res);
                setSignedUP(true);
              })
              .catch(e => {
                alert(
                  'Something went wrong.. Please try again with a different email',
                );
              })
              .finally(() => setSigningUp(false));
          };
          const change = (name, e) => {
            e.persist();
            if (e.target.name === 'avatar') {
              const files = Array.from(e.target.files);
              files.forEach(async (file, i) => {
                const bas = await toBase64(file);
                setAvatar(bas);
              });
            } else {
              handleChange(e);
              setFieldTouched(name, true, false);
            }
          };
          return (
            <div>
              <h3>Singup</h3>
              <form autoComplete="off" onSubmit={attemptSignUp}>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}
                >
                  <div
                    className={classes.dp}
                    style={{ backgroundImage: `url(${avatar})` }}
                  >
                    <img
                      src={avatar}
                      alt="Profile"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    <input
                      accept="image/*"
                      id="avatar"
                      type="file"
                      style={{ visibility: 'hidden', width: 0, height: 0 }}
                      name="avatar"
                      onChange={change.bind(null, 'avatar')}
                    />
                    <label htmlFor="avatar" style={{ position: 'absolute' }}>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <CameraEnhanceOutlinedIcon />
                      </IconButton>
                    </label>
                  </div>
                  <div>
                    <TextField
                      id="first_name"
                      name="first_name"
                      helperText={touched.first_name ? errors.first_name : ''}
                      error={touched.first_name && Boolean(errors.first_name)}
                      label="First Name"
                      value={first_name}
                      onChange={change.bind(null, 'first_name')}
                      fullWidth
                    />
                    <TextField
                      id="last_name"
                      name="last_name"
                      helperText={touched.last_name ? errors.last_name : ''}
                      error={touched.last_name && Boolean(errors.last_name)}
                      label="Last Name"
                      value={last_name}
                      onChange={change.bind(null, 'last_name')}
                      fullWidth
                    />
                    <TextField
                      id="email"
                      name="email"
                      helperText={touched.email ? errors.email : ''}
                      error={touched.email && Boolean(errors.email)}
                      label="Email"
                      fullWidth
                      value={email}
                      onChange={change.bind(null, 'email')}
                    />

                    <TextField
                      id="password"
                      name="password"
                      helperText={touched.password ? errors.password : ''}
                      error={touched.password && Boolean(errors.password)}
                      label="Password"
                      fullWidth
                      type="password"
                      value={password}
                      onChange={change.bind(null, 'password')}
                    />
                    <TextField
                      id="confirmPassword"
                      name="confirmPassword"
                      helperText={
                        touched.confirmPassword ? errors.confirmPassword : ''
                      }
                      error={
                        touched.confirmPassword &&
                        Boolean(errors.confirmPassword)
                      }
                      label="Confirm Password"
                      fullWidth
                      type="password"
                      value={confirmPassword}
                      onChange={change.bind(null, 'confirmPassword')}
                    />
                    <br />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={!isValid}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
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
    onSignUpSuccess: ({ data }) => {
      debugger;
      dispatch({ type: SIGNUP_SUCCESS, payload: data });
    },
    onSignUpFail: err => dispatch({ type: SIGNUP_FAIL, payload: err }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
