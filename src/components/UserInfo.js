import React from 'react';
import PropTypes from 'prop-types';

const UserInfo = ({ user }) => {
  return <div>{user.name} logged in</div>;
};

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserInfo;
