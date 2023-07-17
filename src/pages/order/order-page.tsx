import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../services';
import { OrderInfo } from '../../components/order-info/order-info';
import { Preloader } from '../../components/preloader/preloader';
import {
  wsConnectionStart,
  wsConnectionClosed
} from '../../services/actions/ws-actions';
import {
  wsUserConnectionStart,
  wsUserConnectionClosed
} from '../../services/actions/ws-user-actions';
import { URL_GET_ORDERS } from '../../services/requests/api';
import { getCookie } from '../../utils/cookie';
import styles from './order-page.module.css';

export const OrderPage = () => {
  const dispatch = useDispatch();
  const { orders: allOrders } = useSelector((store) => store.wsReducer);
  const { orders: userOrders } = useSelector((store) => store.wsUserReducer);
  const path = location.pathname.split('/').slice(1, -1).join('/');

  const orders = path === 'feed' ? allOrders : userOrders;

  useEffect(() => {
    if (path === 'feed') {
      dispatch(wsConnectionStart(`${URL_GET_ORDERS}/all`));
      return () => {
        dispatch(wsConnectionClosed());
      };
    }
    if (path === 'profile/orders') {
      if (getCookie('token')) {
        const accessToken = getCookie('token');
        dispatch(
          wsUserConnectionStart(`${URL_GET_ORDERS}?token=${accessToken}`)
        );
        return () => {
          dispatch(wsUserConnectionClosed());
        };
      }
    }
  }, []);

  return orders.length ? (
    <main className={styles.wrapper}>
      <OrderInfo />
    </main>
  ) : (
    <Preloader />
  );
};
