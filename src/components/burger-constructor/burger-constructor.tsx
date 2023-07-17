import { useMemo } from 'react';
import {
  ConstructorElement,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { useHistory } from 'react-router-dom';
import { Button } from '../../utils/types';
import { useSelector, useDispatch } from '../../services';
import { getOrderThunk } from '../../services/requests/order-thunk';
import {
  addIngredient,
  addBun
} from '../../services/actions/constructor-actions';
import ConstructorItem from '../constructor-item/constructor-item';
import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { bun, ingredients, allIngredientsId } = useSelector(
    (store) => store.constructorReducer
  );
  const allIngredientsList = useSelector(
    (store) => store.ingredientsReducer.ingredients
  );
  const user = useSelector((store) => store.userReducer);

  const price = useMemo(() => {
    const bunPrice = bun.length > 0 ? bun[0].price * 2 : 0;
    const ingredientsPrice =
      ingredients.length > 0 ? ingredients.reduce((s, v) => s + v.price, 0) : 0;
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const getOrder = () => {
    if (!bun.length && ingredients.length) {
      alert('Please, Add bun!');
    }
    if (user.auth && allIngredientsId.length && bun.length) {
      dispatch(getOrderThunk(allIngredientsId));
    }
    if (!user.auth && allIngredientsId.length) {
      history.replace('/login');
    }
  };

  const [, dropTarget] = useDrop({
    accept: 'ingredient-item',
    drop(id: { id: string }) {
      const ingredient = allIngredientsList.find((item) => item._id === id.id);
      if (ingredient?.type === 'bun') {
        dispatch(addBun(ingredient));
      }
      if (ingredient?.type === 'main' || ingredient?.type === 'sauce') {
        dispatch(addIngredient(ingredient));
      }
    }
  });

  return (
    <section className={`${styles.section} pt-25 pl-4 pr-4`} ref={dropTarget}>
      {bun.length === 0 && ingredients.length === 0 ? (
        <div className={styles.text}>Drag and drop ingredients</div>
      ) : (
        <>
          <div className={styles.bun}>
            {bun.length > 0 ? (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun[0].name} (top)`}
                price={bun[0].price}
                thumbnail={bun[0].image}
              />
            ) : null}
          </div>
          <div className={styles.elements}>
            {ingredients.map((elem, index) => (
              <ConstructorItem key={elem.nanoid} elem={elem} index={index} />
            ))}
          </div>
          <div className={styles.bun}>
            {bun.length > 0 ? (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun[0].name} (bottom)`}
                price={bun[0].price}
                thumbnail={bun[0].image}
              />
            ) : null}
          </div>
        </>
      )}
      <>
        <div className={`${styles.info} pr-4`}>
          <p className="text text_type_digits-medium mr-10">
            <span className="mr-2">{price}</span>
            <CurrencyIcon type="primary" />
          </p>
          <Button type="primary" size="large" htmlType="button" onClick={getOrder}>
            Place an order
          </Button>
        </div>
      </>
    </section>
  );
};

export default BurgerConstructor;
