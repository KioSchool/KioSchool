import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const OrderPayRadioContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
  gap: 8px;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const PaymentOptions = styled.fieldset`
  border: none;
  margin: 0;
  width: 100%;
  padding: 7px 0;
  gap: 10px;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const OptionContainer = styled.div`
  width: 100%;
  gap: 5px;
  ${rowFlex({ justify: 'start', align: 'center' })}
`;

const StyledRadio = styled.input`
  appearance: none;
  margin: 0;
  border: max(2px, 0.1em) solid ${Color.GREY};
  border-radius: 50%;
  width: 1.25em;
  height: 1.25em;
  &:checked {
    border: 0.4em solid ${Color.KIO_ORANGE};
  }
`;

const GroupLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${Color.BLACK};
`;

const OptionLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${Color.GREY};
`;

interface OrderPayRadioProps {
  isTossAvailable: boolean;
  isTossPay: boolean;
  setIsTossPay: (value: boolean) => void;
}

function OrderPayRadio({ isTossAvailable, isTossPay, setIsTossPay }: OrderPayRadioProps) {
  return (
    <OrderPayRadioContainer>
      <GroupLabel>결제수단</GroupLabel>
      <PaymentOptions name="paymentMethod">
        {isTossAvailable && (
          <OptionContainer>
            <StyledRadio type={'radio'} name="paymentMethod" checked={isTossPay} onChange={() => setIsTossPay(true)} />
            <OptionLabel>토스페이</OptionLabel>
          </OptionContainer>
        )}

        <OptionContainer>
          <StyledRadio type={'radio'} name="paymentMethod" checked={!isTossPay} onChange={() => setIsTossPay(false)} />
          <OptionLabel>계좌이체</OptionLabel>
        </OptionContainer>
      </PaymentOptions>
    </OrderPayRadioContainer>
  );
}

export default OrderPayRadio;
