import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { Color } from '@resources/colors';
import { OrderSession } from '@@types/index';
import { useTableSession } from '@hooks/admin/useTableSession';
import useElapsedTimer from '@hooks/admin/useElapsedTimer';

const Container = styled.div`
  border: 1px solid #ececec;
  border-radius: 10px;
  height: 100%;
  ${colFlex({ justify: 'start', align: 'center' })}
`;

const Content = styled.div`
  flex: 1;
  padding-bottom: 15px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const EndSessionButton = styled.button`
  background: #e8eef2;
  color: #464a4d;
  border: none;
  border-radius: 40px;
  width: 220px;
  height: 29px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })};

  &:hover {
    background: #d9e3e8;
  }
`;

const Header = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  color: ${Color.GREY};
  background-color: #f0f5f8;
  font-size: 15px;
  font-weight: 600;
  border-bottom: 1px solid #ececec;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

interface TableUsageTimeProps {
  orderSession: OrderSession | null;
  workspaceId?: string;
  tableNumber?: number;
  refetchTable: () => void;
}

function TableElapsedTimer({ orderSession, workspaceId, tableNumber, refetchTable }: TableUsageTimeProps) {
  const { isTableSessionActive, maxMinutes, gaugeValue, getGaugeText } = useElapsedTimer(orderSession);
  const { handleEndSession } = useTableSession({
    workspaceId,
    currentExpectedEndAt: orderSession?.expectedEndAt,
    orderSessionId: orderSession?.id,
    tableNumber,
    refetchTable,
  });

  return (
    <Container>
      <Header>사용시간</Header>
      <Content>
        <Gauge
          width={180}
          height={140}
          value={gaugeValue}
          valueMin={0}
          valueMax={maxMinutes}
          startAngle={-90}
          endAngle={90}
          cornerRadius="50%"
          text={({ value }) => getGaugeText(value)}
          sx={{
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 11,
              fontWeight: 500,
              transform: 'translateY(-10px)',
              textAlign: 'center',
            },
            [`& .${gaugeClasses.valueArc}`]: {
              fill: isTableSessionActive ? Color.KIO_ORANGE : Color.LIGHT_GREY,
            },
            [`& .${gaugeClasses.referenceArc}`]: {
              fill: Color.LIGHT_GREY,
            },
          }}
        />
        <EndSessionButton onClick={handleEndSession}>사용 종료</EndSessionButton>
      </Content>
    </Container>
  );
}

export default TableElapsedTimer;
