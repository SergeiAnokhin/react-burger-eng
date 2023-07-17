import { useState, useRef, useEffect } from 'react';
import { Tab } from '../../utils/types';
import IngredientsList from '../ingredients-list/ingredients-list';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
  const initialHeight =
    document.documentElement.clientHeight / 2 < 500
      ? document.documentElement.clientHeight / 2
      : 500;
  const [current, setCurrent] = useState<string>('bun');
  const [bunTop, setBunTop] = useState<number>(initialHeight);
  const [sauceTop, setSauceTop] = useState<number>(initialHeight);
  const [mainTop, setMainTop] = useState<number>(initialHeight);

  const ref = useRef<HTMLDivElement>(null);

  const bun = 'bun';
  const sauce = 'sauce';
  const main = 'main';

  const scrollTo = (value: string) => {
    setCurrent(value);
    if (ref.current) {
      ref.current.children[value as unknown as number].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    if (ref.current) {
      const items = Array.from(ref.current.children);
      ref.current.addEventListener('scroll', () => {
        items.forEach((item) => {
          if (item.id === bun) {
            setBunTop(item.getBoundingClientRect().top);
          }
          if (item.id === sauce) {
            setSauceTop(item.getBoundingClientRect().top);
          }
          if (item.id === main) {
            setMainTop(item.getBoundingClientRect().top);
          }
        });
      });
    }
  }, []);

  useEffect(() => {
    if (mainTop < initialHeight) {
      setCurrent(main);
    } else if (sauceTop < initialHeight) {
      setCurrent(sauce);
    } else if (bunTop < initialHeight) {
      setCurrent(bun);
    }
  }, [bunTop, sauceTop, mainTop, initialHeight]);

  return (
    <section className={`${styles.section} pt-10 mr-10`}>
      <h1 className="text text_type_main-large mb-5">Build your burger</h1>
      <div className={styles.tabs}>
        <Tab
          value={bun}
          active={current === bun}
          onClick={(value) => scrollTo(value)}
        >
          Buns
        </Tab>
        <Tab
          value={sauce}
          active={current === sauce}
          onClick={(value) => scrollTo(value)}
        >
          Sauces
        </Tab>
        <Tab
          value={main}
          active={current === main}
          onClick={(value) => scrollTo(value)}
        >
          Fillings
        </Tab>
      </div>
      <div className={`${styles.ingredients} mt-10`} id="ingredients" ref={ref}>
        <IngredientsList name="Buns" type={bun} id={bun} />
        <IngredientsList name="Sauces" type={sauce} id={sauce} />
        <IngredientsList name="Fillings" type={main} id={main} />
      </div>
    </section>
  );
};

export default BurgerIngredients;
