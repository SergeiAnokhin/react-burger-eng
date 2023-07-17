import {
  DragIcon,
  ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { useSelector, useDispatch } from '../../services';
import {
  deleteIngredient,
  sortConstructor
} from '../../services/actions/constructor-actions';
import { TIngredient } from '../../utils/types';
import styles from './constructor-item.module.css';

const ConstructorItem = ({
  elem,
  index
}: {
  elem: TIngredient;
  index: number;
}) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const id = elem.nanoid;
  const { ingredients } = useSelector((store) => store.constructorReducer);

  const [{ isDragging }, dragRef1] = useDrag({
    type: 'constructor-item',
    item: { id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
      isDragging: monitor.isDragging()
    })
  });

  const [{ isHover }, dropTarget1] = useDrop({
    accept: 'constructor-item',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    drop(id: { id: string }) {
      const dragElementIndex = ingredients.findIndex(
        (item) => item.nanoid === id.id
      );
      const dropElementIndex = index;

      const constructorIngredients = [...ingredients];
      const drag = constructorIngredients[dropElementIndex];

      constructorIngredients[dropElementIndex] =
        constructorIngredients[dragElementIndex];
      constructorIngredients[dragElementIndex] = drag;

      dispatch(sortConstructor(constructorIngredients));
    }
  });

  const dragDropRef = dragRef1(dropTarget1(ref));
  const opacity = isDragging ? styles.hidden : 1;
  const transform = isHover ? styles.scale : '';
  return (
    <div
      className={`${styles.element} ${transform} ${opacity}`}
      ref={dragDropRef as any}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={elem.name}
        price={elem.price}
        thumbnail={elem.image_mobile}
        handleClose={() => dispatch(deleteIngredient(elem._id))}
      />
    </div>
  );
};

export default ConstructorItem;
