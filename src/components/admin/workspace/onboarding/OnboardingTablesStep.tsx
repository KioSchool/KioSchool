import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import NumberInput from '@components/common/input/NumberInput';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import OnboardingStepLayout from './OnboardingStepLayout';

const Controls = styled.div`
  width: 100%;
  padding: 24px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid #e8eef2;
  box-sizing: border-box;
  gap: 16px;
  ${colFlex({ align: 'start' })}
`;

const Label = styled.div`
  color: #25282b;
  font-size: 16px;
  font-weight: 700;
`;

const PreviewGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
`;

const PreviewCard = styled.div`
  height: 56px;
  border-radius: 18px;
  border: 1px solid #ffe0c7;
  background: #fff5eb;
  color: ${Color.KIO_ORANGE};
  font-size: 14px;
  font-weight: 700;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Notices = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex({ align: 'start' })}
`;

const Notice = styled.div`
  color: #666d73;
  font-size: 14px;
  line-height: 1.6;
`;

const Footer = styled.div`
  width: 100%;
  padding-top: 10px;
  ${rowFlex({ justify: 'end', align: 'center' })}
`;

interface OnboardingTablesStepProps {
  initialTableCount: number;
  isSubmitting: boolean;
  onSubmit: (tableCount: number) => void;
}

function OnboardingTablesStep({ initialTableCount, isSubmitting, onSubmit }: OnboardingTablesStepProps) {
  const [tableCount, setTableCount] = useState(Math.min(Math.max(initialTableCount || 1, 1), 50));

  useEffect(() => {
    setTableCount(Math.min(Math.max(initialTableCount || 1, 1), 50));
  }, [initialTableCount]);

  const handleSubmit = () => {
    onSubmit(tableCount);
  };

  return (
    <OnboardingStepLayout
      stepLabel="STEP 2"
      title="운영할 테이블 수를 정합니다"
      description="주문을 받을 테이블 개수를 먼저 정하면, 이후 QR 코드와 테이블 관리 화면이 이 값을 기준으로 준비됩니다."
      tip="온보딩에서는 1개부터 50개까지 설정할 수 있습니다. 테이블 수는 운영 중에도 다시 바꿀 수 있습니다."
    >
      <Controls>
        <Label>테이블 개수</Label>
        <NumberInput
          value={tableCount}
          formatter={(value) => `${value}개`}
          onChange={(value) => setTableCount(Math.min(Math.max(value, 1), 50))}
          onIncrement={() => setTableCount((prev) => Math.min(prev + 1, 50))}
          onDecrement={() => setTableCount((prev) => Math.max(prev - 1, 1))}
          maxWidth="320px"
        />
      </Controls>

      <PreviewGrid>
        {Array.from({ length: tableCount }).map((_, index) => (
          <PreviewCard key={index}>TABLE {index + 1}</PreviewCard>
        ))}
      </PreviewGrid>

      <Notices>
        <Notice>QR 코드는 설정 완료 후 자동으로 생성됩니다.</Notice>
        <Notice>추가/삭제가 필요하면 나중에 테이블 관리 화면에서 다시 수정할 수 있습니다.</Notice>
      </Notices>

      <Footer>
        <NewCommonButton type="button" size="sm" onClick={handleSubmit} disabled={isSubmitting}>
          다음 단계
        </NewCommonButton>
      </Footer>
    </OnboardingStepLayout>
  );
}

export default OnboardingTablesStep;
