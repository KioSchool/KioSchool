import styled from '@emotion/styled';
import { RiRefreshLine, RiServerLine, RiWifiOffLine } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';

interface ServerErrorFallbackProps {
  error: string | null;
  onRetry: () => void;
  isRetrying?: boolean;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  ${colFlex({ align: 'center', justify: 'center' })};
`;

const ContentBox = styled.div`
  ${colFlex({ align: 'center' })};
  gap: 32px;
  background: white;
  padding: 48px 40px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  max-width: 480px;
  width: 90%;
  text-align: center;
`;

const IconContainer = styled.div`
  ${colFlex({ align: 'center', justify: 'center' })};
  width: 80px;
  height: 80px;
  background: #f9fafb;
  border-radius: 50%;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  color: #111827;
  margin: 0;
  margin-bottom: 8px;
`;

const ErrorMessage = styled.p`
  color: #4b5563;
  margin: 0;
  line-height: 1.5;
`;

const RetryButton = styled.button<{ isRetrying: boolean }>`
  gap: 8px;
  background: ${(props) => (props.isRetrying ? '#9ca3af' : '#EB6D09')};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 24px;
  cursor: ${(props) => (props.isRetrying ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  width: 100%;

  ${rowFlex({ align: 'center', justify: 'center' })};
  &:hover {
    background: ${(props) => (props.isRetrying ? '#9ca3af' : '#d45500')};
    transform: ${(props) => (props.isRetrying ? 'none' : 'translateY(-1px)')};
  }

  &:active {
    transform: ${(props) => (props.isRetrying ? 'none' : 'translateY(0)')};
  }
`;

const TipsContainer = styled.div`
  gap: 12px;
  padding: 20px;
  background: #eff6ff;
  border-radius: 12px;
  border-left: 4px solid #3b82f6;
  ${colFlex()};
`;

const TipsTitle = styled.h3`
  color: #1d4ed8;
  margin: 0;
`;

const TipsList = styled.ul`
  margin: 0;
  padding-left: 16px;
  ${colFlex({ align: 'start' })};
`;

const TipItem = styled.li`
  color: #2563eb;
  line-height: 1.4;
`;

function ServerErrorFallback({ error, onRetry, isRetrying = false }: ServerErrorFallbackProps) {
  const getErrorIcon = () => {
    if (error?.includes('네트워크')) {
      return <RiWifiOffLine size={32} color="#6b7280" />;
    }
    return <RiServerLine size={32} color="#6b7280" />;
  };

  return (
    <Container>
      <ContentBox>
        <IconContainer>{getErrorIcon()}</IconContainer>

        <div>
          <Title>서버 연결 오류</Title>
          <ErrorMessage>{error || '서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.'}</ErrorMessage>
        </div>

        <RetryButton onClick={onRetry} disabled={isRetrying} isRetrying={isRetrying}>
          <RiRefreshLine size={18} />
          {isRetrying ? '재연결 중...' : '다시 시도'}
        </RetryButton>

        <TipsContainer>
          <TipsTitle>💡 문제 해결 방법</TipsTitle>
          <TipsList>
            <TipItem>인터넷 연결 상태를 확인해주세요</TipItem>
            <TipItem>브라우저를 새로고침 해보세요</TipItem>
            <TipItem>잠시 후 다시 접속 해보세요</TipItem>
            <TipItem>문제가 지속되면 관리자에게 문의 해주세요</TipItem>
            <TipItem>Instagram: @kioschool</TipItem>
          </TipsList>
        </TipsContainer>
      </ContentBox>
    </Container>
  );
}

export default ServerErrorFallback;
