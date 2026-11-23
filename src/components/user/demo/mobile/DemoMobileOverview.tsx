import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import DemoAdminScreen from '@components/user/demo/admin/DemoAdminScreen';
import useElementWidth from '@hooks/common/useElementWidth';
import { LandingColor } from '@resources/colors';
import { DEMO_ADMIN_DESIGN } from '@styles/demoStyles';
import { colFlex, rowFlex } from '@styles/flexStyles';

interface RegionBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 40;
  padding: 16px 16px calc(16px + env(safe-area-inset-bottom));
  gap: 14px;
  background: rgba(25, 31, 40, 0.94);
  ${colFlex()}
`;

const Head = styled.div`
  flex: none;
  ${rowFlex({ align: 'center' })}
`;

const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
`;

const CloseButton = styled.button`
  margin-left: auto;
  padding: 4px 0 4px 12px;
  border: 0;
  background: none;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  color: ${LandingColor.DARK_SUB_TEXT};
  cursor: pointer;
`;

const Body = styled.div`
  flex: 1;
  min-height: 0;
  gap: 14px;
  ${colFlex({ justify: 'center' })}
`;

const Frame = styled.div<{ frameHeight: number }>`
  position: relative;
  width: 100%;
  height: ${({ frameHeight }) => frameHeight}px;
  overflow: hidden;
  border-radius: 8px;
  background: #ffffff;
`;

const Canvas = styled.div<{ scale: number }>`
  position: absolute;
  left: 0;
  top: 0;
  width: ${DEMO_ADMIN_DESIGN.width}px;
  height: ${DEMO_ADMIN_DESIGN.height}px;
  transform: scale(${({ scale }) => scale});
  transform-origin: 0 0;
  pointer-events: none;
`;

const Region = styled.div<{ box: RegionBox }>`
  position: absolute;
  left: ${({ box }) => box.left}px;
  top: ${({ box }) => box.top}px;
  width: ${({ box }) => box.width}px;
  height: ${({ box }) => box.height}px;
  border: 2px solid ${LandingColor.ACCENT};
  border-radius: 4px;
  pointer-events: none;
`;

const Caption = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #d1d6db;
`;

interface DemoMobileOverviewProps {
  onClose: () => void;
}

function DemoMobileOverview({ onClose }: DemoMobileOverviewProps) {
  const titleId = useId();
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const width = useElementWidth(frameRef);
  const scale = width / DEMO_ADMIN_DESIGN.width;
  const [region, setRegion] = useState<RegionBox | null>(null);

  // 줄여 그린 PC 화면 안의 버튼에 키보드로도 닿지 않게 한다
  useEffect(() => {
    canvasRef.current?.setAttribute('inert', '');
  }, []);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const target = canvasRef.current?.querySelector('[data-demo-region]');
    if (!frame || !target || width === 0) return;
    const frameRect = frame.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    setRegion({ left: rect.left - frameRect.left, top: rect.top - frameRect.top, width: rect.width, height: rect.height });
  }, [width]);

  return (
    <Overlay role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <Head>
        <Title id={titleId}>실제 운영진 화면 · PC·태블릿</Title>
        <CloseButton type="button" onClick={onClose}>
          닫기
        </CloseButton>
      </Head>
      <Body>
        <Frame ref={frameRef} frameHeight={DEMO_ADMIN_DESIGN.height * scale}>
          <Canvas ref={canvasRef} scale={scale} aria-hidden="true">
            <DemoAdminScreen />
          </Canvas>
          {region && <Region box={region} data-demo-overview-region />}
        </Frame>
        <Caption>
          축제 날에는 PC나 태블릿에서 이 화면 전체를 한 번에 봅니다. 운영진 화면은 폰에서는 열리지 않고, 여기서는 체험으로만 볼 수 있습니다. 주황 상자는 지금
          폰에서 보고 있는 부분입니다.
        </Caption>
      </Body>
    </Overlay>
  );
}

export default DemoMobileOverview;
