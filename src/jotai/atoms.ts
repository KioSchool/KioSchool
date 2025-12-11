import { atom } from 'jotai';
import { calculateLayoutScale } from '@utils/layout';
import { DEFAULT_LAYOUT_WIDTH } from '@constants/layout';

export const loadingCountAtom = atom<number>(0);

interface LayoutParams {
  customWidth?: string;
  sideNavOffset: number;
}

/**
 * 레이아웃 파라미터(커스텀 너비, 사이드바 오프셋 등)를 저장하는 Atom
 * AppContainer에서 값이 동기화됩니다.
 */
export const layoutParamsAtom = atom<LayoutParams>({ sideNavOffset: 0 });

/**
 * 브라우저의 창 너비를 실시간으로 추적하는 Atom
 * onMount를 사용하여 리사이즈 이벤트를 감지하고 값을 업데이트합니다.
 */
export const windowWidthAtom = atom(typeof window !== 'undefined' ? window.innerWidth : DEFAULT_LAYOUT_WIDTH);
windowWidthAtom.onMount = (set) => {
  const handleResize = () => set(window.innerWidth);
  window.addEventListener('resize', handleResize);

  return () => window.removeEventListener('resize', handleResize);
};

/**
 * windowWidthAtom과 layoutParamsAtom을 구독하여
 * 자동으로 반응하는 스케일 값을 제공하는 파생 Atom
 */
export const layoutScaleAtom = atom((get) => {
  const { customWidth, sideNavOffset } = get(layoutParamsAtom);
  const windowWidth = get(windowWidthAtom);

  return calculateLayoutScale(windowWidth, customWidth, sideNavOffset);
});
