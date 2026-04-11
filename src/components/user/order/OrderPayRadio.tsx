import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import NewAppInput from '@components/common/input/NewAppInput';
import React from 'react';

const OrderPayRadioContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
  gap: 16px;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const SectionContainer = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const GroupLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${Color.BLACK};
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

const Radio = styled.input`
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

const OptionLabel = styled.label`
  font-size: 13px;
  font-weight: 400;
  color: ${Color.GREY};
`;

const FormContainer = styled.div`
  width: 100%;
  background-color: ${Color.LIGHT_GREY};
  border-radius: 8px;
  padding: 12px;
  margin-top: 4px;
  box-sizing: border-box;
`;

const FormHelperText = styled.div`
  font-size: 11px;
  color: ${Color.GREY};
  margin-top: 6px;
  line-height: 1.4;
`;

interface OrderPayRadioProps {
  isTossAvailable: boolean;
  isTossPay: boolean;
  setIsTossPay: (value: boolean) => void;
  customerNameRef: React.RefObject<HTMLInputElement>;
}

function OrderPayRadio({ isTossAvailable, isTossPay, setIsTossPay, customerNameRef }: OrderPayRadioProps) {
  return (
    <OrderPayRadioContainer>
      <SectionContainer>
        <GroupLabel>송금수단</GroupLabel>
        <PaymentOptions name="paymentMethod">
          {isTossAvailable && (
            <OptionContainer>
              <Radio type={'radio'} id="tossPay" checked={isTossPay} onChange={() => setIsTossPay(true)} />
              <OptionLabel htmlFor="tossPay">토스 송금</OptionLabel>
            </OptionContainer>
          )}

          <OptionContainer>
            <Radio type={'radio'} id="bankTransfer" checked={!isTossPay} onChange={() => setIsTossPay(false)} />
            <OptionLabel htmlFor="bankTransfer">계좌이체</OptionLabel>
          </OptionContainer>
        </PaymentOptions>
      </SectionContainer>
      
      <SectionContainer>
        <GroupLabel>송금자명 입력</GroupLabel>
        <FormContainer>
          <NewAppInput ref={customerNameRef} placeholder={'예: 홍길동'} width={'100%'} height={36} />
          <FormHelperText>
            주문 내역과 송금 내역을 정확하게 확인하기 위해<br />
            실제로 송금하시는 분의 이름을 적어주세요.
          </FormHelperText>
        </FormContainer>
      </SectionContainer>
    </OrderPayRadioContainer>
  );
}

export default OrderPayRadio;
