import { useState } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { RiCloseLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import NewCommonButton from '@components/common/button/NewCommonButton';
import useAdminUser from '@hooks/admin/useAdminUser';
import { MODAL_ROOT_KEY } from '@hooks/useModal';
import { API_ERROR_CODES } from '@constants/errorCodes';
import { isApiErrorCode } from '@utils/apiError';

const ModalContainer = styled.div``;

const ModalOverlay = styled.div`
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1002;
`;

const ModalContentContainer = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${Color.WHITE};
  border-radius: 16px;
  box-sizing: border-box;
  padding: 56px 32px 40px;
  z-index: 1010;
  width: 480px;
  max-width: calc(100vw - 32px);
  gap: 28px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const CloseButton = styled(RiCloseLine)`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  color: #b2b2b2;
  transition: color 0.2s ease;

  &:hover {
    color: #464a4d;
  }
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.25;
  color: #464a4d;
`;

const Description = styled.div`
  font-size: 15px;
  line-height: 1.6;
  color: #6b7378;
  text-align: center;
  word-break: keep-all;
`;

const UnderlineInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  border: none;
  border-bottom: 1px solid #e8eef2;
  padding: 10px 4px;
  font-size: 18px;
  font-weight: 500;
  color: #464a4d;
  background: transparent;
  outline: none;
  text-align: center;
  transition: border-bottom-color 0.2s ease;

  &::placeholder {
    color: #d1d5d8;
  }

  &:focus {
    border-bottom-color: #464a4d;
  }
`;

const ErrorText = styled.div`
  min-height: 20px;
  margin-top: -16px;
  font-size: 14px;
  color: ${Color.RED};
`;

const ButtonContainer = styled.div`
  gap: 12px;
  ${rowFlex({ justify: 'center' })}
`;

function getWithdrawErrorMessage(error: unknown) {
  if (isApiErrorCode(error, API_ERROR_CODES.LOGIN_FAILED)) return '비밀번호가 맞지 않습니다.';
  return '탈퇴하지 못했습니다. 잠시 후 다시 시도해 주세요.';
}

interface WithdrawModalProps {
  onClose: () => void;
}

function WithdrawModal({ onClose }: WithdrawModalProps) {
  const { withdraw } = useAdminUser();
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!password || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');
    withdraw(password).catch((error) => {
      setIsSubmitting(false);
      setErrorMessage(getWithdrawErrorMessage(error));
    });
  };

  const portalRoot = document.getElementById(MODAL_ROOT_KEY);
  if (!portalRoot) return null;

  return createPortal(
    <ModalContainer>
      <ModalOverlay onClick={onClose} />
      <ModalContentContainer role="dialog" aria-modal="true" aria-labelledby="withdraw-modal-title" onSubmit={handleSubmit}>
        <CloseButton onClick={onClose} />
        <Title id="withdraw-modal-title">계정을 탈퇴하시겠습니까?</Title>
        <Description>
          이름·이메일·계좌 정보는 바로 지워지고,
          <br />
          운영한 주점과 주문 기록은 매출 통계로 남습니다.
          <br />
          탈퇴는 되돌릴 수 없습니다.
        </Description>
        <UnderlineInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해 주세요"
          autoComplete="current-password"
          autoFocus
        />
        <ErrorText role="alert">{errorMessage}</ErrorText>
        <ButtonContainer>
          <NewCommonButton type="button" size="sm" color="blue_gray" onClick={onClose}>
            취소
          </NewCommonButton>
          <NewCommonButton type="submit" size="sm" color="kio_orange" disabled={!password || isSubmitting}>
            탈퇴하기
          </NewCommonButton>
        </ButtonContainer>
      </ModalContentContainer>
    </ModalContainer>,
    portalRoot,
  );
}

export default WithdrawModal;
