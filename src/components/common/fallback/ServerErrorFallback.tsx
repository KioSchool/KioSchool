import { RiRefreshLine, RiServerLine, RiWifiOffLine } from '@remixicon/react';
import { Color } from '@resources/colors';
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
} from './fallbackStyles';

interface ServerErrorFallbackProps {
  error: string | null;
  onRetry: () => void;
  isRetrying?: boolean;
}

function ServerErrorFallback({ error, onRetry, isRetrying = false }: ServerErrorFallbackProps) {
  const getErrorIcon = () => {
    if (error?.includes('네트워크')) {
      return <RiWifiOffLine size={32} color={Color.KIO_ORANGE} />;
    }
    return <RiServerLine size={32} color={Color.KIO_ORANGE} />;
  };

  return (
    <FallbackContainer>
      <FallbackIconWrapper>{getErrorIcon()}</FallbackIconWrapper>
      <FallbackTitle>서버 연결 오류</FallbackTitle>
      <FallbackDescription>
        {error || '서버에 연결할 수 없습니다.'}
        <br />
        인터넷 연결 상태를 확인한 뒤 다시 시도해주세요.
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
        <PrimaryFallbackButton type="button" onClick={onRetry} disabled={isRetrying}>
          <RiRefreshLine size={18} />
          {isRetrying ? '재연결 중...' : '다시 시도'}
        </PrimaryFallbackButton>
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

export default ServerErrorFallback;
