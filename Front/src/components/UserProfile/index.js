// == Import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
} from 'react-router-dom';

import UserInfos from 'src/containers/UserProfile/UserInfos';
import AddList from 'src/containers/UserProfile/AddList';
import List from 'src/containers/UserProfile/List';

// == Import
import './styles.scss';

// == Composant
const UserProfile = ({
  isLogged, lists, fetchUserInfos,
}) => {
  useEffect(() => {
    fetchUserInfos();
  }, []);

  return (
    <>
      {isLogged && (
      <main className="userprofile-main">
        <UserInfos />
        <AddList />
        <div className="userprofile-lists-container">
          {lists.map((list) => (
            <List
              key={list.id}
              id={list.id}
              {...list}
            />
          ))}
        </div>
      </main>
      )}
      {!isLogged && (
      <>
        <p>Vous devez être connecté pour accéder à votre profil</p>
        <NavLink to="/login">
          <button type="button">
            Se connecter
          </button>
        </NavLink>
      </>
      )}
    </>
  );
};

UserProfile.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  lists: PropTypes.array,
  fetchUserInfos: PropTypes.func,
};

UserProfile.defaultProps = {
  lists: [],
  fetchUserInfos: () => {},
};

// == Export
export default UserProfile;
