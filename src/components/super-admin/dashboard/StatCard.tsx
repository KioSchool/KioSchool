import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

type ValueSize = 'lg' | 'md';

const Card = styled.div`
  background: ${Color.WHITE};
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 12px;
  padding: 18px;
  gap: 10px;
  min-width: 0;
  ${colFlex()}

  ${mobileMediaQuery} {
    padding: 14px;
    gap: 8px;
    border-radius: 10px;
  }
`;

const Label = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
  font-weight: 500;
`;

const Value = styled.div<{ size: ValueSize }>`
  font-size: ${({ size }) => (size === 'lg' ? '24px' : '18px')};
  font-weight: 700;
  color: ${Color.BLACK};
  line-height: 1.2;
  word-break: keep-all;

  ${mobileMediaQuery} {
    font-size: ${({ size }) => (size === 'lg' ? '20px' : '16px')};
  }
`;

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  valueSize?: ValueSize;
  footer?: ReactNode;
}

function StatCard({ icon, label, value, valueSize = 'lg', footer }: StatCardProps) {
  return (
    <Card>
      {icon}
      <Label>{label}</Label>
      <Value size={valueSize}>{value}</Value>
      {footer}
    </Card>
  );
}

export default StatCard;
