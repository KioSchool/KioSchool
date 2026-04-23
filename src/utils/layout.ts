import { DEFAULT_LAYOUT_WIDTH } from '@constants/layout';

const LAYOUT_PADDING = 20;
const MIN_SCALE = 0.5;

/**
 * 현재 창 너비와 설정된 레이아웃 파라미터를 기반으로 스케일 값을 계산하는 순수 함수
 * @param windowWidth 현재 창 너비
 * @param customWidth 목표로 하는 콘텐츠 너비 (기본값: 1200px)
 * @param sideNavOffset 사이드바 오프셋 (사이드바가 열려있을 때 줄어들 너비)
 * @returns 계산된 스케일 값 (최소 0.5)
 */
export const calculateLayoutScale = (windowWidth: number, customWidth?: string, sideNavOffset: number = 0) => {
  // 창 너비가 유효하지 않으면 기본값 반환
  if (windowWidth <= 0) return 1;

  // customWidth 파싱 및 안전한 기본값 처리 (NaN 방지)
  const parsedWidth = customWidth ? parseInt(customWidth, 10) : DEFAULT_LAYOUT_WIDTH;
  const targetWidth = isNaN(parsedWidth) ? DEFAULT_LAYOUT_WIDTH : parsedWidth;

  const availableWidth = windowWidth - sideNavOffset;

  // 공간이 충분하면 스케일링 하지 않음
  if (availableWidth >= targetWidth + LAYOUT_PADDING) {
    return 1;
  }

  // 스케일 계산 및 최소값 제한 적용
  const newScale = (availableWidth - LAYOUT_PADDING) / targetWidth;
  return Math.max(newScale, MIN_SCALE);
};
