import { MutableRefObject, useEffect, useState } from 'react';
import { createStore, Provider } from 'jotai';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import DemoContent from './DemoContent';

const FIRST_STEP = 1;

interface DemoAppProps {
  initialStep: number;
  restartRef: MutableRefObject<(() => void) | null>;
}

function DemoApp({ initialStep, restartRef }: DemoAppProps) {
  // 체험 상태는 이 페이지만의 store에 둔다(앱 전역 jotai 저장소와 섞이지 않게)
  const [store] = useState(() => createStore());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    store.set(demoStateAtom, { type: 'RESTART', now: Date.now(), step: initialStep });
    restartRef.current = () => store.set(demoStateAtom, { type: 'RESTART', now: Date.now(), step: FIRST_STEP });
    setIsReady(true);
    return () => {
      restartRef.current = null;
    };
  }, [store, initialStep, restartRef]);

  return <Provider store={store}>{isReady && <DemoContent />}</Provider>;
}

export default DemoApp;
