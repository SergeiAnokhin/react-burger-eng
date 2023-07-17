import { useSelector } from '../../services';
import IngredientsItem from '../ingredients-item/ingredients-item';
import styles from './ingredients-list.module.css';

type TIngredientList = {
  name: string;
  type: string;
  id: string;
};

const IngredientsList = (props: TIngredientList) => {
  const data = useSelector((store) => store.ingredientsReducer.ingredients);
  const type = props.type;

  return (
    <>
      <h2 className="text text_type_main-medium mb-6" id={props.id}>
        {props.name}
      </h2>
      <div className={`${styles.items} pl-4 pr-4 mb-10`}>
        {data.map(
          (elem) =>
            elem.type === type && (
              <IngredientsItem
                key={elem._id}
                id={elem._id}
                image={elem.image}
                price={elem.price}
                name={elem.name}
              />
            )
        )}
      </div>
    </>
  );
};

export default IngredientsList;
