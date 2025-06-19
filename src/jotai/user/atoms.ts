import { defaultUserOrderValue, defaultWorkspaceValue } from '@@types/defaultValues';
import { Order, OrderProductBase, Workspace } from '@@types/index';
import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

export const userWorkspaceAtom = atom<Workspace>(defaultWorkspaceValue);
export const userOrderAtom = atom<Order>(defaultUserOrderValue);
export const userOrderBasketAtom = atomWithReset<OrderProductBase[]>([]);
