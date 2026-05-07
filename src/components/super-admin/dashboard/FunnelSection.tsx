import styled from '@emotion/styled';
import { DashboardFunnel } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { formatNumber } from '@utils/formatNumber';
import SectionTitle from './SectionTitle';

const Card = styled.div`
  background: ${Color.WHITE};
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 20px;
  gap: 0;
  ${colFlex()}

  ${mobileMediaQuery} {
    padding: 14px;
    border-radius: 10px;
  }
`;

const Step = styled.div`
  width: 100%;
  padding: 12px 0;
  border-bottom: 1px solid #f7f7f7;
  gap: 8px;
  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }
  ${colFlex()}
`;

const StepHeader = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const StepLabel = styled.div`
  font-size: 13px;
  color: ${Color.GREY};
`;

const StepCount = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${Color.BLACK};
`;

const Bar = styled.div`
  width: 100%;
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
`;

const Fill = styled.div<{ pct: number }>`
  height: 100%;
  width: ${({ pct }) => pct}%;
  background: ${Color.KIO_ORANGE};
  border-radius: 3px;
  transition: width 0.4s ease;
`;

const ConversionText = styled.div`
  font-size: 11px;
  color: ${Color.HEAVY_GREY};
`;

interface FunnelSectionProps {
  funnel: DashboardFunnel;
}

function FunnelSection({ funnel }: FunnelSectionProps) {
  const steps = [
    { label: '전체 가입자', count: funnel.totalUsers, prev: funnel.totalUsers },
    { label: '워크스페이스 개설', count: funnel.workspacesCreated, prev: funnel.totalUsers },
    { label: '온보딩 완료', count: funnel.onboardingCompleted, prev: funnel.workspacesCreated },
    { label: '첫 주문 발생', count: funnel.hadFirstOrder, prev: funnel.onboardingCompleted },
  ];

  return (
    <div>
      <SectionTitle>전환 퍼널</SectionTitle>
      <Card>
        {steps.map((step, i) => {
          const pct = funnel.totalUsers > 0 ? (step.count / funnel.totalUsers) * 100 : 0;
          const fromPrev = i > 0 && steps[i - 1].count > 0 ? ((step.count / steps[i - 1].count) * 100).toFixed(1) : null;
          return (
            <Step key={step.label}>
              <StepHeader>
                <StepLabel>{step.label}</StepLabel>
                <StepCount>{formatNumber(step.count)}</StepCount>
              </StepHeader>
              <Bar>
                <Fill pct={pct} />
              </Bar>
              {fromPrev && <ConversionText>이전 단계 대비 {fromPrev}%</ConversionText>}
            </Step>
          );
        })}
      </Card>
    </div>
  );
}

export default FunnelSection;
