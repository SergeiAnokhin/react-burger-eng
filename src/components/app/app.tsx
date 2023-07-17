import { useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { setIngredientsThunk } from '../../services/requests/ingredients-thunk';
import {
  getUserInfoThunk,
  refreshTokenThunk
} from '../../services/requests/user-thunk';
import {
  MainPage,
  ProfilePage,
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  FeedPage,
  IngredientPage,
  NotFoundPage,
  OrderPage
} from '../../pages';
import { ProtectedRoute } from '../ProtectedRoute/protected-route';
import Modal from '../modal/modal';
import { OrderInfo } from '../order-info/order-info';
import { openIngredientModal } from '../../services/actions/item-actions';
import { openOrderModal } from '../../services/actions/order-actions';
import { getCookie } from '../../utils/cookie';
import OrderDetails from '../order-details/order-details';

const App = () => {
  type TLocation = {
    background: {
      pathname: string;
      search: string;
      hash: string;
      state: null;
      key: string;
    };
    from: string;
    state?: object;
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<TLocation>();
  const background = location.state?.background;
  const { open, error } = useSelector((store) => store.orderReducer);

  useEffect(() => {
    if (localStorage.getItem('token') && getCookie('token')) {
      dispatch(getUserInfoThunk());
    }
  }, [dispatch]);

  useEffect(() => {
    if (getCookie('token')) {
      setInterval(() => dispatch(refreshTokenThunk()), 300000);
    }
  }, []);

  useEffect(() => {
    dispatch(setIngredientsThunk());
  }, [dispatch]);

  const closeModal = () => {
    const path = history.location.pathname.split('/').slice(1, -1).join('/');
    dispatch(openIngredientModal(false));
    dispatch(openOrderModal(false));
    history.replace(path === 'ingredients' ? '/' : `/${path}`);
  };

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/feed">
          <FeedPage />
        </Route>
        <Route exact path="/feed/:id">
          <OrderPage />
        </Route>
        <ProtectedRoute exact path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile/orders">
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile/orders/:id">
          <OrderPage />
        </ProtectedRoute>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPasswordPage />
        </Route>
        <Route path="/ingredients/:id" exact>
          <IngredientPage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>

      {background && (
        <Route path="/ingredients/:id">
          <Modal title="Ingredient Details" closeModal={closeModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/feed/:id">
          <Modal title="" closeModal={closeModal}>
            <OrderInfo />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/profile/orders/:id">
          <Modal title="" closeModal={closeModal}>
            <OrderInfo />
          </Modal>
        </Route>
      )}
      {open && !error && (
        <Modal title="" closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default App;
