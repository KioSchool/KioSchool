import styled from '@emotion/styled';
import { RiRefreshLine, RiServerLine, RiWifiOffLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import {
  FallbackActionRow,
  FallbackContactLink,
  FallbackContactText,
  FallbackContainer,
  FallbackDescription,
  FallbackIconWrapper,
  FallbackTitle,
  PrimaryFallbackButton,
} from './fallbackStyles';

const TipsContainer = styled.div`
  width: 100%;
  max-width: 360px;
  gap: 12px;
  margin-top: 28px;
  padding: 18px 20px;
  box-sizing: border-box;
  background: ${Color.WHITE};
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 12px;
  ${colFlex()};

  ${mobileMediaQuery} {
    max-width: 320px;
    margin-top: 24px;
    padding: 16px 18px;
  }
`;

const TipsTitle = styled.h3`
  color: ${Color.BLACK};
  font-size: 14px;
  font-weight: 700;
  margin: 0;

  ${mobileMediaQuery} {
    font-size: 13px;
  }
`;

const TipsList = styled.ul`
  margin: 0;
  padding-left: 0;
  list-style: none;
  ${colFlex({ align: 'start' })};
`;

const TipItem = styled.li`
  position: relative;
  padding-left: 14px;
  color: ${Color.GREY};
  font-size: 13px;
  line-height: 1.5;
  word-break: keep-all;

  &::before {
    content: '-';
    position: absolute;
    top: 0;
    left: 0;
    color: ${Color.GREY};
  }

  ${mobileMediaQuery} {
    font-size: 12px;
  }
`;

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
      <TipsContainer>
        <TipsTitle>문제 해결 방법</TipsTitle>
        <TipsList>
          <TipItem>인터넷 연결 상태를 확인해주세요.</TipItem>
          <TipItem>브라우저를 새로고침 해보세요.</TipItem>
          <TipItem>잠시 후 다시 접속해보세요.</TipItem>
          <TipItem>문제가 지속되면 관리자에게 문의해주세요.</TipItem>
        </TipsList>
      </TipsContainer>
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
