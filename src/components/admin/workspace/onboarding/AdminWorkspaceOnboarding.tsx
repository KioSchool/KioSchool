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
import { getInitialOnboardingStep, isOnboardingStepCompleted } from '@utils/onboarding';
import OnboardingProgress from './OnboardingProgress';

const Container = styled.div`
  width: 100%;
  max-width: 1080px;
  padding: 12px 0 72px;
  box-sizing: border-box;
  gap: 22px;
  ${colFlex({ align: 'center' })}
`;

const Header = styled.div`
  width: 100%;
  gap: 8px;
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
  font-size: 18px;
  line-height: 1.2;
`;

const Description = styled.p`
  margin: 0;
  color: #5d6368;
  font-size: 14px;
  line-height: 1.7;
`;

const ActionsRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  gap: 12px;
`;

const ProgressContainer = styled.div`
  flex: 1;
`;

const RefreshButton = styled.button`
  border: 1px solid #e8eef2;
  background: #ffffff;
  color: #5d6368;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}
  gap: 6px;

  &:hover {
    color: ${Color.KIO_ORANGE};
    border-color: #ffd7b8;
  }
`;

const StepList = styled.div`
  width: 100%;
  gap: 12px;
  ${colFlex({ align: 'stretch' })}
`;

const StepCard = styled.div`
  width: 100%;
  padding: 18px 20px;
  border-radius: 20px;
  border: 1px solid #e8eef2;
  background: #ffffff;
  box-sizing: border-box;
  gap: 12px;
  ${colFlex({ align: 'start' })}
`;

const StepHeader = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'start' })}
  gap: 12px;
`;

const StepMeta = styled.div`
  gap: 8px;
  ${colFlex({ align: 'start' })}
`;

const StepNumber = styled.div<{ completed: boolean }>`
  padding: 6px 10px;
  border-radius: 999px;
  background: ${({ completed }) => (completed ? '#edf9f1' : '#fff3e7')};
  color: ${({ completed }) => (completed ? Color.GREEN : Color.KIO_ORANGE)};
  font-size: 12px;
  font-weight: 700;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const StepBadge = styled.div<{ completed: boolean }>`
  padding: 6px 10px;
  border-radius: 999px;
  background: ${({ completed }) => (completed ? '#edf9f1' : '#fff3e7')};
  color: ${({ completed }) => (completed ? Color.GREEN : Color.KIO_ORANGE)};
  font-size: 12px;
  font-weight: 700;
  ${rowFlex({ justify: 'center', align: 'center' })}
  gap: 4px;
`;

const StepTitle = styled.div`
  color: #25282b;
  font-size: 18px;
  font-weight: 700;
`;

const StepDescription = styled.div`
  color: #5d6368;
  font-size: 14px;
  line-height: 1.6;
`;

const StepHint = styled.div`
  color: #7b858c;
  font-size: 13px;
  line-height: 1.6;
`;

const StepButton = styled.button`
  border: none;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}
  gap: 6px;

  &:hover {
    background: #ffaf70;
  }
`;

interface StepCardItem {
  step: OnboardingStep;
  stepNumber: number;
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

  const stepCards: StepCardItem[] = useMemo(
    () => [
      {
        step: 'info',
        stepNumber: 1,
        title: '주점 기본 정보',
        description: '주점명, 대표 사진, 주점 설명이 모두 등록되어야 이 단계가 완료됩니다.',
        hint: '공지사항은 선택값이지만, 주점명과 대표 사진, 설명은 꼭 채워야 기본 정보 단계가 완료됩니다.',
        buttonLabel: '주점 정보 관리로 이동',
        path: `/admin/workspace/${workspaceId}/edit`,
      },
      {
        step: 'tables',
        stepNumber: 2,
        title: '테이블 설정',
        description: '실시간 테이블 관리 화면에서 테이블 수를 정하고 QR 운영 준비를 합니다. 최소 2개 테이블이 필요합니다.',
        hint: '테이블을 2개 이상 설정해야 이 단계가 완료되고 이후 QR 코드 생성과 테이블 현황 확인이 가능해집니다.',
        buttonLabel: '테이블 관리로 이동',
        path: `/admin/workspace/${workspaceId}/table/realtime?tableNo=1`,
      },
      {
        step: 'categories',
        stepNumber: 3,
        title: '카테고리 생성',
        description: '카테고리 관리 화면에서 메뉴 분류를 만들어 상품 등록의 기준을 준비합니다.',
        hint: '예: 주류, 안주, 음료. 최소 1개 카테고리가 있어야 상품 등록이 수월합니다.',
        buttonLabel: '카테고리 관리로 이동',
        path: `/admin/workspace/${workspaceId}/products/categories`,
      },
      {
        step: 'products',
        stepNumber: 4,
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

      <ActionsRow>
        <ProgressContainer>
          <OnboardingProgress workspace={workspace} currentStep={currentStep} onStepClick={() => undefined} />
        </ProgressContainer>
        <RefreshButton type="button" onClick={handleRefreshStatus}>
          <RiRefreshLine size={16} />
          상태 다시 확인
        </RefreshButton>
      </ActionsRow>

      <StepList>
        {stepCards.map((item) => {
          const completed = isOnboardingStepCompleted(workspace, item.step);

          return (
            <StepCard key={item.step}>
              <StepHeader>
                <StepMeta>
                  <StepNumber completed={completed}>STEP {item.stepNumber}</StepNumber>
                  <StepTitle>{item.title}</StepTitle>
                </StepMeta>
                <StepBadge completed={completed}>
                  {completed ? <RiCheckLine size={16} /> : null}
                  {completed ? '완료됨' : '설정 필요'}
                </StepBadge>
              </StepHeader>

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
