import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from '../../services';
import { Preloader } from '../preloader/preloader';
import styles from './ingredient-details.module.css';

const IngredientDetails = () => {
  const history = useHistory();
  const itemId = location.pathname.split('/').slice(-1)[0];
  const ingredient = useSelector(
    (store) => store.ingredientsReducer.ingredients
  ).find((elem) => elem._id === itemId);

  useEffect(() => {
    !ingredient ? history.replace(`/ingredients/${itemId}`) : '';
  }, []);

  return !ingredient ? (
    <Preloader />
  ) : (
    <>
      <img src={ingredient.image_large} alt="" />
      <h4 className={`${styles.title} mb-8`}>{ingredient.name}</h4>
      <div className={`${styles.items}`}>
        <div className={`${styles.item}`}>
          <div className={`${styles.name} mb-2`}>Calories, kcal</div>
          <div className={`${styles.value}`}>{ingredient.calories}</div>
        </div>
        <div className={`${styles.item}`}>
          <div className={`${styles.name} mb-2`}>Protein, g</div>
          <div className={`${styles.value}`}>{ingredient.proteins}</div>
        </div>
        <div className={`${styles.item}`}>
          <div className={`${styles.name} mb-2`}>Fat, g</div>
          <div className={`${styles.value}`}>{ingredient.fat}</div>
        </div>
        <div className={`${styles.item}`}>
          <div className={`${styles.name} mb-2`}>Carbohydrates, g</div>
          <div className={`${styles.value}`}>{ingredient.carbohydrates}</div>
        </div>
      </div>
    </>
  );
};

export default IngredientDetails;
