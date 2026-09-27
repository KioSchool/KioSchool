import styled from '@emotion/styled';
import { RiInformationLine } from '@remixicon/react';
import { motion } from 'framer-motion';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const ICON_SIZE_PX = 22;

const MotionContainer = styled(motion.div)`
  position: fixed;
  bottom: max(24px, env(safe-area-inset-bottom));
  width: 100vw;
  z-index: 11;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const NoticeCard = styled.div`
  box-sizing: border-box;
  width: 310px;
  padding: 14px 16px;
  border-radius: 20px;
  border: 1px solid ${Color.KIO_ORANGE_ICON_BG};
  background: ${Color.KIO_ORANGE_FAINT};
  box-shadow: 0 16px 32px 0 rgba(194, 191, 172, 0.6);
  gap: 10px;
  ${rowFlex({ justify: 'start', align: 'center' })};
`;

const Icon = styled(RiInformationLine)`
  flex-shrink: 0;
  width: ${ICON_SIZE_PX}px;
  height: ${ICON_SIZE_PX}px;
  color: ${Color.KIO_ORANGE_DARK};
`;

const TextColumn = styled.div`
  gap: 2px;
  word-break: keep-all;
  ${colFlex({ align: 'start' })};
`;

const Title = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
`;

const Description = styled.span`
  font-size: 13px;
  color: ${Color.TEXT_BODY};
`;

function OrderUnavailableNotice() {
  return (
    <MotionContainer
      className={'order-unavailable-notice-container'}
      role="status"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      <NoticeCard>
        <Icon />
        <TextColumn>
          <Title>아직 주문을 받을 수 없는 테이블입니다.</Title>
          <Description>직원에게 테이블 사용 시작을 요청해주세요.</Description>
        </TextColumn>
      </NoticeCard>
    </MotionContainer>
  );
}

export default OrderUnavailableNotice;
