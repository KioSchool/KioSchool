import styled from '@emotion/styled';
import { useSetAtom } from 'jotai';
import { RiLayoutGridFill } from '@remixicon/react';
import NewCommonButton from '@components/common/button/NewCommonButton';
import usePopup from '@hooks/usePopup';
import { adminTableViewModeAtom, TABLE_VIEW } from '@jotai/admin/atoms';
import { POPUP_CLOSE_MODE } from '@constants/data/popupData';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

export const TABLE_LAYOUT_PROMO_POPUP_ID = 3;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 12px;
  gap: 14px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const IconCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: ${Color.KIO_ORANGE_ICON_BG};
  color: ${Color.KIO_ORANGE};
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const HeroIcon = styled(RiLayoutGridFill)`
  width: 20px;
  height: 20px;
`;

const TitleGroup = styled.div`
  gap: 8px;
  ${colFlex({ align: 'center' })};
`;

const NewPill = styled.span`
  padding: 3px 9px;
  border-radius: 999px;
  background: ${Color.KIO_ORANGE_FAINT};
  color: ${Color.KIO_ORANGE};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.02em;
  line-height: 1.3;
`;

const Title = styled.div`
  text-align: center;
  word-break: keep-all;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.4;
`;

const Description = styled.div`
  text-align: center;
  word-break: keep-all;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.45;
  opacity: 0.56;
  white-space: pre-wrap;
`;

const CtaButton = styled(NewCommonButton)`
  margin-top: 6px;
`;

const CtaIcon = styled(RiLayoutGridFill)`
  width: 18px;
  height: 18px;
`;

function TableLayoutPromoPopupContent() {
  const setViewMode = useSetAtom(adminTableViewModeAtom);
  const { closePopup } = usePopup();

  const handleClickCta = () => {
    setViewMode(TABLE_VIEW.LAYOUT);
    closePopup(TABLE_LAYOUT_PROMO_POPUP_ID, POPUP_CLOSE_MODE.FOREVER);
  };

  return (
    <Container>
      <IconCircle>
        <HeroIcon />
      </IconCircle>
      <TitleGroup>
        <NewPill>NEW</NewPill>
        <Title>테이블 배치 기능이 추가되었습니다</Title>
      </TitleGroup>
      <Description>
        매장 구조 그대로 테이블을 배치하고 상태를 한눈에 확인해 보세요.
        {'\n'}
        상단 오른쪽 보기 전환 버튼으로 언제든 목록과 배치를 오갈 수 있습니다.
      </Description>
      <CtaButton size="sm" gap={6} icon={<CtaIcon />} onClick={handleClickCta}>
        배치 보기
      </CtaButton>
    </Container>
  );
}

export default TableLayoutPromoPopupContent;
