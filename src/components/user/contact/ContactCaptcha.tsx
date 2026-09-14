import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { loadTurnstileScript } from '@utils/turnstile';

const Container = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex({ align: 'center' })};
`;

const WidgetSlot = styled.div`
  min-height: 65px;
`;

const LoadErrorText = styled.p`
  margin: 0;
  color: ${Color.RED};
  font-size: 13px;
  line-height: 1.5;
  text-align: center;
`;

interface ContactCaptchaProps {
  siteKey: string;
  resetKey: number;
  onTokenChange: (token: string) => void;
}

function ContactCaptcha({ siteKey, resetKey, onTokenChange }: ContactCaptchaProps) {
  const slotRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const [isLoadFailed, setIsLoadFailed] = useState(false);

  onTokenChangeRef.current = onTokenChange;

  useEffect(() => {
    let isCancelled = false;

    loadTurnstileScript()
      .then(() => {
        if (isCancelled || !slotRef.current || !window.turnstile) return;

        widgetIdRef.current = window.turnstile.render(slotRef.current, {
          sitekey: siteKey,
          callback: (token) => onTokenChangeRef.current(token),
          'expired-callback': () => onTokenChangeRef.current(''),
          'error-callback': () => onTokenChangeRef.current(''),
        });
      })
      .catch(() => {
        if (!isCancelled) setIsLoadFailed(true);
      });

    return () => {
      isCancelled = true;
      if (widgetIdRef.current) window.turnstile?.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    };
  }, [siteKey]);

  useEffect(() => {
    if (!widgetIdRef.current) return;

    // 토큰은 한 번 검증되면 재사용할 수 없어서, 접수에 실패하면 새 토큰을 받아야 한다
    window.turnstile?.reset(widgetIdRef.current);
    onTokenChangeRef.current('');
  }, [resetKey]);

  return (
    <Container>
      <WidgetSlot ref={slotRef} />
      {isLoadFailed && <LoadErrorText role="alert">자동 입력 방지 확인을 불러오지 못했습니다. 광고 차단 기능을 끄거나 새로고침해 주세요.</LoadErrorText>}
    </Container>
  );
}

export default ContactCaptcha;
