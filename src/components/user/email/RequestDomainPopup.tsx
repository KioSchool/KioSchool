import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import NewAppInput from '@components/common/input/NewAppInput';
import NewCommonButton from '@components/common/button/NewCommonButton';
import usePopup from '@hooks/usePopup';
import { RiCloseCircleFill } from '@remixicon/react';
import { Color } from '@resources/colors';
import { getRequestDomainPopupResult, isEmailLike, RequestDomainMode, validateRequestDomainPopupForm } from '@utils/requestDomainPopup';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
`;

const SubContainer = styled.div`
  width: 100%;
  height: 100%;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const ContentContainer = styled.div`
  width: 500px;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${Color.WHITE};
  box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.05);
  gap: 24px;
  position: relative;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const CloseButtonIcon = styled(RiCloseCircleFill)`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: #e0e0e0;

  &:hover {
    color: #bdbdbd;
  }
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-top: 10px;
`;

const Description = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  opacity: 0.56;
  white-space: pre-wrap;
  margin-bottom: 10px;
`;

const ModeToggleContainer = styled.div`
  width: 100%;
  border-radius: 12px;
  background: ${Color.LIGHT_GREY};
  padding: 4px;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const ModeToggleButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  flex: 1;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: ${({ isActive }) => (isActive ? Color.KIO_ORANGE : 'transparent')};
  color: ${({ isActive }) => (isActive ? Color.WHITE : Color.GREY)};
  font-size: 14px;
  font-weight: ${({ isActive }) => (isActive ? 600 : 500)};
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
`;

const InputGroup = styled.div`
  width: 100%;
  gap: 6px;
  ${colFlex({ justify: 'center', align: 'flex-start' })};
`;

const InputHintText = styled.div`
  min-height: 1.4em;
  padding-left: 10px;
  font-size: 13px;
  line-height: 1.4;
  color: ${Color.GREY};
`;

const ModeSwitchTrigger = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-left: 4px;
  font: inherit;
  font-weight: 600;
  color: ${Color.KIO_ORANGE};
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

interface RequestDomainPopupProps {
  onClose: () => void;
}

function RequestDomainPopup({ onClose }: RequestDomainPopupProps) {
  const { sendUserPopupResult } = usePopup();

  const schoolNameRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<RequestDomainMode>('domain');
  const [emailOrDomainValue, setEmailOrDomainValue] = useState('');

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const inputCopy =
    mode === 'domain'
      ? { label: '학교 이메일 도메인', placeholder: '예: korea.ac.kr', helper: '도메인은 이메일 주소 @ 뒤 부분이에요.' }
      : { label: '본인 학교 이메일', placeholder: '예: user@korea.ac.kr', helper: '이 이메일로 도메인 추가 안내를 보내드릴게요.' };

  const hintCopy =
    mode === 'domain'
      ? { message: '이메일을 입력하신 것 같아요.', switchLabel: "'도메인을 모르겠어요'로 바꾸기", targetMode: 'email' as const }
      : { message: '이메일이 아니에요.', switchLabel: "'도메인을 알아요'로 바꾸기", targetMode: 'domain' as const };

  const trimmedValue = emailOrDomainValue.trim();
  const hasAt = isEmailLike(emailOrDomainValue);
  const isMismatch = mode === 'domain' ? hasAt : !hasAt;
  const showInlineHint = trimmedValue.length > 0 && isMismatch;

  const handleSubmit = () => {
    const { schoolName, emailOrDomain, errorMessage } = validateRequestDomainPopupForm(mode, schoolNameRef.current?.value, emailOrDomainValue);

    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    if (schoolNameRef.current) {
      schoolNameRef.current.value = schoolName;
    }
    setEmailOrDomainValue(emailOrDomain);

    const result = getRequestDomainPopupResult(mode, schoolName, emailOrDomain);

    sendUserPopupResult(result);
    alert('요청이 접수되었습니다. 감사합니다.');
    onClose();
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Container onClick={handleBackgroundClick}>
      <SubContainer>
        <ContentContainer>
          <CloseButtonIcon onClick={onClose} />
          <Title>학교 이메일 도메인 추가 요청</Title>
          <Description>
            찾으시는 학교가 없으신가요?{'\n'}
            아래 정보를 입력해주시면 빠르게 추가해드리겠습니다.
          </Description>

          <NewAppInput label="추가 요청 학교 이름" placeholder="예: 건국대학교" ref={schoolNameRef} width="100%" />

          <ModeToggleContainer role="group" aria-label="입력 유형 선택">
            <ModeToggleButton type="button" aria-pressed={mode === 'domain'} isActive={mode === 'domain'} onClick={() => setMode('domain')}>
              도메인을 알아요
            </ModeToggleButton>
            <ModeToggleButton type="button" aria-pressed={mode === 'email'} isActive={mode === 'email'} onClick={() => setMode('email')}>
              도메인을 모르겠어요
            </ModeToggleButton>
          </ModeToggleContainer>

          <InputGroup>
            <NewAppInput
              label={inputCopy.label}
              placeholder={inputCopy.placeholder}
              width="100%"
              value={emailOrDomainValue}
              onChange={(e) => setEmailOrDomainValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}
            />
            <InputHintText>
              {showInlineHint ? (
                <>
                  {hintCopy.message}
                  <ModeSwitchTrigger type="button" onClick={() => setMode(hintCopy.targetMode)}>
                    {hintCopy.switchLabel}
                  </ModeSwitchTrigger>
                </>
              ) : (
                inputCopy.helper
              )}
            </InputHintText>
          </InputGroup>

          <NewCommonButton onClick={handleSubmit} size="sm">
            요청하기
          </NewCommonButton>
        </ContentContainer>
      </SubContainer>
    </Container>
  );
}

export default RequestDomainPopup;
