import { defaultBanksValue, defaultWorkspaceValue } from '@@types/defaultValues';
import { Bank, Order, Product, ProductCategory, Workspace } from '@@types/index';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const ordersAtom = atom<Order[]>([]);
export const workspacesAtom = atom<Workspace[]>([]);
export const productsAtom = atom<Product[]>([]);
export const categoriesAtom = atom<ProductCategory[]>([]);
export const banksAtom = atom<Bank[]>(defaultBanksValue);

export const adminWorkspaceAtom = atomWithStorage<Workspace>('adminWorkspace', defaultWorkspaceValue, undefined, {
  getOnInit: true,
});
