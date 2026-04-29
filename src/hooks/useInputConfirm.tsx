import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import { useRef, useState } from 'react';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { RiCloseLargeLine } from '@remixicon/react';
import NewCommonButton from '@components/common/button/NewCommonButton';
import NewAppInput from '@components/common/input/NewAppInput';

const Container = styled.div`
  z-index: 1002;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const ModalBox = styled.div`
  width: 500px;
  background: ${Color.WHITE};
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  gap: 30px;
  position: relative;
  ${colFlex({ justify: 'flex-start', align: 'stretch' })}
`;

const TextContainer = styled.div`
  gap: 8px;
  ${colFlex({ justify: 'center' })}
`;

const SubmitContainer = styled.div`
  width: 100%;
  gap: 20px;
  ${colFlex({ justify: 'start' })}
`;

const InputContainer = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex({ align: 'start' })}
`;

const ButtonContainer = styled.div`
  gap: 12px;
  width: 100%;
  margin-top: 10px;
  ${colFlex({ justify: 'space-between' })}
`;

const CloseButton = styled(RiCloseLargeLine)`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 24px;
  height: 24px;
  color: ${Color.HEAVY_GREY};
  cursor: pointer;

  &:hover {
    color: ${Color.BLACK};
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

    const emptyFields = inputSlots.filter((_, index) => values[index] === '').map((slot) => slot.label);
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
        <ModalBox className="confirm-modal-box">
          <CloseButton onClick={handleClose} />
          <TextContainer className="text-container">
            <AppLabel size="medium" style={{ fontWeight: 700 }} color={Color.BLACK}>
              {title}
            </AppLabel>
            {description && (
              <AppLabel size={16} color={Color.GREY}>
                {description}
              </AppLabel>
            )}
          </TextContainer>
          <SubmitContainer className="form-inputs-container">
            {inputSlots.map((slot, index) => (
              <InputContainer key={index}>
                <AppLabel size={15} color={Color.GREY} style={{ fontWeight: 600 }}>
                  {slot.label}
                </AppLabel>
                <NewAppInput
                  ref={(el: HTMLInputElement | null) => (inputRefs.current[index] = el)}
                  type="text"
                  placeholder={slot.placeholder}
                  style={{ width: '100%', height: '48px', boxSizing: 'border-box' }}
                />
              </InputContainer>
            ))}
          </SubmitContainer>
          <ButtonContainer className="button-container">
            <NewCommonButton style={{ width: '100%', height: '56px' }} onClick={handleConfirm}>
              {submitText}
            </NewCommonButton>
          </ButtonContainer>
        </ModalBox>
      </Container>
    );
  };

  return { InputConfirmModal, confirm };
}

export default useInputConfirm;
