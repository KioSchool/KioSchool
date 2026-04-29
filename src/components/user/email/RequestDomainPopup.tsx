import styled from '@emotion/styled';
import { useRef } from 'react';
import { colFlex } from '@styles/flexStyles';
import NewAppInput from '@components/common/input/NewAppInput';
import NewCommonButton from '@components/common/button/NewCommonButton';
import usePopup from '@hooks/usePopup';
import { RiCloseCircleFill } from '@remixicon/react';
import { Color } from '@resources/colors';

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

interface RequestDomainPopupProps {
  onClose: () => void;
}

function RequestDomainPopup({ onClose }: RequestDomainPopupProps) {
  const { sendUserPopupResult } = usePopup();

  const schoolNameRef = useRef<HTMLInputElement>(null);
  const domainRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const schoolName = schoolNameRef.current?.value;
    const domain = domainRef.current?.value;

    if (!schoolName) {
      alert('학교 이름을 입력해주세요.');
      return;
    }

    if (!domain) {
      alert('사용하시는 학교 이메일을 입력해주세요.');
      return;
    }

    const result = `
    ### [도메인 추가 요청]
    - 학교명: ${schoolName}
    - 도메인/이메일: ${domain}
    `;

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

          <NewAppInput label="학교 이름" placeholder="예: 건국대학교" ref={schoolNameRef} width="100%" />

          <NewAppInput
            label="학교 이메일 도메인(또는 본인 이메일)"
            placeholder="예: username@korea.ac.kr"
            ref={domainRef}
            width="100%"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit();
            }}
          />

          <NewCommonButton onClick={handleSubmit} customSize={{ width: 436, height: 50, font: 16 }}>
            요청하기
          </NewCommonButton>
        </ContentContainer>
      </SubContainer>
    </Container>
  );
}

export default RequestDomainPopup;
