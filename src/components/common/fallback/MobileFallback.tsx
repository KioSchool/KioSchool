import { RiComputerLine, RiShareLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import { USER_ROUTES } from '@constants/routes';
import {
  FallbackActionRow,
  FallbackContainer,
  FallbackDescription,
  FallbackIconWrapper,
  FallbackTitle,
  PrimaryFallbackLink,
  SecondaryFallbackButton,
} from './fallbackStyles';

function MobileFallback() {
  const handleShare = async () => {
    if (!navigator.share) {
      alert('이 브라우저는 Web Share API를 지원하지 않습니다. 다른 브라우저를 사용해주세요.');
      return;
    }

    await navigator.share({
      title: '키오스쿨',
      url: window.location.href,
    });
  };

  return (
    <FallbackContainer>
      <FallbackIconWrapper>
        <RiComputerLine size={32} color={Color.KIO_ORANGE} />
      </FallbackIconWrapper>
      <FallbackTitle>PC에서 이용해주세요</FallbackTitle>
      <FallbackDescription>
        해당 페이지는 PC 환경에 최적화되어 있습니다.
        <br />더 나은 경험을 위해 PC에서 접속해주세요.
      </FallbackDescription>
      <FallbackActionRow>
        <PrimaryFallbackLink to={USER_ROUTES.HOME}>홈으로 돌아가기</PrimaryFallbackLink>
        <SecondaryFallbackButton type="button" onClick={handleShare}>
          <RiShareLine size={16} />
          링크 공유
        </SecondaryFallbackButton>
      </FallbackActionRow>
    </FallbackContainer>
  );
}

export default MobileFallback;
