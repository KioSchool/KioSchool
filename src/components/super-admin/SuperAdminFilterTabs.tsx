import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const TabContainer = styled.div`
  gap: 8px;
  flex-wrap: wrap;
  ${rowFlex({ align: 'center' })};
`;

const TabLabel = styled.span`
  font-size: 14px;
  color: ${Color.GREY};
`;

const TabButton = styled.button<{ isActive: boolean }>`
  padding: 6px 16px;
  border-radius: 20px;
  border: 1.5px solid ${({ isActive }) => (isActive ? Color.KIO_ORANGE : Color.HEAVY_GREY)};
  background: ${({ isActive }) => (isActive ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  color: ${({ isActive }) => (isActive ? Color.KIO_ORANGE_DARK : Color.GREY)};
  font-size: 14px;
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  cursor: pointer;
`;

export interface FilterTab<T extends string> {
  label: string;
  value: T;
}

interface SuperAdminFilterTabsProps<T extends string> {
  label: string;
  tabs: FilterTab<T>[];
  value: T;
  onChange: (value: T) => void;
}

function SuperAdminFilterTabs<T extends string>({ label, tabs, value, onChange }: SuperAdminFilterTabsProps<T>) {
  return (
    <TabContainer>
      <TabLabel>{label}</TabLabel>
      {tabs.map((tab) => (
        <TabButton key={tab.value} type="button" isActive={value === tab.value} onClick={() => onChange(tab.value)}>
          {tab.label}
        </TabButton>
      ))}
    </TabContainer>
  );
}

export default SuperAdminFilterTabs;
