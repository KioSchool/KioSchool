import styled from '@emotion/styled';
import { RiFullscreenLine, RiMacbookLine, RiSmartphoneLine } from '@remixicon/react';
import { DEMO_TABLE_NUMBER } from '@constants/data/demo/demoSeed';
import { DEMO_ADMIN_PAGE_SHORT_LABEL, DemoAdminPage, DemoDevice } from '@constants/data/demo/demoSteps';
import { LandingColor } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const Bar = styled.div`
  flex: none;
  height: 32px;
  padding: 0 16px;
  gap: 6px;
  border-top: 1px solid ${LandingColor.LINE};
  border-bottom: 1px solid ${LandingColor.LINE};
  background: #f9fafb;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  color: ${LandingColor.SUB_TEXT};
  ${rowFlex({ align: 'center' })}
`;

const Label = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Chip = styled.span`
  flex: none;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${LandingColor.LINE};
  font-size: 11px;
  font-weight: 700;
  line-height: 16px;
  color: ${LandingColor.SUB_TEXT};
`;

const OverviewButton = styled.button`
  flex: none;
  margin-left: auto;
  padding: 0;
  border: 0;
  background: none;
  gap: 4px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  color: ${LandingColor.CAPTION};
  cursor: pointer;
  ${rowFlex({ align: 'center' })}
`;

interface DemoMobileDeviceBarProps {
  view: DemoDevice;
  adminPage: DemoAdminPage;
  onOpenOverview: () => void;
}

function DemoMobileDeviceBar({ view, adminPage, onOpenOverview }: DemoMobileDeviceBarProps) {
  if (view === 'guest') {
    return (
      <Bar data-demo-device-bar>
        <RiSmartphoneLine size={16} aria-hidden="true" />
        <Label>손님 폰 · {DEMO_TABLE_NUMBER}번 테이블</Label>
      </Bar>
    );
  }

  return (
    <Bar data-demo-device-bar>
      <RiMacbookLine size={16} aria-hidden="true" />
      <Label>운영진 · {DEMO_ADMIN_PAGE_SHORT_LABEL[adminPage]}</Label>
      <Chip>PC·태블릿 전용</Chip>
      <OverviewButton type="button" onClick={onOpenOverview}>
        <RiFullscreenLine size={14} aria-hidden="true" />
        전체 화면
      </OverviewButton>
    </Bar>
  );
}

export default DemoMobileDeviceBar;
