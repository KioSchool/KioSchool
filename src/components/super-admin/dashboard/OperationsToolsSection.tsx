import { useState } from 'react';
import styled from '@emotion/styled';
import { format, subDays } from 'date-fns';
import { toast } from 'react-toastify';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import useSuperAdminInsightCard from '@hooks/super-admin/useSuperAdminInsightCard';
import SectionTitle from './SectionTitle';

const Card = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  background: ${Color.WHITE};
  border: 1px solid #e8eef2;
  border-radius: 12px;
  gap: 12px;
  ${colFlex({ align: 'stretch' })};
`;

const ToolLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #464a4d;
`;

const ToolDescription = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
  line-height: 1.4;
`;

const ControlRow = styled.div`
  gap: 8px;
  flex-wrap: wrap;
  ${rowFlex({ justify: 'flex-start', align: 'center' })};

  ${mobileMediaQuery} {
    ${rowFlex({ justify: 'flex-start', align: 'stretch' })};
    flex-direction: column;
  }
`;

const DateInput = styled.input`
  height: 36px;
  padding: 0 10px;
  font-size: 13px;
  border: 1px solid #e8eef2;
  border-radius: 8px;
  background: ${Color.WHITE};
  color: #464a4d;
`;

const RegenerateButton = styled.button`
  height: 36px;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 600;
  color: ${Color.WHITE};
  background: ${Color.KIO_ORANGE};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover:not(:disabled) {
    background: ${Color.KIO_ORANGE_DARK};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function getYesterdayString(): string {
  return format(subDays(new Date(), 1), 'yyyy-MM-dd');
}

function OperationsToolsSection() {
  const { regenerateInsightCard } = useSuperAdminInsightCard();
  const [date, setDate] = useState<string>(getYesterdayString());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegenerate = () => {
    if (!date) {
      toast.warn('날짜를 선택해주세요.');
      return;
    }
    setIsSubmitting(true);
    regenerateInsightCard(date)
      .then(() => {
        toast.success(`${date} 인사이트 카드를 재생성했어요.`);
      })
      .catch(() => {
        toast.error('재생성에 실패했어요. 잠시 후 다시 시도해주세요.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      <SectionTitle>운영 도구</SectionTitle>
      <Card>
        <ToolLabel>인사이트 카드 수동 재생성</ToolLabel>
        <ToolDescription>선택한 날짜의 어드민 인사이트 카드를 다시 만들어요. 데이터 보정이나 카피 변경 후 사용하세요.</ToolDescription>
        <ControlRow>
          <DateInput type="date" value={date} onChange={(e) => setDate(e.target.value)} max={getYesterdayString()} />
          <RegenerateButton type="button" onClick={handleRegenerate} disabled={isSubmitting}>
            {isSubmitting ? '재생성 중...' : '재생성'}
          </RegenerateButton>
        </ControlRow>
      </Card>
    </div>
  );
}

export default OperationsToolsSection;
