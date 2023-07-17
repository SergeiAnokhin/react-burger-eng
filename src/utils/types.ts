import {
  Button as ButtonUI,
  Tab as TabUI
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, SyntheticEvent } from 'react';

export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
  nanoid?: string;
};

export type TOrderUser = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  owner: {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TOrderUserResponse = {
  name: string;
  order: TOrderUser;
  success: boolean;
};

export type TUser = {
  email: string;
  name: string;
};

export type TUserAction = {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: TUser;
};

export type TUserPassword = {
  message: string;
  success: boolean;
};

export type TUserInfo = {
  success: boolean;
  user: TUser;
};

export type TOrder = Omit<TOrderUser, 'owner' | 'price'>;

export type TOrdersResponse = {
  orders: Array<TOrder>;
  success: boolean;
  total: number;
  totalToday: number;
};

export type TWsActions = {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

export const Button: FC<{
  type?: 'secondary' | 'primary';
  size?: 'small' | 'medium' | 'large';
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  disabled?: boolean;
  name?: string;
  htmlType: 'button' | 'submit' | 'reset';
  className?: string;
  children: React.ReactNode;
}> = ButtonUI;

export const Tab: FC<{
  active: boolean;
  value: string;
  onClick: (value: string) => void;
  children: React.ReactNode;
}> = TabUI;
