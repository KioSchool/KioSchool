import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { formatNumber, formatPercent } from '@utils/formatNumber';

const FULL_WIDTH_PERCENT = 100;

export interface RatioBarItem {
  key: string;
  label: string;
  count: number;
  ratio: number;
}

const Card = styled.div`
  background: ${Color.WHITE};
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 18px;
  gap: 14px;
  ${colFlex()}

  ${mobileMediaQuery} {
    padding: 14px;
    gap: 12px;
    border-radius: 10px;
  }
`;

const Row = styled.div`
  width: 100%;
  gap: 6px;
  ${colFlex()}
`;

const RowHeader = styled.div`
  width: 100%;
  gap: 8px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Label = styled.div`
  font-size: 13px;
  color: ${Color.BLACK};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Figure = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
  flex-shrink: 0;
  gap: 6px;
  ${rowFlex({ align: 'center' })}
`;

const Count = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${Color.BLACK};
`;

const Track = styled.div`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: ${Color.LIGHT_GREY};
  overflow: hidden;
`;

const Fill = styled.div<{ ratio: number }>`
  width: ${({ ratio }) => Math.min(Math.max(ratio, 0), 1) * FULL_WIDTH_PERCENT}%;
  height: 100%;
  border-radius: 3px;
  background: ${Color.KIO_ORANGE};
  transition: width 0.4s ease;
`;

const Empty = styled.div`
  font-size: 13px;
  color: ${Color.GREY};
  text-align: center;
  padding: 12px 0;
`;

interface RatioBarListProps {
  items: RatioBarItem[];
  unit: string;
}

function RatioBarList({ items, unit }: RatioBarListProps) {
  if (items.length === 0) {
    return (
      <Card>
        <Empty>데이터가 없습니다.</Empty>
      </Card>
    );
  }

  return (
    <Card>
      {items.map((item) => (
        <Row key={item.key}>
          <RowHeader>
            <Label title={item.label}>{item.label}</Label>
            <Figure>
              <Count>
                {formatNumber(item.count)}
                {unit}
              </Count>
              {formatPercent(item.ratio)}
            </Figure>
          </RowHeader>
          <Track>
            <Fill ratio={item.ratio} />
          </Track>
        </Row>
      ))}
    </Card>
  );
}

export default RatioBarList;
