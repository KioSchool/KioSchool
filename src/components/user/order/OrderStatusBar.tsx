import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { OrderStatus } from '@@types/index';
import { Color } from '@resources/colors';

interface OrderStatusBarProps {
  status: OrderStatus;
}

const Container = styled.div`
  width: 100%;
  gap: 4px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const LabelsContainer = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between' })}
`;

const Label = styled.div<{ active: boolean }>`
  font-size: 13px;
  font-weight: 400;
  color: ${({ active }) => (active ? Color.BLACK : Color.GREY)};
`;

const ProgressBarContainer = styled.div`
  width: 90%;
  height: 12px;
  position: relative;
  display: flex;
  align-items: center;
`;

const BaseLine = styled.div`
  height: 2px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const DashedLine = styled(BaseLine)`
  width: 100%;
  background-image: repeating-linear-gradient(to right, #e0e0e0 0, #e0e0e0 6px, transparent 6px, transparent 8px);
  z-index: 1;
`;

const SolidLine = styled(BaseLine)<{ progress: number }>`
  background-color: ${Color.KIO_ORANGE};
  width: ${({ progress }) => progress}%;
  transition: width 0.3s ease;
  z-index: 2;
`;

const NodeContainer = styled.div`
  width: 100%;
  position: relative;
  z-index: 3;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const Node = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? Color.KIO_ORANGE : Color.WHITE)};
  border: 1px solid ${({ active }) => (active ? Color.KIO_ORANGE : '#e0e0e0')};
  box-sizing: border-box;
`;

const CancelContainer = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'center' })};
`;

const CancelText = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${Color.KIO_ORANGE};
`;

const stepLabels = ['주문확인', '조리중', '서빙완료'];
const statusMap = {
  [OrderStatus.NOT_PAID]: 0,
  [OrderStatus.PAID]: 1,
  [OrderStatus.SERVED]: 2,
};

function OrderStatusBar({ status }: OrderStatusBarProps) {
  if (status === OrderStatus.CANCELLED) {
    return (
      <CancelContainer>
        <CancelText>취소된 주문입니다.</CancelText>
      </CancelContainer>
    );
  }

  const activeIndex = statusMap[status];
  const progress = activeIndex <= 0 ? 0 : (activeIndex / (stepLabels.length - 1)) * 100;

  return (
    <Container>
      <LabelsContainer>
        {stepLabels.map((label, index) => (
          <Label key={index} active={index <= activeIndex}>
            {label}
          </Label>
        ))}
      </LabelsContainer>
      <ProgressBarContainer>
        <DashedLine />
        <SolidLine progress={progress} />
        <NodeContainer>
          {stepLabels.map((_, index) => (
            <Node key={index} active={index <= activeIndex} />
          ))}
        </NodeContainer>
      </ProgressBarContainer>
    </Container>
  );
}

export default OrderStatusBar;
