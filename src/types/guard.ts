import { ROUTES_PATH_KR_MAP } from '@constants/data/urlMapData';
import { matchPath } from 'react-router-dom';
import type { RangeCategory } from './index';

type AppPath = keyof typeof ROUTES_PATH_KR_MAP;
function isValidPath(path: string): path is AppPath {
  return path in ROUTES_PATH_KR_MAP;
}

const RANGE_CATEGORIES = ['2HOURS', '1DAY', '1WEEK', '1MONTH', 'CUSTOM'] as const;

export function isRangeCategory(value: string): value is RangeCategory {
  return RANGE_CATEGORIES.includes(value as RangeCategory);
}

/**
 * 현재 pathname에 맞는 한글 페이지 제목을 반환합니다.
 * (동적 경로 포함)
 */
export function getPageTitle(pathname: string): string {
  if (isValidPath(pathname)) {
    return ROUTES_PATH_KR_MAP[pathname];
  }

  for (const pathPattern of Object.keys(ROUTES_PATH_KR_MAP)) {
    if (matchPath(pathPattern, pathname)) {
      return ROUTES_PATH_KR_MAP[pathPattern as AppPath];
    }
  }

  return '페이지를 찾을 수 없습니다.';
}
