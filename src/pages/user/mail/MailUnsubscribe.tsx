import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import AppContainer from '@components/common/container/AppContainer';
import NewCommonButton from '@components/common/button/NewCommonButton';
import SiteFooter from '@components/common/footer/SiteFooter';
import useApi from '@hooks/useApi';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import type { MailUnsubscribeInfo } from '@@types/mail';

const Main = styled.main`
  width: 100%;
  max-width: 480px;
  box-sizing: border-box;
  min-height: 60vh;
  padding: 130px 20px 96px;
  gap: 16px;
  text-align: center;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const Title = styled.h1`
  margin: 0;
  color: ${Color.BLACK};
  font-size: 22px;
  font-weight: 700;
`;

const Description = styled.p`
  margin: 0;
  color: ${Color.GREY};
  font-size: 14px;
  line-height: 1.6;
  overflow-wrap: anywhere;
`;

const ReadyContent = styled.div`
  width: 100%;
  gap: 16px;
  ${colFlex({ align: 'center' })}
`;

type UnsubscribeState = { kind: 'loading' } | { kind: 'invalid' } | { kind: 'ready'; maskedEmail: string } | { kind: 'done' };

function getStateOf({ unsubscribed, maskedEmail }: MailUnsubscribeInfo): UnsubscribeState {
  if (unsubscribed) return { kind: 'done' };
  return { kind: 'ready', maskedEmail };
}

function MailUnsubscribe() {
  const [searchParams] = useSearchParams();
  const { userApi } = useApi();
  const [state, setState] = useState<UnsubscribeState>({ kind: 'loading' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setState({ kind: 'invalid' });
      return;
    }

    userApi
      .get<MailUnsubscribeInfo>('/mail/unsubscribe', { params: { token } })
      .then(({ data }) => setState(getStateOf(data)))
      .catch(() => setState({ kind: 'invalid' }));
  }, [token, userApi]);

  const handleUnsubscribe = async () => {
    setIsSubmitting(true);
    setHasFailed(false);

    try {
      await userApi.post('/mail/unsubscribe', undefined, { params: { token } });
      setState({ kind: 'done' });
    } catch {
      setHasFailed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} customWidth="100%" useTitle={false} useFullHeight={true}>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="referrer" content="no-referrer" />
      </Helmet>
      <Main>
        {state.kind === 'loading' && <Description>확인하고 있어요.</Description>}
        {state.kind === 'invalid' && <Description role="alert">링크가 올바르지 않아요.</Description>}
        {state.kind === 'ready' && (
          <ReadyContent>
            <Title>메일 수신 거부</Title>
            <Description>{state.maskedEmail} 주소로 오는 키오스쿨 안내 메일을 받지 않을까요?</Description>
            {hasFailed && <Description role="alert">처리하지 못했어요. 잠시 후 다시 시도해 주세요.</Description>}
            <NewCommonButton type="button" size="xs" disabled={isSubmitting} onClick={handleUnsubscribe}>
              수신 거부하기
            </NewCommonButton>
          </ReadyContent>
        )}
        {state.kind === 'done' && <Description role="status">앞으로 이런 메일을 보내지 않을게요.</Description>}
      </Main>
      <SiteFooter />
    </AppContainer>
  );
}

export default MailUnsubscribe;
