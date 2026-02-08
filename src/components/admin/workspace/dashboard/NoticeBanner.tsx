import styled from '@emotion/styled';
import { useMemo } from 'react';
import { rowFlex } from '@styles/flexStyles';
import { DASHBOARD_NOTICES } from '@constants/data/noticeData';

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

function NoticeBanner() {
  const randomNotice = useMemo(() => DASHBOARD_NOTICES[Math.floor(Math.random() * DASHBOARD_NOTICES.length)], []);

  return (
    <Container>
      <Icon>💡</Icon>
      <Text>{randomNotice}</Text>
    </Container>
  );
}

export default NoticeBanner;
