import { useState } from 'react';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import OrderSessionDetailCardList from './OrderSessionDetailCardList';
import { RiTimeFill } from '@remixicon/react';
import { formatDate, calculateDuration } from '@utils/FormatDate';
import { format } from 'date-fns/format';

const Container = styled.div<{ isOpen: boolean }>`
  width: 100%;
  background: ${({ isOpen }) => (isOpen ? '#fcfcfc' : Color.WHITE)};
  border: ${({ isOpen }) => (isOpen ? '1px solid #e8eef2' : 'none')};
  border-radius: ${({ isOpen }) => (isOpen ? '0 0 15px 15px' : '0')};
  overflow: hidden;
  ${colFlex({ align: 'center' })}
`;

const HeaderContainer = styled.div<{ isOpen: boolean }>`
  width: 100%;
  padding: 15px 20px;
  background: ${({ isOpen }) => (isOpen ? '#fcfcfc' : Color.WHITE)};
  border-bottom: 1px solid #e8eef2;
  box-sizing: border-box;
  cursor: pointer;
  ${rowFlex({ justify: 'space-between', align: 'flex-end' })}
`;

const InfoContainer = styled.div`
  gap: 6px;
  ${colFlex({ align: 'flex-start' })}
`;

const TimeRow = styled.div`
  gap: 6px;
  ${rowFlex({ align: 'center', justify: 'center' })}
`;

const TimeText = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #464a4d;
  line-height: normal;
`;

const MetaRow = styled.div`
  gap: 6px;
  font-size: 12px;
  font-weight: 400;
  color: #464a4d;
  line-height: normal;
  ${rowFlex({ align: 'flex-start' })}
`;

const StatusBadge = styled.div<{ isActive: boolean }>`
  width: 71px;
  height: 24px;
  background: ${({ isActive }) => (isActive ? Color.KIO_ORANGE : Color.WHITE)};
  border: 1px solid ${({ isActive }) => (isActive ? Color.KIO_ORANGE : '#e8eef2')};
  border-radius: 6px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ isActive }) => (isActive ? Color.WHITE : '#464a4d')};
  text-align: center;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const DetailListWrapper = styled.div`
  width: 100%;
  padding: 0 17px;
  background: ${Color.WHITE};
  box-sizing: border-box;
`;

const BottomPadding = styled.div`
  width: 100%;
  height: 11px;
  background: #fcfcfc;
`;

interface OrderSessionCardProps {
  orderSessionId: number;
  sessionStartDate: Date;
  sessionEndDate: Date;
  endAt: string | null;
  tableNumber: number;
  totalPrice?: number;
  serveStatus: string;
}

function OrderSessionCard({ orderSessionId, sessionStartDate, sessionEndDate, endAt, tableNumber, serveStatus }: OrderSessionCardProps) {
  const [isOpenOrderSessionDetailCard, setIsOpenOrderSessionDetailCard] = useState(false);

  const isActive = !endAt;
  const timeRange = isActive ? `사용 중 (${format(sessionStartDate, 'HH:mm')}~)` : `${format(sessionStartDate, 'HH:mm')} - ${format(sessionEndDate, 'HH:mm')}`;
  const dateStr = formatDate(sessionStartDate.toISOString());
  const duration = isActive ? '사용 중' : calculateDuration(sessionStartDate, sessionEndDate);

  return (
    <Container isOpen={isOpenOrderSessionDetailCard}>
      <HeaderContainer isOpen={isOpenOrderSessionDetailCard} onClick={() => setIsOpenOrderSessionDetailCard(!isOpenOrderSessionDetailCard)}>
        <InfoContainer>
          <TimeRow>
            <RiTimeFill size={16} color="#464a4d" />
            <TimeText>{timeRange}</TimeText>
          </TimeRow>
          <MetaRow>
            <span>{dateStr}</span>
            <span>·</span>
            <span>{duration}</span>
            <span>·</span>
            <span>테이블 {tableNumber}</span>
          </MetaRow>
        </InfoContainer>
        <StatusBadge isActive={isActive}>{isActive ? '사용중' : '사용완료'}</StatusBadge>
      </HeaderContainer>
      {isOpenOrderSessionDetailCard && (
        <>
          <DetailListWrapper>
            <OrderSessionDetailCardList orderSessionId={orderSessionId} serveStatus={serveStatus} />
          </DetailListWrapper>
          <BottomPadding />
        </>
      )}
    </Container>
  );
}

export default OrderSessionCard;
