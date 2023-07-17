import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './profile.module.css';

const Profile = () => {
  const location = useLocation();

  return (
    <NavLink className={styles.link} to="/profile">
      <ProfileIcon
        type={location.pathname === '/profile' ? 'primary' : 'secondary'}
      />
      <p
        className={`text text_type_main-default pl-2 ${
          location.pathname === '/profile' ? '' : 'text_color_inactive'
        }`}
      >
        Personal Account
      </p>
    </NavLink>
  );
};

export default Profile;
