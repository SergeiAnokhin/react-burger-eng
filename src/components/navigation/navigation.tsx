import {
  BurgerIcon,
  ListIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './navigation.module.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className={`${styles.nav} pt-4 pr-0 pb-4 pl-0`}>
      <ul className={styles.list}>
        <li className={`${styles.link} mr-10`}>
          <NavLink className={styles.link} to="/">
            <BurgerIcon
              type={location.pathname === '/' ? 'primary' : 'secondary'}
            />
            <p
              className={`text text_type_main-default pl-2 ${
                location.pathname === '/' ? '' : 'text_color_inactive'
              }`}
            >
              Builder
            </p>
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink className={styles.link} to="/feed">
            <ListIcon
              type={location.pathname === '/feed' ? 'primary' : 'secondary'}
            />
            <p
              className={`text text_type_main-default pl-2 ${
                location.pathname === '/feed' ? '' : 'text_color_inactive'
              }`}
            >
              Order Feed
            </p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
