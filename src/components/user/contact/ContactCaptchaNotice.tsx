import styled from '@emotion/styled';
import { URLS } from '@constants/urls';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { CAPTCHA_FAILURE_MESSAGE, CaptchaFailureReason } from '@utils/turnstile';

const Container = styled.div`
  width: 100%;
  margin-top: -8px;
  color: ${Color.RED};
  font-size: 13px;
  line-height: 1.5;
  gap: 2px;
  ${colFlex()};
`;

const Message = styled.p`
  margin: 0;
`;

const InstagramLink = styled.a`
  color: inherit;
  font-weight: 700;
  text-decoration: underline;
`;

interface ContactCaptchaNoticeProps {
  reason: CaptchaFailureReason;
}

function ContactCaptchaNotice({ reason }: ContactCaptchaNoticeProps) {
  return (
    <Container role="alert">
      <Message>{CAPTCHA_FAILURE_MESSAGE[reason]}</Message>
      <Message>
        계속 실패하면{' '}
        <InstagramLink href={URLS.EXTERNAL.INSTAGRAM} target="_blank" rel="noopener noreferrer">
          인스타그램 DM
        </InstagramLink>
        으로 문의해 주세요.
      </Message>
    </Container>
  );
}

export default ContactCaptchaNotice;
