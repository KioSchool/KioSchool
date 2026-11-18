import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { DemoDevice } from '@constants/data/demo/demoSteps';
import { LandingColor } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const DEVICE_TABS: { device: DemoDevice; label: string }[] = [
  { device: 'guest', label: '손님 화면' },
  { device: 'admin', label: '운영진 화면' },
];

const Tabs = styled.div`
  height: 40px;
  margin-bottom: 12px;
  padding: 4px;
  border-radius: 10px;
  background: #f2f4f6;
  ${rowFlex({ align: 'stretch' })}
`;

const selectedTabStyle = css`
  background: #ffffff;
  font-weight: 700;
  color: ${LandingColor.TEXT};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
`;

const Tab = styled.button<{ isSelected: boolean }>`
  flex: 1;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  color: ${LandingColor.CAPTION};
  cursor: pointer;
  ${({ isSelected }) => isSelected && selectedTabStyle}
`;

interface DemoMobileTabsProps {
  view: DemoDevice;
  onChange: (device: DemoDevice) => void;
}

function DemoMobileTabs({ view, onChange }: DemoMobileTabsProps) {
  return (
    <Tabs role="tablist" aria-label="보이는 화면">
      {DEVICE_TABS.map((tab) => (
        <Tab
          key={tab.device}
          type="button"
          role="tab"
          aria-selected={view === tab.device}
          isSelected={view === tab.device}
          onClick={() => onChange(tab.device)}
        >
          {tab.label}
        </Tab>
      ))}
    </Tabs>
  );
}

export default DemoMobileTabs;
