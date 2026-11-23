import { ReactNode, useRef } from 'react';
import styled from '@emotion/styled';
import useElementWidth from '@hooks/common/useElementWidth';
import { LandingColor } from '@resources/colors';

export type DemoFrameShape = 'phone' | 'laptop';

const FRAME_RADIUS: Record<DemoFrameShape, number> = { phone: 28, laptop: 16 };
const CANVAS_BLOCKED_PROPS = ['canvasWidth', 'canvasHeight', 'scale'];

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

const Canvas = styled('div', { shouldForwardProp: (prop) => !CANVAS_BLOCKED_PROPS.includes(prop) })<{
  canvasWidth: number;
  canvasHeight: number;
  scale: number;
}>`
  position: absolute;
  left: 0;
  top: 0;
  width: ${({ canvasWidth }) => canvasWidth}px;
  height: ${({ canvasHeight }) => canvasHeight}px;
  overflow: hidden;
  transform: scale(${({ scale }) => scale});
  transform-origin: 0 0;
  background: #ffffff;
`;

interface DemoDeviceFrameProps {
  device: 'guest' | 'admin';
  shape: DemoFrameShape;
  designWidth: number;
  designHeight: number;
  overlay?: ReactNode;
  children: ReactNode;
}

function DemoDeviceFrame({ device, shape, designWidth, designHeight, overlay = null, children }: DemoDeviceFrameProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const width = useElementWidth(outerRef);
  const scale = width / designWidth;

  return (
    <Outer ref={outerRef} shape={shape} outerHeight={designHeight * scale} data-demo-device={device}>
      {width > 0 && (
        <Canvas canvasWidth={designWidth} canvasHeight={designHeight} scale={scale}>
          {children}
        </Canvas>
      )}
      {overlay}
    </Outer>
  );
}

export default DemoDeviceFrame;
