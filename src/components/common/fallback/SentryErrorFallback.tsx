import { RiErrorWarningLine, RiHomeLine, RiRefreshLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import { USER_ROUTES } from '@constants/routes';
import {
  FallbackActionRow,
  FallbackContactLink,
  FallbackContactText,
  FallbackContainer,
  FallbackDescription,
  FallbackIconWrapper,
  FallbackTipItem,
  FallbackTipsContainer,
  FallbackTipsList,
  FallbackTipsTitle,
  FallbackTitle,
  PrimaryFallbackButton,
  SecondaryFallbackButton,
} from './fallbackStyles';

function SentryErrorFallback() {
  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = USER_ROUTES.HOME;
  };

  return (
    <FallbackContainer>
      <FallbackIconWrapper>
        <RiErrorWarningLine size={32} color={Color.KIO_ORANGE} />
      </FallbackIconWrapper>
      <FallbackTitle>예상치 못한 오류가 발생했습니다</FallbackTitle>
      <FallbackDescription>
        문제가 자동으로 보고되었습니다.
        <br />
        새로고침 후에도 문제가 지속되면 관리자에게 문의해주세요.
      </FallbackDescription>
      <FallbackTipsContainer>
        <FallbackTipsTitle>문제 해결 방법</FallbackTipsTitle>
        <FallbackTipsList>
          <FallbackTipItem>인터넷 연결 상태를 확인해주세요.</FallbackTipItem>
          <FallbackTipItem>브라우저를 새로고침 해보세요.</FallbackTipItem>
          <FallbackTipItem>잠시 후 다시 접속해보세요.</FallbackTipItem>
          <FallbackTipItem>문제가 지속되면 관리자에게 문의해주세요.</FallbackTipItem>
        </FallbackTipsList>
      </FallbackTipsContainer>
      <FallbackActionRow>
        <PrimaryFallbackButton type="button" onClick={handleReload}>
          <RiRefreshLine size={18} />
          새로고침
        </PrimaryFallbackButton>
        <SecondaryFallbackButton type="button" onClick={handleGoHome}>
          <RiHomeLine size={18} />
          홈으로
        </SecondaryFallbackButton>
      </FallbackActionRow>
      <FallbackContactText>
        Instagram:{' '}
        <FallbackContactLink href="https://www.instagram.com/kioschool" target="_blank" rel="noopener noreferrer">
          @kioschool
        </FallbackContactLink>
      </FallbackContactText>
    </FallbackContainer>
  );
}

export default SentryErrorFallback;
