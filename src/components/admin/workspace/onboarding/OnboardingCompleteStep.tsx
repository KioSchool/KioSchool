import styled from '@emotion/styled';
import { Workspace } from '@@types/index';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import OnboardingStepLayout from './OnboardingStepLayout';

const SummaryGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
`;

const SummaryCard = styled.div`
  padding: 18px;
  border-radius: 22px;
  border: 1px solid #e8eef2;
  background: #ffffff;
  box-sizing: border-box;
  gap: 8px;
  ${colFlex({ align: 'start' })}
`;

const SummaryLabel = styled.div`
  color: #7b858c;
  font-size: 13px;
  font-weight: 600;
`;

const SummaryValue = styled.div`
  color: #25282b;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.3;
`;

const Checklist = styled.div`
  width: 100%;
  gap: 10px;
  ${colFlex({ align: 'start' })}
`;

const ChecklistItem = styled.div`
  color: #5d6368;
  font-size: 15px;
  line-height: 1.7;
  ${rowFlex({ justify: 'start', align: 'center' })}
  gap: 10px;
`;

const CheckMark = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${Color.GREEN};
  color: ${Color.WHITE};
  font-size: 13px;
  font-weight: 700;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Footer = styled.div`
  width: 100%;
  padding-top: 10px;
  ${rowFlex({ justify: 'end', align: 'center' })}
`;

interface OnboardingCompleteStepProps {
  workspace: Workspace;
  onMoveToDashboard: () => void;
}

function OnboardingCompleteStep({ workspace, onMoveToDashboard }: OnboardingCompleteStepProps) {
  return (
    <OnboardingStepLayout
      stepLabel="STEP 5"
      title="이제 주문을 받을 준비가 되었습니다"
      description="핵심 설정이 모두 끝났습니다. 대시보드로 이동하면 주문 현황, 테이블 운영, 상품 관리 기능을 바로 사용할 수 있습니다."
      tip="운영을 시작한 뒤에도 주점 정보, 테이블 수, 카테고리, 상품은 각 관리 화면에서 언제든 수정할 수 있습니다."
    >
      <SummaryGrid>
        <SummaryCard>
          <SummaryLabel>주점명</SummaryLabel>
          <SummaryValue>{workspace.name}</SummaryValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryLabel>테이블 수</SummaryLabel>
          <SummaryValue>{workspace.tableCount}개</SummaryValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryLabel>카테고리 수</SummaryLabel>
          <SummaryValue>{workspace.productCategories.length}개</SummaryValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryLabel>상품 수</SummaryLabel>
          <SummaryValue>{workspace.products.length}개</SummaryValue>
        </SummaryCard>
      </SummaryGrid>

      <Checklist>
        <ChecklistItem>
          <CheckMark>✓</CheckMark>
          QR 코드는 실시간 테이블 관리 화면에서 바로 확인하고 출력할 수 있습니다.
        </ChecklistItem>
        <ChecklistItem>
          <CheckMark>✓</CheckMark>
          추가 상품은 상품 관리 화면에서 계속 등록할 수 있습니다.
        </ChecklistItem>
        <ChecklistItem>
          <CheckMark>✓</CheckMark>첫 주문이 들어오면 대시보드와 실시간 주문 조회 화면에서 즉시 확인할 수 있습니다.
        </ChecklistItem>
      </Checklist>

      <Footer>
        <NewCommonButton type="button" size="sm" onClick={onMoveToDashboard}>
          대시보드로 이동
        </NewCommonButton>
      </Footer>
    </OnboardingStepLayout>
  );
}

export default OnboardingCompleteStep;
