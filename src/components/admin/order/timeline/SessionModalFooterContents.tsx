import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { timelineColors, SESSION_MESSAGES } from './timelineConstants';
import { match } from 'ts-pattern';

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

const FooterGuideMessage = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${timelineColors.TEXT_SECONDARY};
`;

interface SessionModalFooterContentsProps {
  totalPrice: number;
  isActive: boolean;
  isGhost: boolean;
}

function SessionModalFooterContents({ totalPrice, isActive, isGhost }: SessionModalFooterContentsProps) {
  return (
    <ModalFooter>
      {match({ isActive, isGhost })
        .with({ isActive: true }, () => <FooterGuideMessage>{SESSION_MESSAGES.ACTIVE_GUIDE}</FooterGuideMessage>)
        .with({ isGhost: true }, () => <FooterGuideMessage>{SESSION_MESSAGES.GHOST_DESCRIPTION}</FooterGuideMessage>)
        .otherwise(() => (
          <>
            <FooterLabel>총 매출</FooterLabel>
            <FooterValue>{totalPrice.toLocaleString()}원</FooterValue>
          </>
        ))}
    </ModalFooter>
  );
}

export default SessionModalFooterContents;
