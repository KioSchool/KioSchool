import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { RiArrowRightLine, RiCheckLine, RiRefreshLine } from '@remixicon/react';
import { OnboardingStep } from '@@types/onboarding';
import { adminWorkspaceAtom } from '@jotai/admin/atoms';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { getInitialOnboardingStep, isOnboardingStepCompleted, ONBOARDING_STEP_DEFINITIONS } from '@utils/onboarding';
import OnboardingProgress from './OnboardingProgress';

const Container = styled.div`
  width: 100%;
  max-width: 1080px;
  padding: 12px 0 72px;
  box-sizing: border-box;
  gap: 28px;
  ${colFlex({ align: 'center' })}
`;

const Header = styled.div`
  width: 100%;
  gap: 12px;
  ${colFlex({ align: 'start' })}
`;

const Eyebrow = styled.div`
  color: #8d959c;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
`;

const Title = styled.h1`
  margin: 0;
  color: #25282b;
  font-size: 36px;
  line-height: 1.2;
`;

const Description = styled.p`
  margin: 0;
  color: #5d6368;
  font-size: 17px;
  line-height: 1.7;
`;

const SummaryCard = styled.div`
  width: 100%;
  padding: 24px 28px;
  border-radius: 24px;
  border: 1px solid #e8eef2;
  background: linear-gradient(180deg, #ffffff 0%, #fffaf6 100%);
  box-sizing: border-box;
  gap: 18px;
  ${colFlex({ align: 'start' })}
`;

const SummaryRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
`;

const SummaryItem = styled.div`
  padding: 18px;
  border-radius: 20px;
  border: 1px solid #f1e2d4;
  background: #ffffff;
  box-sizing: border-box;
  gap: 6px;
  ${colFlex({ align: 'start' })}
`;

const SummaryLabel = styled.div`
  color: #8d959c;
  font-size: 13px;
  font-weight: 700;
`;

const SummaryValue = styled.div`
  color: #25282b;
  font-size: 22px;
  font-weight: 700;
`;

const SummaryDescription = styled.div`
  color: #5d6368;
  font-size: 15px;
  line-height: 1.7;
`;

const ActionsRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  gap: 16px;
`;

const ProgressContainer = styled.div`
  flex: 1;
`;

const RefreshButton = styled.button`
  border: 1px solid #e8eef2;
  background: #ffffff;
  color: #5d6368;
  padding: 10px 14px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}
  gap: 8px;

  &:hover {
    color: ${Color.KIO_ORANGE};
    border-color: #ffd7b8;
  }
`;

const StepList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const StepCard = styled.div`
  padding: 24px;
  border-radius: 24px;
  border: 1px solid #e8eef2;
  background: #ffffff;
  box-sizing: border-box;
  gap: 18px;
  ${colFlex({ align: 'start' })}
`;

const StepMeta = styled.div`
  gap: 10px;
  ${colFlex({ align: 'start' })}
`;

const StepBadge = styled.div<{ completed: boolean }>`
  padding: 8px 12px;
  border-radius: 999px;
  background: ${({ completed }) => (completed ? '#edf9f1' : '#fff3e7')};
  color: ${({ completed }) => (completed ? Color.GREEN : Color.KIO_ORANGE)};
  font-size: 13px;
  font-weight: 700;
  ${rowFlex({ justify: 'center', align: 'center' })}
  gap: 6px;
`;

const StepTitle = styled.div`
  color: #25282b;
  font-size: 22px;
  font-weight: 700;
`;

const StepDescription = styled.div`
  color: #5d6368;
  font-size: 15px;
  line-height: 1.7;
`;

const StepHint = styled.div`
  color: #7b858c;
  font-size: 14px;
  line-height: 1.6;
`;

const StepButton = styled.button`
  border: none;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  padding: 12px 16px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}
  gap: 8px;

  &:hover {
    background: #ffaf70;
  }
`;

interface StepCardItem {
  step: OnboardingStep;
  title: string;
  description: string;
  hint: string;
  buttonLabel: string;
  path: string;
}

interface AdminWorkspaceOnboardingProps {
  workspaceId: string;
}

function AdminWorkspaceOnboarding({ workspaceId }: AdminWorkspaceOnboardingProps) {
  const navigate = useNavigate();
  const workspace = useAtomValue(adminWorkspaceAtom);
  const { fetchWorkspace } = useAdminWorkspace();

  const currentStep = getInitialOnboardingStep(workspace);
  const completedCount = ONBOARDING_STEP_DEFINITIONS.filter(({ step }) => step !== 'complete' && isOnboardingStepCompleted(workspace, step)).length;
  const progressText = `${completedCount}/4 단계 완료`;

  const stepCards: StepCardItem[] = useMemo(
    () => [
      {
        step: 'info',
        title: '주점 기본 정보',
        description: '주점 이름, 설명, 대표 이미지, 공지사항을 주점 정보 관리 화면에서 설정합니다.',
        hint: '이 단계가 끝나면 대시보드와 사용자 주문 화면에서 주점 정보가 자연스럽게 노출됩니다.',
        buttonLabel: '주점 정보 관리로 이동',
        path: `/admin/workspace/${workspaceId}/edit`,
      },
      {
        step: 'tables',
        title: '테이블 설정',
        description: '실시간 테이블 관리 화면에서 테이블 수를 정하고 QR 운영 준비를 합니다.',
        hint: '테이블 수를 설정하면 이후 QR 코드 생성과 테이블 현황 확인이 가능해집니다.',
        buttonLabel: '테이블 관리로 이동',
        path: `/admin/workspace/${workspaceId}/table/realtime?tableNo=1`,
      },
      {
        step: 'categories',
        title: '카테고리 생성',
        description: '카테고리 관리 화면에서 메뉴 분류를 만들어 상품 등록의 기준을 준비합니다.',
        hint: '예: 주류, 안주, 음료. 최소 1개 카테고리가 있어야 상품 등록이 수월합니다.',
        buttonLabel: '카테고리 관리로 이동',
        path: `/admin/workspace/${workspaceId}/products/categories`,
      },
      {
        step: 'products',
        title: '대표 상품 등록',
        description: '상품 관리 화면에서 첫 상품 1개 이상을 등록하면 온보딩이 완료됩니다.',
        hint: '첫 상품만 등록해도 대시보드로 전환됩니다. 나머지 메뉴는 나중에 계속 추가할 수 있습니다.',
        buttonLabel: '상품 관리로 이동',
        path: `/admin/workspace/${workspaceId}/products`,
      },
    ],
    [workspaceId],
  );

  const handleRefreshStatus = () => {
    fetchWorkspace(workspaceId);
  };

  return (
    <Container>
      <Header>
        <Eyebrow>WORKSPACE ONBOARDING</Eyebrow>
        <Title>온보딩이 완료될 때까지 이 화면에서 진행 상황을 안내합니다</Title>
        <Description>설정은 각 관리 화면에서 직접 진행하고, 대시보드에서는 무엇이 남았는지와 어디로 가야 하는지만 계속 확인할 수 있게 구성합니다.</Description>
      </Header>

      <SummaryCard>
        <SummaryRow>
          <SummaryItem>
            <SummaryLabel>진행 상태</SummaryLabel>
            <SummaryValue>{progressText}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>주점명</SummaryLabel>
            <SummaryValue>{workspace.name || '미설정'}</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>테이블 수</SummaryLabel>
            <SummaryValue>{workspace.tableCount}개</SummaryValue>
          </SummaryItem>
          <SummaryItem>
            <SummaryLabel>등록 상품 수</SummaryLabel>
            <SummaryValue>{workspace.products.length}개</SummaryValue>
          </SummaryItem>
        </SummaryRow>

        <SummaryDescription>
          아직 완료되지 않은 항목이 있으면 이 대시보드에서 온보딩 화면이 계속 보입니다. 필요한 설정 페이지로 이동한 뒤 다시 돌아오면 현재 상태를 기준으로
          자동으로 갱신됩니다.
        </SummaryDescription>

        <ActionsRow>
          <ProgressContainer>
            <OnboardingProgress workspace={workspace} currentStep={currentStep} onStepClick={() => undefined} />
          </ProgressContainer>
          <RefreshButton type="button" onClick={handleRefreshStatus}>
            <RiRefreshLine size={16} />
            상태 다시 확인
          </RefreshButton>
        </ActionsRow>
      </SummaryCard>

      <StepList>
        {stepCards.map((item) => {
          const completed = isOnboardingStepCompleted(workspace, item.step);

          return (
            <StepCard key={item.step}>
              <StepMeta>
                <StepBadge completed={completed}>
                  {completed ? <RiCheckLine size={16} /> : null}
                  {completed ? '완료됨' : '설정 필요'}
                </StepBadge>
                <StepTitle>{item.title}</StepTitle>
              </StepMeta>

              <StepDescription>{item.description}</StepDescription>
              <StepHint>{item.hint}</StepHint>

              <StepButton type="button" onClick={() => navigate(item.path)}>
                {item.buttonLabel}
                <RiArrowRightLine size={16} />
              </StepButton>
            </StepCard>
          );
        })}
      </StepList>
    </Container>
  );
}

export default AdminWorkspaceOnboarding;
