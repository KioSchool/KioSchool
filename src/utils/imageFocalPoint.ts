import { FocalPoint } from '@@types/index';

const FOCAL_POINT_MIN = 0;
const FOCAL_POINT_MAX = 100;
const PERCENT = 100;

export interface CoverOverflow {
  x: number;
  y: number;
}

const clampPercent = (value: number) => Math.min(FOCAL_POINT_MAX, Math.max(FOCAL_POINT_MIN, value));

export const clampFocalPoint = (focalPoint: FocalPoint): FocalPoint => ({
  x: clampPercent(focalPoint.x),
  y: clampPercent(focalPoint.y),
});

// 드래그 중에는 소수점을 유지하고 저장/렌더링 직전에만 반올림한다.
// 매 프레임 반올림하면 1% 미만 이동이 계속 버려져 느린 드래그가 멈춘 것처럼 느껴진다.
export const roundFocalPoint = (focalPoint: FocalPoint): FocalPoint => ({
  x: Math.round(focalPoint.x),
  y: Math.round(focalPoint.y),
});

export const toObjectPosition = (focalPoint: FocalPoint) => {
  const rounded = roundFocalPoint(focalPoint);
  return `${rounded.x}% ${rounded.y}%`;
};

// object-fit: cover 로 그렸을 때 프레임 밖으로 넘치는 픽셀 수. 넘치는 양이 곧 이동 가능 범위다.
export const getCoverOverflow = (naturalWidth: number, naturalHeight: number, frameWidth: number, frameHeight: number): CoverOverflow => {
  if (!naturalWidth || !naturalHeight) {
    return { x: 0, y: 0 };
  }

  const scale = Math.max(frameWidth / naturalWidth, frameHeight / naturalHeight);

  return {
    x: Math.max(naturalWidth * scale - frameWidth, 0),
    y: Math.max(naturalHeight * scale - frameHeight, 0),
  };
};

// 반환값은 반올림하지 않는다 — roundFocalPoint()는 저장/렌더링 직전에만 호출한다.
export const moveFocalPoint = (focalPoint: FocalPoint, delta: FocalPoint, overflow: CoverOverflow): FocalPoint =>
  clampFocalPoint({
    x: overflow.x > 0 ? focalPoint.x - (delta.x / overflow.x) * PERCENT : focalPoint.x,
    y: overflow.y > 0 ? focalPoint.y - (delta.y / overflow.y) * PERCENT : focalPoint.y,
  });
