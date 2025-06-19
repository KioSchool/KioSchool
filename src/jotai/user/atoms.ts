import { defaultUserOrderValue, defaultWorkspaceValue } from '@@types/defaultValues';
import { Order, Workspace } from '@@types/index';
import { atom } from 'jotai';

export const userWorkspaceAtom = atom<Workspace>(defaultWorkspaceValue);
export const userOrderAtom = atom<Order>(defaultUserOrderValue);
