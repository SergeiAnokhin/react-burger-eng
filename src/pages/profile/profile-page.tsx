import { NavLink, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../services';
import { ProfileInfo } from '../../components/profile-info/profile-info';
import { logoutUserThunk } from '../../services/requests/user-thunk';
import { ProtectedRoute } from '../../components/ProtectedRoute/protected-route';
import { Preloader } from '../../components/preloader/preloader';
import { FeedOrders } from '../../components/feed-orders/feed-orders';
import { URL_GET_ORDERS } from '../../services/requests/api';
import {
  wsUserConnectionStart,
  wsUserConnectionClosed
} from '../../services/actions/ws-user-actions';
import { getCookie } from '../../utils/cookie';
import styles from './profile-page.module.css';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.userReducer);
  const { orders } = useSelector((store) => store.wsUserReducer);

  const logout = () => {
    dispatch(logoutUserThunk());
  };

  useEffect(() => {
    if (getCookie('token')) {
      dispatch(
        wsUserConnectionStart(`${URL_GET_ORDERS}?token=${getCookie('token')}`)
      );
    }
    return () => {
      dispatch(wsUserConnectionClosed());
    };
  }, []);

  return (
    <main className={styles.wrapper}>
      <div className={styles.profileMenu}>
        <ul className={styles.menuItems}>
          <li className={styles.menuItem}>
            <NavLink
              to="/profile"
              className={styles.menuLink}
              activeClassName={styles.activeLink}
              isActive={(match, location) => {
                if (!match) {
                  return false;
                }

                if (location.pathname === '/profile') return true;

                return false;
              }}
            >
              Profile
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink
              to="/profile/orders"
              className={styles.menuLink}
              activeClassName={styles.activeLink}
              isActive={(match, location) => {
                if (!match) {
                  return false;
                }

                if (location.pathname === '/profile/orders') return true;

                return false;
              }}
            >
              Order History
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink
              to="/login"
              className={styles.menuLink}
              activeClassName={styles.activeLink}
              isActive={(match, location) => {
                if (!match) {
                  return false;
                }

                if (location.pathname === '/login') return true;

                return false;
              }}
              onClick={logout}
            >
              Log Out
            </NavLink>
          </li>
        </ul>
        <p className={styles.menuText}>
          In this section, you can update your personal information
        </p>
      </div>

      <div className={styles.profileContent}>
        <Switch>
          <ProtectedRoute exact path="/profile">
            {!user.name ? <Preloader /> : <ProfileInfo />}
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile/orders">
            {!orders.length ? <Preloader /> : <FeedOrders orders={orders} />}
          </ProtectedRoute>
        </Switch>
      </div>
    </main>
  );
};
