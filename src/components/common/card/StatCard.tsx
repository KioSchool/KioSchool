import { P, match } from 'ts-pattern';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';

const DEFAULT_STAT_CARD_HEIGHT = 123;

const Container = styled.div<{ height?: number }>`
  min-height: ${({ height }) => height ?? DEFAULT_STAT_CARD_HEIGHT}px;
  min-width: 0;
  flex: 1;
  box-shadow: 0px 4px 20px rgba(92, 92, 92, 0.05);
  border-radius: 16px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  padding: 10px 14px;
  position: relative;
  isolation: isolate;
  gap: 6px;
  overflow: hidden;
  ${colFlex({ align: 'start', justify: 'center' })}
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
  font-size: 12px;
  color: #464a4d;
`;

const Value = styled.b<{ color?: string }>`
  line-height: 32px;
  font-size: 21px;
  color: ${({ color }) => color || '#464a4d'};
`;

const Unit = styled.span`
  font-size: 16px;
`;

const Description = styled.div`
  line-height: 15px;
  font-size: 12px;
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
}

function StatCard({ title, value, unit, description, descriptionHighlight, highlightRate, height, valueColor }: StatCardProps) {
  const renderDescription = () => {
    if (!description) return null;
    if (!descriptionHighlight || !description.includes(descriptionHighlight)) {
      return <Description>{description}</Description>;
    }
    const index = description.indexOf(descriptionHighlight);
    const before = description.slice(0, index);
    const after = description.slice(index + descriptionHighlight.length);
    return (
      <Description>
        {before}
        <DescriptionBold>{descriptionHighlight}</DescriptionBold>
        {after}
      </Description>
    );
  };

  return (
    <Container height={height}>
      {match(highlightRate)
        .with(P.number.gt(0), (rate) => <BackgroundHighlight rate={rate} />)
        .otherwise(() => null)}
      <Title>{title}</Title>
      <Value color={valueColor}>
        {value}
        {unit && <Unit>{unit}</Unit>}
      </Value>
      {renderDescription()}
    </Container>
  );
}

export default StatCard;
