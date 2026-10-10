import { P, match } from 'ts-pattern';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';

const Container = styled.div<{ height?: number; compact?: boolean }>`
  min-height: ${({ height, compact }) => height ?? (compact ? 116 : 123)}px;
  min-width: ${({ compact }) => (compact ? 0 : 193)}px;
  flex: 1;
  box-shadow: 0px 4px 20px rgba(92, 92, 92, 0.05);
  border-radius: 16px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  padding: ${({ compact }) => (compact ? '12px 14px' : '14px 21px')};
  position: relative;
  isolation: isolate;
  gap: ${({ compact }) => (compact ? '6px' : '8px')};
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

const Title = styled.b<{ compact?: boolean }>`
  line-height: 18px;
  font-size: ${({ compact }) => (compact ? '12px' : '14px')};
  color: #464a4d;
`;

const Value = styled.b<{ color?: string; compact?: boolean }>`
  line-height: ${({ compact }) => (compact ? '32px' : '42px')};
  font-size: ${({ compact }) => (compact ? '21px' : '26px')};
  color: ${({ color }) => color || '#464a4d'};
`;

const Unit = styled.span<{ compact?: boolean }>`
  font-size: ${({ compact }) => (compact ? '16px' : '22px')};
`;

const Description = styled.div<{ compact?: boolean }>`
  line-height: 15px;
  font-size: ${({ compact }) => (compact ? '12px' : '14px')};
  color: #939393;
`;

const DescriptionBold = styled.b`
  color: #464a4d;
`;

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  descriptionHighlight?: string;
  highlightRate?: number;
  height?: number;
  valueColor?: string;
  compact?: boolean;
}

function StatCard({ title, value, unit, description, descriptionHighlight, highlightRate, height, valueColor, compact = false }: StatCardProps) {
  const renderDescription = () => {
    if (!description) return null;
    if (!descriptionHighlight || !description.includes(descriptionHighlight)) {
      return <Description compact={compact}>{description}</Description>;
    }
    const index = description.indexOf(descriptionHighlight);
    const before = description.slice(0, index);
    const after = description.slice(index + descriptionHighlight.length);
    return (
      <Description compact={compact}>
        {before}
        <DescriptionBold>{descriptionHighlight}</DescriptionBold>
        {after}
      </Description>
    );
  };

  return (
    <Container height={height} compact={compact}>
      {match(highlightRate)
        .with(P.number.gt(0), (rate) => <BackgroundHighlight rate={rate} />)
        .otherwise(() => null)}
      <Title compact={compact}>{title}</Title>
      <Value color={valueColor} compact={compact}>
        {value}
        {unit && <Unit compact={compact}>{unit}</Unit>}
      </Value>
      {renderDescription()}
    </Container>
  );
}

export default StatCard;
