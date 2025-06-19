import { defaultWorkspaceValue } from '@@types/defaultValues';
import { Workspace } from '@@types/index';
import { atom } from 'jotai';

export const userWorkspaceAtom = atom<Workspace>(defaultWorkspaceValue);
