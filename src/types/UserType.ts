import { User, UserRole } from '.';

export const defaultUserValue: User = {
  name: '',
  email: '',
  role: UserRole.ADMIN,
  accountUrl: '',
  id: 0,
  createdAt: '',
  updatedAt: '',
};
