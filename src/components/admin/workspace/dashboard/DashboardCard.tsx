import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { DashboardCardDivider } from '@styles/dashboardStyles';
import { ReactNode } from 'react';

const Container = styled.div<{ width?: number; height?: number }>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  box-shadow: 0px 4px 20px rgba(92, 92, 92, 0.05);
  border-radius: 16px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  padding: 14px 21px;
  gap: 8px;
  ${colFlex({ align: 'start' })}
`;

const TitleRow = styled.div`
  width: 100%;
  height: 20px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Title = styled.b`
  line-height: 18px;
  font-size: 14px;
  color: #464a4d;
`;

const ContentWrapper = styled.div`
  align-self: stretch;
  position: relative;
  font-size: 12px;
  color: #464a4d;
  flex: 1;
`;

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  width?: number;
  height?: number;
  showDivider?: boolean;
  rightAction?: ReactNode;
}

function DashboardCard({ title, children, width, height, showDivider = true, rightAction }: DashboardCardProps) {
  return (
    <Container width={width} height={height}>
      <TitleRow>
        <Title>{title}</Title>
        {rightAction}
      </TitleRow>
      {showDivider && <DashboardCardDivider />}
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  );
}

export default DashboardCard;
