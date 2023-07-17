import { useSelector } from '../../services';
import done from '../../images/done.svg';
import styles from './order-details.module.css';

const OrderDetails = () => {
  const order = useSelector((store) => store.orderReducer);

  return (
    <>
      <div className={`${styles.id} mt-20 mb-8`}>{order.order?.number}</div>
      <div className={`${styles.title} mb-15`}>order ID</div>
      <img className="mb-15" src={done} alt="" />
      <div className={`${styles.status} mb-2`}>Your order is being prepared</div>
      <div className={`${styles.wait} mb-20`}>
        Please wait for it to be ready at the orbital station.
      </div>
    </>
  );
};

export default OrderDetails;
