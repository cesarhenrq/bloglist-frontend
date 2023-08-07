import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ credentials, onSubmit, onChange }) => {
  return (
    <div className="login-form-container">
      <h2>Login to application</h2>
      <form onSubmit={onSubmit} className="login-form">
        <div>
          username
          <input
            type="text"
            value={credentials.username}
            name="username"
            id="username"
            onChange={onChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={credentials.password}
            name="password"
            id="password"
            onChange={onChange}
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  credentials: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LoginForm;
