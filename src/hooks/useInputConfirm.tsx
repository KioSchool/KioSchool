import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { RiCloseLargeLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
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
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  background: ${Color.WHITE};
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  gap: 30px;
  position: relative;
  ${colFlex({ justify: 'flex-start', align: 'stretch' })}

  ${mobileMediaQuery} {
    padding: 24px 20px;
    gap: 20px;
    border-radius: 12px;
  }
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

const Title = styled.label`
  color: ${Color.BLACK};
  font-size: 32px;
  font-weight: 700;
  user-select: none;
`;

const Description = styled.label`
  color: ${Color.GREY};
  font-size: 16px;
  font-weight: 500;
  user-select: none;
`;

const InputLabel = styled.label`
  color: ${Color.GREY};
  font-size: 15px;
  font-weight: 600;
  user-select: none;
`;

const SubmitButton = styled(NewCommonButton)`
  width: 100%;
  height: 56px;
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

  function InputConfirmModal() {
    if (promise === null) return null;

    return (
      <Container className="confirm-container">
        <ModalBox className="confirm-modal-box">
          <CloseButton onClick={handleClose} />
          <TextContainer className="text-container">
            <Title>{title}</Title>
            {description && <Description>{description}</Description>}
          </TextContainer>
          <SubmitContainer className="form-inputs-container">
            {inputSlots.map((slot, index) => (
              <InputContainer key={index}>
                <InputLabel>{slot.label}</InputLabel>
                <NewAppInput ref={(el: HTMLInputElement | null) => (inputRefs.current[index] = el)} type="text" placeholder={slot.placeholder} height={48} />
              </InputContainer>
            ))}
          </SubmitContainer>
          <ButtonContainer className="button-container">
            <SubmitButton onClick={handleConfirm}>{submitText}</SubmitButton>
          </ButtonContainer>
        </ModalBox>
      </Container>
    );
  }

  return { InputConfirmModal, confirm };
}

export default useInputConfirm;
