import { defaultUserOrderValue, defaultWorkspaceValue } from '@@types/defaultValues';
import { Order, OrderProductBase, ProductCategory, Workspace } from '@@types/index';
import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import { adminCategoriesAtom } from '../admin/atoms';

export const userWorkspaceAtom = atom<Workspace>(defaultWorkspaceValue);
export const userOrderAtom = atom<Order>(defaultUserOrderValue);
export const userOrderBasketAtom = atomWithReset<OrderProductBase[]>([]);
export const userCategoriesAtom = atom<ProductCategory[]>((get) => get(adminCategoriesAtom));
