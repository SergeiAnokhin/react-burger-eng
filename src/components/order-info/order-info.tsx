import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from '../../services';
import { formatDate } from '../../utils/formatDate';
import { TOrder } from '../../utils/types';
import { Preloader } from '../preloader/preloader';
import styles from './order-info.module.css';

export const OrderInfo = () => {
  const { id: itemId }: { id: string } = useParams();
  const [order, setOrder] = useState<TOrder>();
  const { ingredients } = useSelector((store) => store.ingredientsReducer);
  const { orders: allOrders } = useSelector((store) => store.wsReducer);
  const { orders: userOrders } = useSelector((store) => store.wsUserReducer);
  const { open } = useSelector((store) => store.itemReducer);
  const history = useHistory();
  const orders =
    location.pathname.split('/').slice(1, -1).join('/') === 'feed'
      ? allOrders
      : userOrders;

  useEffect(() => {
    setOrder(orders.find((item) => itemId === item._id));
  }, []);

  useEffect(() => {
    !open ? history.replace(`${location.pathname}`) : '';
  }, []);

  if (!order) {
    return <Preloader />;
  }

  return (
    <>
      <div
        className={
          !open ? `${styles.number} ${styles.numberCenter}` : styles.number
        }
      >{`#${order.number}`}</div>
      <h1 className={styles.title}>{order.name}</h1>
      <div className={styles.status}>
        {order.status === 'done' ? 'Done' : 'In progress'}
      </div>
      <h2 className={styles.title}>Ingredients:</h2>
      <div className={styles.ingredients}>
        {Array.from(
          new Set(
            order.ingredients.map((item) =>
              ingredients.find((elem) => item === elem._id)
            )
          )
        ).map(
          (elem) =>
            elem && (
              <div key={nanoid()} className={styles.ingredient}>
                <div className={styles.iconWrapper}>
                  <img className={styles.icon} src={elem.image_mobile} alt="" />
                </div>
                <h3 className={styles.name}>{elem.name}</h3>
                <div className={styles.price}>
                  <p className={styles.count}>{`${
                    order.ingredients.filter((item) => item === elem._id).length
                  } x ${elem.price}`}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            )
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.date}>{formatDate(order.createdAt)}</div>
        <div className={styles.total}>
          <p>
            {order.ingredients
              .map((elem) => ingredients.find((elem1) => elem === elem1._id))
              .reduce((acc, obj) => (obj ? acc + obj.price : acc), 0)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </>
  );
};
