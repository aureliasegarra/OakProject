// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import
import './styles.scss';

import { getAvatar } from 'src/selectors';

// == Composant
const UserInfos = ({
  username, email, avatar, badge,
}) => (
  <div className="userprofile-infos">
    <div className="userprofile-infos__avatar">
      <img src={getAvatar(avatar)} alt="Avatar" />
    </div>
    <div className="userprofile-infos__details">
      <h1 className="userprofile-infos__username">{username}</h1>
      <p className="userprofile-infos__email">{email}</p>
    </div>
    <div className="userprofile-infos__badges">
      {badge}
    </div>
  </div>
);

UserInfos.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.number,
  badge: PropTypes.string,
};

UserInfos.defaultProps = {
  avatar: 1,
  badge: 'Vous n\'avez pas encore reçu de badge',
};

// == Export
export default UserInfos;
