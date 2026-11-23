import { MouseEvent } from 'react';
import { useSetAtom } from 'jotai';
import { demoStateAtom } from '@jotai/user/demoAtoms';

// 가져다 쓴 실제 운영진 컴포넌트 안의 링크를 누르면 체험 밖으로 나가므로 막고 안내만 띄운다
function useDemoLinkBlock() {
  const dispatch = useSetAtom(demoStateAtom);

  return (event: MouseEvent<HTMLDivElement>) => {
    if (!(event.target as HTMLElement).closest('a')) return;
    event.preventDefault();
    dispatch({ type: 'UNSUPPORTED' });
  };
}

export default useDemoLinkBlock;
