import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { OrderStatus } from '@@types/index';
import { Color } from '@resources/colors';
import { USER_STATUS_LABELS } from '@constants/data/orderStatus';

const getLabelWeight = (active: boolean) =>
  match(active)
    .with(true, () => 700)
    .otherwise(() => 400);

const getLabelColor = (active: boolean) =>
  match(active)
    .with(true, () => Color.TEXT_STRONG)
    .otherwise(() => Color.TEXT_HINT);

const getNodeBorderColor = (active: boolean) =>
  match(active)
    .with(true, () => Color.KIO_ORANGE)
    .otherwise(() => Color.DISABLED_GREY);

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
  ${rowFlex()}
`;

const Label = styled.div<{ active: boolean }>`
  flex: 1;
  font-size: 13px;
  font-weight: ${({ active }) => getLabelWeight(active)};
  text-align: center;
  color: ${({ active }) => getLabelColor(active)};
  &:first-of-type {
    text-align: left;
  }
  &:last-of-type {
    text-align: right;
  }
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
  background-image: linear-gradient(${Color.BORDER_GREY}, ${Color.BORDER_GREY});
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
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? Color.KIO_ORANGE : Color.WHITE)};
  border: 1.5px solid ${({ active }) => getNodeBorderColor(active)};
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

const stepLabels = [OrderStatus.NOT_PAID, OrderStatus.PAID, OrderStatus.SERVED].map((status) => USER_STATUS_LABELS[status]);
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
