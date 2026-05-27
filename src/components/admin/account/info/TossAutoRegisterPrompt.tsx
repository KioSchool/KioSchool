import styled from '@emotion/styled';
import { RiFlashlightFill } from '@remixicon/react';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { TOSS_ACCOUNT_INFO } from '@constants/data/accountData';

const Container = styled.div`
  width: 100%;
  height: 100%;
  gap: 20px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: ${Color.KIO_ORANGE_FAINT};
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const TextWrapper = styled.div`
  gap: 8px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${Color.BLACK};
  text-align: center;
`;

const Description = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: ${Color.GREY};
  text-align: center;
  line-height: 1.5;
`;

const QrFallbackLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 11px;
  color: #c0c4c8;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: ${Color.GREY};
  }
`;

interface TossAutoRegisterPromptProps {
  onRegister: () => void;
  onQrRegister: () => void;
}

function TossAutoRegisterPrompt({ onRegister, onQrRegister }: TossAutoRegisterPromptProps) {
  return (
    <Container>
      <IconWrapper>
        <RiFlashlightFill size={28} color={Color.KIO_ORANGE} />
      </IconWrapper>
      <TextWrapper>
        <Title>토스 간편 결제 사용 가능!</Title>
        <Description>클릭 한 번으로 토스 간편 결제를 바로 사용할 수 있어요.</Description>
      </TextWrapper>
      <NewCommonButton size="sm" onClick={onRegister} style={{ width: '200px' }}>
        {TOSS_ACCOUNT_INFO.PRIMARY_BUTTON_AUTO}
      </NewCommonButton>
      <QrFallbackLink onClick={onQrRegister}>{TOSS_ACCOUNT_INFO.QR_FALLBACK_LINK}</QrFallbackLink>
    </Container>
  );
}

export default TossAutoRegisterPrompt;
