import { ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from '../../services';
import { getCookie } from '../../utils/cookie';

type TProtectedRoute = {
  children?: ReactNode;
  path?: string;
  exact?: boolean;
};

export const ProtectedRoute = ({ children, ...rest }: TProtectedRoute) => {
  const user = useSelector((state) => state.userReducer);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        getCookie('token') && !user.error ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
