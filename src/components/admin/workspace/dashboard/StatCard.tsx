import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';

const Container = styled.div`
  height: 123px;
  width: 193px;
  box-shadow: 0px 4px 20px rgba(92, 92, 92, 0.05);
  border-radius: 16px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  padding: 14px 21px;
  position: relative;
  isolation: isolate;
  gap: 8px;
  overflow: hidden;
  ${colFlex({ align: 'start' })}
`;

const BackgroundHighlight = styled.div<{ rate: number }>`
  width: ${({ rate }) => `${rate}%`};
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff0e5;
  z-index: -1;
`;

const Title = styled.b`
  line-height: 18px;
  font-size: 14px;
  color: #464a4d;
`;

const Value = styled.b`
  line-height: 42px;
  font-size: 26px;
  color: #464a4d;
`;

const Description = styled.div`
  line-height: 15px;
  font-size: 14px;
  color: #939393;
`;

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  highlightRate?: number;
}

function StatCard({ title, value, description, highlightRate }: StatCardProps) {
  return (
    <Container>
      {highlightRate !== undefined && highlightRate > 0 ? <BackgroundHighlight rate={highlightRate} /> : null}
      <Title>{title}</Title>
      <Value>{value}</Value>
      <Description>{description}</Description>
    </Container>
  );
}

export default StatCard;
