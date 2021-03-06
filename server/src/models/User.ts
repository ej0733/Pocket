import { Optional } from 'sequelize';
import { BaseModel, BaseViewModel } from './Base';

export interface UserViewModel extends BaseViewModel {
  email: string

  firstName: string

  lastName: string
}

export interface UserInputModel extends Optional<UserViewModel, 'id' | 'createdAt' | 'updatedAt' | 'softDelete'> { }

export class UserModel extends BaseModel<UserViewModel, UserInputModel> {
  email: string

  firstName: string

  lastName: string
}

export const updateableAttrs = [
  'firstName',
  'lastName',
];
