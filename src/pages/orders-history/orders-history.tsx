import { NavLink } from 'react-router-dom';
import styles from './orders-history.module.css';

export const OrdersHistoryPage = () => (
  <main className={styles.wrapper}>
    <div className={styles.profileMenu}>
      <ul className={styles.menuItems}>
        <li className={styles.menuItem}>
          <NavLink
            to="/profile"
            className={styles.menuLink}
            activeClassName={styles.activeLink}
          >
            Profile
          </NavLink>
        </li>
        <li className={styles.menuItem}>
          <NavLink
            to="/profile/orders"
            className={styles.menuLink}
            activeClassName={styles.activeLink}
          >
            Order History
          </NavLink>
        </li>
        <li className={styles.menuItem}>
          <NavLink
            to="/profile/exit"
            className={styles.menuLink}
            activeClassName={styles.activeLink}
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
      <h1>OrdersHistoryPage</h1>
    </div>
  </main>
);
