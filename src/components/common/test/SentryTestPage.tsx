import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { RiTestTubeLine, RiBugLine, RiAlarmWarningLine } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import * as Sentry from '@sentry/react';
import useApi from '@hooks/useApi';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
  ${colFlex()};
`;

const TestSection = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  background: white;
  gap: 16px;
  ${colFlex()};
`;

const SectionTitle = styled.h2`
  color: #111827;
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  gap: 8px;
  ${rowFlex({ align: 'center' })};
`;

const TestButton = styled.button<{ variant?: 'danger' | 'warning' | 'primary' }>`
  gap: 8px;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 200px;
  ${rowFlex({ align: 'center', justify: 'center' })};

  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'danger':
        return `
          background: #ef4444;
          color: white;
          &:hover { background: #dc2626; }
        `;
      case 'warning':
        return `
          background: #f59e0b;
          color: white;
          &:hover { background: #d97706; }
        `;
      default:
        return `
          background: ${Color.KIO_ORANGE};
          color: white;
          &:hover { background: #d45500; }
        `;
    }
  }}
`;

const TestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
`;

const InfoBox = styled.div`
  background: #f0f9ff;
  border: 1px solid #0ea5e9;
  border-radius: 8px;
  padding: 16px;
  gap: 8px;
  ${colFlex()};
`;

const InfoTitle = styled.h4`
  color: #0369a1;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
`;

const InfoText = styled.p`
  color: #0284c7;
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
`;

const CodeBlock = styled.pre`
  background: #1f2937;
  color: #e5e7eb;
  padding: 12px;
  border-radius: 6px;
  font-size: 12px;
  overflow-x: auto;
  margin: 8px 0;
`;

// 에러를 발생시키는 컴포넌트들
const ErrorComponent = () => {
  throw new Error('테스트용 React 에러입니다!');
};

const AsyncErrorComponent = () => {
  React.useEffect(() => {
    setTimeout(() => {
      throw new Error('테스트용 비동기 에러입니다!');
    }, 1000);
  }, []);

  return <div>비동기 에러가 1초 후에 발생합니다...</div>;
};

function SentryTestPage() {
  const [showErrorComponent, setShowErrorComponent] = useState(false);
  const [showAsyncError, setShowAsyncError] = useState(false);
  const [replayStatus, setReplayStatus] = useState<string>('확인 중...');
  const { userApi } = useApi();

  // 현재 환경 정보
  const environment = import.meta.env.VITE_ENVIRONMENT || 'development';
  const isDevelopment = environment === 'development';

  // Session Replay 상태 확인
  useEffect(() => {
    const checkReplayStatus = () => {
      // Session Replay가 활성화되어 있는지 확인
      const client = Sentry.getCurrentScope().getClient();
      if (client) {
        const integrations = client.getOptions().integrations || [];
        const hasReplay = integrations.some((integration: any) => integration.name === 'Replay' || integration.constructor?.name === 'Replay');
        setReplayStatus(hasReplay ? '✅ 활성화됨' : '❌ 비활성화됨');
      } else {
        setReplayStatus('❌ Sentry 클라이언트 없음');
      }
    };

    setTimeout(checkReplayStatus, 1000); // 1초 후 확인
  }, []);

  // Session Replay 테스트 (에러 발생시키기)
  const testReplayWithError = () => {
    // 에러를 발생시켜서 Session Replay가 기록되는지 확인
    console.log('🎬 Session Replay 테스트 시작 - 에러 발생 예정');
    setTimeout(() => {
      throw new Error('Session Replay 테스트용 에러');
    }, 500);
  };

  // 1. React 렌더링 에러 테스트
  const testReactError = () => {
    setShowErrorComponent(true);
  };

  // 2. JavaScript 런타임 에러 테스트
  const testJSError = () => {
    // @ts-ignore
    const obj: any = null;
    obj.someProperty.access(); // null reference error
  };

  // 3. 비동기 에러 테스트
  const testAsyncError = () => {
    setShowAsyncError(true);
  };

  // 4. Promise rejection 에러 테스트
  const testPromiseError = () => {
    Promise.reject(new Error('테스트용 Promise rejection 에러'));
  };

  // 5. API 에러 테스트
  const testApiError = () => {
    userApi.get('/non-existent-endpoint').catch((error) => {
      console.log('API 에러가 인터셉터에서 Sentry로 전송되었습니다:', error);
    });
  };

  // 6. 커스텀 에러 수동 전송 테스트
  const testCustomError = () => {
    Sentry.captureException(new Error('수동으로 전송된 커스텀 에러'), {
      tags: {
        testType: 'manual',
        component: 'SentryTestPage',
      },
      extra: {
        customData: 'This is test data',
        timestamp: new Date().toISOString(),
      },
    });
    alert('커스텀 에러가 Sentry로 전송되었습니다!');
  };

  // 7. 메시지만 전송
  const testMessage = () => {
    Sentry.captureMessage('테스트 메시지입니다', 'info');
    alert('테스트 메시지가 전송되었습니다!');
  };

  // 8. 콘솔 에러 테스트
  const testConsoleError = () => {
    console.error('테스트용 콘솔 에러 - Sentry에서 자동 캡처됩니다');
    console.warn('테스트용 콘솔 경고 - Sentry에서 자동 캡처됩니다');
  };

  // 9. 사용자 피드백 테스트
  const testUserFeedback = () => {
    const eventId = Sentry.captureMessage('사용자 피드백 테스트');
    Sentry.showReportDialog({ eventId });
  };

  if (showErrorComponent) {
    return <ErrorComponent />;
  }

  return (
    <Container>
      <h1>🔧 Sentry 에러 추적 테스트 페이지</h1>

      {/* 환경 정보 표시 */}
      <InfoBox
        style={{
          background: isDevelopment ? '#fef3c7' : '#d1fae5',
          borderColor: isDevelopment ? '#f59e0b' : '#10b981',
        }}
      >
        <InfoTitle style={{ color: isDevelopment ? '#92400e' : '#047857' }}>
          🌍 현재 환경: {environment.toUpperCase()} | 🎬 Session Replay: {replayStatus}
        </InfoTitle>
        <InfoText style={{ color: isDevelopment ? '#b45309' : '#059669' }}>
          {isDevelopment ? '개발환경에서도 Sentry로 전송되어 테스트 가능합니다.' : '프로덕션 환경의 모든 에러가 Sentry로 전송됩니다.'}
        </InfoText>
      </InfoBox>

      <InfoBox>
        <InfoTitle>📋 테스트 방법</InfoTitle>
        <InfoText>
          1. 각 버튼을 클릭하여 다양한 종류의 에러를 발생시킵니다
          <br />
          2. Sentry 대시보드에서 에러가 제대로 수집되는지 확인합니다
          <br />
          3. 에러 발생 시 fallback UI가 올바르게 표시되는지 확인합니다
        </InfoText>
      </InfoBox>

      <TestSection>
        <SectionTitle>
          <RiBugLine size={20} />
          React 컴포넌트 에러 테스트
        </SectionTitle>
        <TestGrid>
          <TestButton variant="danger" onClick={testReactError}>
            React 렌더링 에러 발생
          </TestButton>
        </TestGrid>
        <InfoText>이 버튼을 클릭하면 React 컴포넌트에서 에러가 발생하고 ErrorBoundary가 작동합니다.</InfoText>
      </TestSection>

      <TestSection>
        <SectionTitle>
          <RiAlarmWarningLine size={20} />
          JavaScript 에러 테스트
        </SectionTitle>
        <TestGrid>
          <TestButton variant="danger" onClick={testJSError}>
            JS 런타임 에러 발생
          </TestButton>
          <TestButton variant="danger" onClick={testAsyncError}>
            비동기 에러 발생
          </TestButton>
          <TestButton variant="danger" onClick={testPromiseError}>
            Promise Rejection 에러
          </TestButton>
          <TestButton variant="warning" onClick={testReplayWithError}>
            🎬 Session Replay 테스트
          </TestButton>
        </TestGrid>
        <InfoText>Session Replay 테스트는 에러를 발생시켜 자동으로 세션을 기록합니다.</InfoText>
      </TestSection>

      <TestSection>
        <SectionTitle>
          <RiTestTubeLine size={20} />
          API 및 기타 에러 테스트
        </SectionTitle>
        <TestGrid>
          <TestButton variant="warning" onClick={testApiError}>
            API 에러 테스트
          </TestButton>
          <TestButton onClick={testCustomError}>커스텀 에러 전송</TestButton>
          <TestButton onClick={testMessage}>메시지 전송 테스트</TestButton>
          <TestButton onClick={testConsoleError}>콘솔 에러 테스트</TestButton>
          <TestButton onClick={testUserFeedback}>사용자 피드백 다이얼로그</TestButton>
        </TestGrid>
      </TestSection>

      {showAsyncError && <AsyncErrorComponent />}

      <TestSection>
        <SectionTitle>확인할 내용</SectionTitle>
        <InfoBox>
          <InfoTitle>Sentry 대시보드에서 확인할 항목:</InfoTitle>
          <InfoText>
            • 에러 발생 시각과 빈도
            <br />
            • 사용자 정보 (로그인 된 경우)
            <br />
            • 브라우저 및 디바이스 정보
            <br />
            • 에러 스택 트레이스
            <br />
            • 추가 컨텍스트 정보 (tags, extra 데이터)
            <br />• Session Replay (에러 발생 시점 녹화)
          </InfoText>
        </InfoBox>
      </TestSection>

      <TestSection>
        <SectionTitle>🎬 Session Replay 확인 방법</SectionTitle>
        <InfoBox style={{ background: '#f0f4ff', borderColor: '#6366f1' }}>
          <InfoTitle style={{ color: '#4338ca' }}>Sentry 대시보드에서 Session Replay 확인:</InfoTitle>
          <InfoText style={{ color: '#5b21b6' }}>
            1. Issues → 특정 에러 클릭 → "Replay" 탭 확인
            <br />
            2. Replays → 전체 세션 목록 확인
            <br />
            3. 에러가 발생한 순간의 사용자 행동을 비디오로 확인 가능
            <br />
            4. HTTPS 환경에서만 작동 (localhost도 가능)
            <br />
            ⚠️ Session Replay가 보이지 않으면 브라우저 새로고침 후 다시 테스트하세요
          </InfoText>
        </InfoBox>
      </TestSection>

      <TestSection>
        <SectionTitle>테스트 코드 예시</SectionTitle>
        <CodeBlock>
          {`// 1. try-catch로 에러 핸들링
try {
  riskyFunction();
} catch (error) {
  Sentry.captureException(error);
}

// 2. 커스텀 컨텍스트와 함께 에러 전송
Sentry.withScope((scope) => {
  scope.setTag('section', 'payment');
  scope.setLevel('error');
  scope.setContext('payment', { amount: 1000, currency: 'KRW' });
  Sentry.captureException(error);
});`}
        </CodeBlock>
      </TestSection>
    </Container>
  );
}

export default SentryTestPage;
