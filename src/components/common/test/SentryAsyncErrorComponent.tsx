import { useEffect } from 'react';
import styled from '@emotion/styled';

const ASYNC_ERROR_DELAY_MS = 1000;

const Message = styled.div``;

function SentryAsyncErrorComponent() {
  useEffect(() => {
    setTimeout(() => {
      throw new Error('테스트용 비동기 에러입니다!');
    }, ASYNC_ERROR_DELAY_MS);
  }, []);

  return <Message>비동기 에러가 1초 후에 발생합니다...</Message>;
}

export default SentryAsyncErrorComponent;
