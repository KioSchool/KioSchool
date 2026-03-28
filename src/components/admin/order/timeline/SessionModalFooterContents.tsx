import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { GhostType } from '@@types/index';
import { TIMELINE_COLORS, SESSION_MESSAGES, GHOST_MESSAGES } from './timelineConstants';
import { match } from 'ts-pattern';

const ModalFooter = styled.div`
  padding: 14px 30px;
  border-top: 1px solid ${TIMELINE_COLORS.BORDER_CARD};
  flex-shrink: 0;
  background: ${TIMELINE_COLORS.BACKGROUND_LIGHT};
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const FooterLabel = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${TIMELINE_COLORS.TEXT_PRIMARY};
`;

const FooterValue = styled.span`
  font-size: 18px;
  font-weight: 800;
  color: ${Color.KIO_ORANGE};
`;

const FooterGuideMessage = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${TIMELINE_COLORS.TEXT_SECONDARY};
`;

interface SessionModalFooterContentsProps {
  totalPrice: number;
  isActive: boolean;
  ghostType: GhostType;
}

function SessionModalFooterContents({ totalPrice, isActive, ghostType }: SessionModalFooterContentsProps) {
  const isGhost = ghostType !== 'NONE';

  return (
    <ModalFooter>
      {match({ isActive, isGhost })
        .with({ isActive: true }, () => <FooterGuideMessage>{SESSION_MESSAGES.ACTIVE_GUIDE}</FooterGuideMessage>)
        .with({ isGhost: true }, () => <FooterGuideMessage>{GHOST_MESSAGES[ghostType].description}</FooterGuideMessage>)
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
