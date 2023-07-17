import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../services';
import { FeedOrders } from '../../components/feed-orders/feed-orders';
import { Preloader } from '../../components/preloader/preloader';
import { StatisticOrders } from '../../components/statistic-orders/statistic-orders';
import {
  wsConnectionClosed,
  wsConnectionStart
} from '../../services/actions/ws-actions';
import { URL_GET_ORDERS } from '../../services/requests/api';
import styles from './feed-page.module.css';

export const FeedPage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.wsReducer);

  useEffect(() => {
    dispatch(wsConnectionStart(`${URL_GET_ORDERS}/all`));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  return !orders.length ? (
    <Preloader />
  ) : (
    <main className={styles.wrapper}>
      <div className={styles.feed}>
        <h1 className={styles.title}>Order Feed</h1>
        <FeedOrders orders={orders} />
      </div>
      <StatisticOrders />
    </main>
  );
};
