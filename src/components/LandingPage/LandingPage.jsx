import React from 'react';
import { Link } from '@reach/router';

const LandingPage = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        style={{ maxWidth: '100%', height: 'auto' }}
        src="https://images.vexels.com/media/users/3/157292/isolated/preview/1013ce3cf5903ef5afe01f0fd443dc03-colorful-whole-pizza-design-by-vexels.png"
      ></img>
      <h3>This is a pizza ordering application. </h3>
      <h4>
        Please <Link to="/login">login </Link>to proceed!!
      </h4>
    </div>
  );
};

export default LandingPage;
