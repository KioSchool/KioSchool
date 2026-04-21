import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useEffect, useState } from 'react';
import { rowFlex } from '@styles/flexStyles';
import { DASHBOARD_NOTICES } from '@constants/data/noticeData';
import { TIP_DURATION } from '@constants/data/orderWaitData';

const tipFade = keyframes`
  0% { opacity: 0; transform: translateY(4px); }
  15% { opacity: 1; transform: translateY(0); }
  85% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-4px); }
`;

const Container = styled.div`
  width: 800px;
  height: 50px;
  box-shadow: 0px 4px 20px rgba(92, 92, 92, 0.05);
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid #e8eef2;
  box-sizing: border-box;
  padding: 0 17px;
  gap: 12px;
  ${rowFlex({ align: 'center' })}
`;

const Icon = styled.div`
  font-size: 28px;
`;

const Text = styled.div`
  line-height: 18px;
  font-size: 14px;
  color: #464a4d;
`;

const FadeText = styled.span`
  animation: ${tipFade} ${TIP_DURATION}ms ease-in-out;
`;

function NoticeBanner() {
  const [noticeIndex, setNoticeIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNoticeIndex((prev) => (prev + 1) % DASHBOARD_NOTICES.length);
    }, TIP_DURATION);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
      <Icon>💡</Icon>
      <Text>
        <FadeText key={noticeIndex}>{DASHBOARD_NOTICES[noticeIndex]}</FadeText>
      </Text>
    </Container>
  );
}

export default NoticeBanner;
