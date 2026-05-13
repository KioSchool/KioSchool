import styled from '@emotion/styled';
import { FestivalMonthSummary as FestivalMonthSummaryType } from '@@types/index';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;

  ${mobileMediaQuery} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.div`
  padding: 16px;
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 12px;
  background: ${Color.WHITE};
  gap: 6px;

  ${rowFlex({ align: 'flex-start' })}
`;

const Accent = styled.div`
  width: 4px;
  height: 36px;
  border-radius: 2px;
  background: ${Color.KIO_ORANGE};
  flex-shrink: 0;
  margin-right: 10px;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Label = styled.div`
  font-size: 11px;
  color: ${Color.GREY};
  font-weight: 500;
`;

const Value = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${Color.BLACK};
`;

interface SummaryItem {
  label: string;
  value: string;
}

interface FestivalMonthSummaryProps {
  summary: FestivalMonthSummaryType;
}

function FestivalMonthSummary({ summary }: FestivalMonthSummaryProps) {
  const items: SummaryItem[] = [
    { label: '축제 일수', value: `${summary.totalFestivalDays}일` },
    { label: '참여 대학 수', value: `${summary.uniqueUniversities}개교` },
    { label: '총 주문', value: `${summary.totalOrders.toLocaleString()}건` },
    { label: '총 매출', value: `${summary.totalRevenue.toLocaleString()}원` },
    { label: '가장 바쁜 날', value: summary.busiestDay ?? '-' },
  ];

  return (
    <Grid>
      {items.map(({ label, value }) => (
        <Card key={label}>
          <Accent />
          <TextGroup>
            <Label>{label}</Label>
            <Value>{value}</Value>
          </TextGroup>
        </Card>
      ))}
    </Grid>
  );
}

export default FestivalMonthSummary;
