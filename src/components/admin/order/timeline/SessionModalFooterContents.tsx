import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { timelineColors } from './timelineConstants';

const ModalFooter = styled.div`
  padding: 14px 30px;
  border-top: 1px solid ${timelineColors.BORDER_CARD};
  flex-shrink: 0;
  background: ${timelineColors.BACKGROUND_LIGHT};
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const FooterLabel = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${timelineColors.TEXT_PRIMARY};
`;

const FooterValue = styled.span`
  font-size: 18px;
  font-weight: 800;
  color: ${Color.KIO_ORANGE};
`;

interface SessionModalFooterContentsProps {
  totalPrice: number;
}

function SessionModalFooterContents({ totalPrice }: SessionModalFooterContentsProps) {
  return (
    <ModalFooter>
      <FooterLabel>총 매출</FooterLabel>
      <FooterValue>{totalPrice.toLocaleString()}원</FooterValue>
    </ModalFooter>
  );
}

export default SessionModalFooterContents;
