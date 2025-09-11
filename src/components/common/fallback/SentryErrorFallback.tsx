import styled from '@emotion/styled';
import { RiErrorWarningLine, RiRefreshLine, RiHomeLine } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';

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
  gap: 32px;
  background: white;
  padding: 48px 40px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  max-width: 480px;
  width: 90%;
  text-align: center;
  ${colFlex({ align: 'center' })};
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  background: #fef2f2;
  border-radius: 50%;
  margin-bottom: 8px;
  ${colFlex({ align: 'center', justify: 'center' })};
`;

const Title = styled.h1`
  color: #111827;
  margin: 0;
  margin-bottom: 8px;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ErrorMessage = styled.p`
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  gap: 16px;
  width: 100%;
  ${rowFlex({ justify: 'center' })};
`;

const ActionButton = styled.button`
  gap: 8px;
  background: ${Color.KIO_ORANGE};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  flex: 1;
  max-width: 140px;
  box-shadow: 0 4px 12px rgba(255, 147, 51, 0.3);
  ${rowFlex({ align: 'center', justify: 'center' })};

  &:hover {
    background: #e5860a;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 147, 51, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(255, 147, 51, 0.3);
  }
`;

const SecondaryButton = styled(ActionButton)`
  background: #6366f1;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);

  &:hover {
    background: #5048e5;
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
  }

  &:active {
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
  }
`;

const TipsContainer = styled.div`
  width: 100%;
  gap: 12px;
  padding: 20px;
  background: #f0f9ff;
  border-radius: 12px;
  border-left: 4px solid #3b82f6;
  text-align: left;
  ${colFlex()};
`;

const TipsTitle = styled.h3`
  color: #1d4ed8;
  margin: 0;
  margin-bottom: 8px;
  font-size: 1rem;
  font-weight: 600;
`;

const TipsList = styled.ul`
  margin: 0;
  padding-left: 16px;
  ${colFlex({ align: 'start' })};
`;

const TipItem = styled.li`
  color: #2563eb;
  line-height: 1.4;
  margin-bottom: 4px;
`;

function SentryErrorFallback() {
  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <Container>
      <ContentBox>
        <IconContainer>
          <RiErrorWarningLine size={32} color="#ef4444" />
        </IconContainer>

        <Title>예상치 못한 오류가 발생했습니다</Title>
        <ErrorMessage>
          문제가 자동으로 보고되었으며, 팀에서 빠르게 해결하도록 하겠습니다.
          <br />
          불편을 드려 죄송합니다.
        </ErrorMessage>

        <ButtonContainer>
          <ActionButton onClick={handleReload}>
            <RiRefreshLine size={18} />
            새로고침
          </ActionButton>
          <SecondaryButton onClick={handleGoHome}>
            <RiHomeLine size={18} />
            홈으로
          </SecondaryButton>
        </ButtonContainer>

        <TipsContainer>
          <TipsTitle>💡 문제 해결 방법</TipsTitle>
          <TipsList>
            <TipItem>페이지를 새로고침 해보세요</TipItem>
            <TipItem>브라우저 캐시를 삭제해보세요</TipItem>
            <TipItem>다른 브라우저에서 시도해보세요</TipItem>
            <TipItem>문제가 지속되면 관리자에게 문의해주세요</TipItem>
            <TipItem>
              Instagram:{' '}
              <a href="https://www.instagram.com/kioschool" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>
                @kioschool
              </a>
            </TipItem>
          </TipsList>
        </TipsContainer>
      </ContentBox>
    </Container>
  );
}

export default SentryErrorFallback;
