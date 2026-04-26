import styled from '@emotion/styled';
import NewCommonButton from '@components/common/button/NewCommonButton';
import OnboardingContainer from '@components/onboarding/OnboardingContainer';
import OnboardingHeader from '@components/onboarding/OnboardingHeader';
import { ADMIN_ROUTES } from '@constants/routes';
import { OnboardingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useNavigate } from 'react-router-dom';

const HighlightCard = styled.div`
  width: 100%;
  padding: 28px 24px;
  border: 1.5px solid ${OnboardingColor.STEP_ACTIVE_BORDER};
  border-radius: 24px;
  background: ${OnboardingColor.STEP_ACTIVE_BG};
  box-sizing: border-box;
  gap: 8px;
  ${colFlex({ align: 'start' })}
`;

const StepTitle = styled.div`
  color: ${OnboardingColor.TITLE_TEXT};
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
`;

const StepDescription = styled.div`
  color: ${OnboardingColor.BODY_TEXT};
  font-size: 14px;
  line-height: 1.7;
`;

const ActionRow = styled.div`
  width: 100%;
  padding-top: 12px;
  ${rowFlex({ justify: 'start', align: 'center' })}
`;

function HomeOnboarding() {
  const navigate = useNavigate();

  const handleMoveRegisterAccount = () => {
    navigate(ADMIN_ROUTES.REGISTER_ACCOUNT);
  };

  return (
    <OnboardingContainer>
      <OnboardingHeader
        eyebrow="ACCOUNT SETUP"
        title="계좌를 먼저 등록해야 주점을 생성하고 운영할 수 있습니다"
        description="계좌 정보를 등록하면 주문 결제 안내에 필요한 정보가 연결되고, 그 다음부터 주점을 추가해 운영을 시작할 수 있습니다."
      />

      <HighlightCard>
        <StepTitle>계좌 정보를 등록해주세요</StepTitle>
        <StepDescription>계좌 관리 페이지에서 은행, 예금주, 계좌번호와 토스 QR을 입력하면 바로 홈으로 돌아와 주점을 만들 수 있습니다.</StepDescription>
        <ActionRow>
          <NewCommonButton type="button" size="sm" onClick={handleMoveRegisterAccount}>
            계좌 등록하러 가기
          </NewCommonButton>
        </ActionRow>
      </HighlightCard>
    </OnboardingContainer>
  );
}

export default HomeOnboarding;
