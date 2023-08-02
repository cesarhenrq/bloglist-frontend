import React from "react";

const LoginForm = ({ credentials, onSubmit, onChange }) => {
  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={onSubmit}>
        <div>
          username
          <input
            type='text'
            value={credentials.username}
            name='username'
            onChange={onChange}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={credentials.password}
            name='password'
            onChange={onChange}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
