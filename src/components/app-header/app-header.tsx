import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import Navigation from '../navigation/navigation';
import Profile from '../profile/profile';
import styles from './app-header.module.css';

const AppHeader = () => (
  <header className={`${styles.header} pt-4 pr-5 pb-4 pl-5`}>
    <div className={styles.container}>
      <Navigation />
      <Logo />
      <Profile />
    </div>
  </header>
);

export default AppHeader;
