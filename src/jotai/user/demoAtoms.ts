import { atomWithReducer } from 'jotai/utils';
import { createDemoState } from '@utils/demo/createDemoState';
import { demoRootReducer } from '@utils/demo/demoAutoplay';

// /demo 페이지가 만든 별도 store 안에서만 쓴다. 시작 값은 마운트할 때 RESTART로 다시 채운다
export const demoStateAtom = atomWithReducer(createDemoState(0), demoRootReducer);
