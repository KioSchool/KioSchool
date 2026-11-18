import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import useElementWidth from '@hooks/common/useElementWidth';
import { LandingColor } from '@resources/colors';

export type DemoFrameShape = 'phone' | 'laptop';

interface FocusTransform {
  scale: number;
  x: number;
  y: number;
}

const FOCUS_PADDING = 24;
// 폰에서 확대할 때 실제 크기보다 너무 커지면 어디인지 알아보기 어려워서 이 배율에서 멈춘다
const MAX_FOCUS_SCALE = 1.6;
const ZOOM_SECONDS = 0.35;
const SAME_VALUE_EPSILON = 0.5;
const SAME_SCALE_EPSILON = 0.001;
const FRAME_RADIUS: Record<DemoFrameShape, number> = { phone: 28, laptop: 16 };
const CANVAS_BLOCKED_PROPS = ['canvasWidth', 'canvasHeight'];
const NO_FOCUS: string[] = [];

const Outer = styled.div<{ shape: DemoFrameShape; outerHeight: number }>`
  position: relative;
  width: 100%;
  height: ${({ outerHeight }) => outerHeight}px;
  overflow: hidden;
  isolation: isolate;
  contain: layout;
  border-radius: ${({ shape }) => FRAME_RADIUS[shape]}px;
  background: #ffffff;
  box-shadow: 0 0 0 1px ${LandingColor.LINE}, 0 12px 32px ${LandingColor.SHADOW};
`;

const Canvas = styled(motion.div, { shouldForwardProp: (prop) => !CANVAS_BLOCKED_PROPS.includes(prop) })<{ canvasWidth: number; canvasHeight: number }>`
  position: absolute;
  left: 0;
  top: 0;
  width: ${({ canvasWidth }) => canvasWidth}px;
  height: ${({ canvasHeight }) => canvasHeight}px;
  overflow: hidden;
  transform-origin: 0 0;
  background: #ffffff;
`;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function isSameFocus(prev: FocusTransform | null, next: FocusTransform | null) {
  if (prev === null || next === null) return prev === next;
  return (
    Math.abs(prev.x - next.x) < SAME_VALUE_EPSILON && Math.abs(prev.y - next.y) < SAME_VALUE_EPSILON && Math.abs(prev.scale - next.scale) < SAME_SCALE_EPSILON
  );
}

function pickFocus(prev: FocusTransform | null, next: FocusTransform | null) {
  if (isSameFocus(prev, next)) return prev;
  return next;
}

interface FrameSize {
  width: number;
  height: number;
}

function measureFocus(canvas: HTMLElement | null, selectors: string[], frame: FrameSize, canvasSize: FrameSize): FocusTransform | null {
  if (!canvas || frame.width === 0) return null;
  const element = selectors.map((selector) => canvas.querySelector(selector)).find((candidate) => candidate !== null);
  if (!element) return null;

  const canvasRect = canvas.getBoundingClientRect();
  const currentScale = canvasRect.width / canvasSize.width;
  if (currentScale === 0) return null;

  const rect = element.getBoundingClientRect();
  const x = (rect.left - canvasRect.left) / currentScale;
  const y = (rect.top - canvasRect.top) / currentScale;
  const width = rect.width / currentScale;
  const height = rect.height / currentScale;
  const scale = Math.min(MAX_FOCUS_SCALE, frame.width / (width + FOCUS_PADDING * 2), frame.height / (height + FOCUS_PADDING * 2));
  const minX = Math.min(0, frame.width - canvasSize.width * scale);
  const minY = Math.min(0, frame.height - canvasSize.height * scale);

  return {
    scale,
    x: clamp(frame.width / 2 - (x + width / 2) * scale, minX, 0),
    y: clamp(frame.height / 2 - (y + height / 2) * scale, minY, 0),
  };
}

function getCanvasHeight(designHeight: number, baseScale: number, fitHeight: number | undefined) {
  if (fitHeight === undefined || baseScale === 0) return designHeight;
  return fitHeight / baseScale;
}

function getOuterHeight(designHeight: number, baseScale: number, fitHeight: number | undefined, frameHeight: number | undefined) {
  if (fitHeight !== undefined) return fitHeight;
  if (frameHeight !== undefined) return frameHeight;
  return designHeight * baseScale;
}

function getActiveSelectors(focusSelectors: string[], isZoomedOut: boolean) {
  if (isZoomedOut) return NO_FOCUS;
  return focusSelectors;
}

interface DemoDeviceFrameProps {
  device: 'guest' | 'admin';
  shape: DemoFrameShape;
  designWidth: number;
  designHeight: number;
  fitHeight?: number;
  frameHeight?: number;
  focusSelectors?: string[];
  isZoomedOut?: boolean;
  overlay?: ReactNode;
  children: ReactNode;
}

function DemoDeviceFrame({
  device,
  shape,
  designWidth,
  designHeight,
  fitHeight,
  frameHeight,
  focusSelectors = NO_FOCUS,
  isZoomedOut = false,
  overlay = null,
  children,
}: DemoDeviceFrameProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const width = useElementWidth(outerRef);
  const baseScale = width / designWidth;
  const canvasHeight = getCanvasHeight(designHeight, baseScale, fitHeight);
  const outerHeight = getOuterHeight(designHeight, baseScale, fitHeight, frameHeight);
  const [focus, setFocus] = useState<FocusTransform | null>(null);
  const [, setDomVersion] = useState(0);
  const hasCanvas = width > 0;

  // 확인 창처럼 화면 안쪽 상태로만 열리는 것도 따라가도록, 요소가 붙거나 빠지면 다시 잰다
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!hasCanvas || !canvas) return undefined;
    const observer = new MutationObserver(() => setDomVersion((version) => version + 1));
    observer.observe(canvas, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [hasCanvas]);
  const activeSelectors = getActiveSelectors(focusSelectors, isZoomedOut);

  useLayoutEffect(() => {
    const next = measureFocus(canvasRef.current, activeSelectors, { width, height: outerHeight }, { width: designWidth, height: canvasHeight });
    setFocus((prev) => pickFocus(prev, next));
  });

  const target = focus ?? { scale: baseScale, x: 0, y: 0 };

  return (
    <Outer ref={outerRef} shape={shape} outerHeight={outerHeight} data-demo-device={device}>
      {width > 0 && (
        <Canvas
          ref={canvasRef}
          canvasWidth={designWidth}
          canvasHeight={canvasHeight}
          initial={false}
          animate={{ scale: target.scale, x: target.x, y: target.y }}
          transition={{ duration: ZOOM_SECONDS, ease: 'easeOut' }}
        >
          {children}
        </Canvas>
      )}
      {overlay}
    </Outer>
  );
}

export default DemoDeviceFrame;
