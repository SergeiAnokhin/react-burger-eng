import { useSelector } from '../../services';
import AppMain from '../../components/app-main/app-main';
import { Preloader } from '../../components/preloader/preloader';

export const MainPage = () => {
  const user = useSelector((store) => store.userReducer);
  const {
    ingredients,
    loading: isLoadingIngredients,
    error: hasErrorIngredients
  } = useSelector((state) => state.ingredientsReducer);
  const { loading: isLoadingOrder } = useSelector(
    (state) => state.orderReducer
  );

  return (
    <>
      {isLoadingIngredients || isLoadingOrder || user.loading ? (
        <Preloader />
      ) : (
        ''
      )}
      {!hasErrorIngredients && ingredients.length && <AppMain />}
    </>
  );
};
