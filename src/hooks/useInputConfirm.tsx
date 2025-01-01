import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import { useRef, useState } from 'react';
import AppButton from '@components/common/button/AppButton';
import { Color } from '@resources/colors';
import AppInput from '@components/common/input/AppInput';
import { colFlex, rowFlex } from '@styles/flexStyles';
import CloseSvg from '@resources/svg/CloseSvg';

const Container = styled.div`
  z-index: 1002;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const SubContainer = styled.div`
  width: 600px;
  ${colFlex({ justify: 'space-between', align: 'start' })}
  color: ${Color.WHITE};
  gap: 40px;
  position: relative;
`;

const TextContainer = styled.div`
  ${colFlex({ justify: 'center' })}
  gap: 12px;
`;

const SubmitContainer = styled.div`
  ${colFlex({ justify: 'start' })}
  width: 100%;
  gap: 10px;
`;

const InputContainer = styled.div`
  ${colFlex({ align: 'start' })}
  width: 100%;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  ${colFlex({ justify: 'space-between' })}
  gap: 12px;
  width: 100%;
`;

const CloseButton = styled(CloseSvg)`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

interface InputSlot {
  label: string;
  placeholder?: string;
}

interface InputConfirmProps {
  title: string;
  description?: string;
  submitText: string;
  inputSlots?: InputSlot[];
}

function useInputConfirm({ title, description, submitText, inputSlots = [] }: InputConfirmProps) {
  const [promise, setPromise] = useState<any>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(inputSlots.length).fill(null));

  const handleConfirm = () => {
    const values = inputRefs.current.map((input) => input?.value.trim() || '');

    const emptyFields = inputSlots.map((slot, index) => (values[index] === '' ? slot.label : null)).filter(Boolean);
    if (emptyFields.length) {
      alert(`다음 항목을 입력해주세요: ${emptyFields.join(', ')}`);
      return;
    }

    const userInputs = Object.fromEntries(inputSlots.map((slot, index) => [slot.label, values[index]]));

    promise?.resolve(userInputs);
    setPromise(null);
  };

  const handleClose = () => {
    promise?.reject();
    setPromise(null);
  };

  const confirm = (): Promise<Record<string, string>> => new Promise((resolve, reject) => setPromise({ resolve, reject }));

  const InputConfirmModal = () => {
    if (promise === null) return null;

    return (
      <Container className="confirm-container">
        <SubContainer className="confirm-sub-container">
          <CloseButton onClick={handleClose} />
          <TextContainer className="text-container">
            <AppLabel size="medium" style={{ fontWeight: 700 }} color={Color.WHITE}>
              {title}
            </AppLabel>
            {description && (
              <AppLabel size={20} color={Color.WHITE}>
                {description}
              </AppLabel>
            )}
          </TextContainer>
          <SubmitContainer className="button-container">
            {inputSlots.map((slot, index) => (
              <InputContainer key={index}>
                <AppLabel size={15} style={{ color: Color.WHITE }}>
                  {slot.label}
                </AppLabel>
                <AppInput ref={(el) => (inputRefs.current[index] = el)} type="text" placeholder={slot.placeholder} style={{ width: '100%' }} />
              </InputContainer>
            ))}
          </SubmitContainer>
          <ButtonContainer className="button-container">
            <AppButton style={{ width: '100%' }} onClick={handleConfirm}>
              {submitText}
            </AppButton>
          </ButtonContainer>
        </SubContainer>
      </Container>
    );
  };

  return { InputConfirmModal, confirm };
}

export default useInputConfirm;
