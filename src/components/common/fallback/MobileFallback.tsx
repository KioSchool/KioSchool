import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { RiComputerLine } from '@remixicon/react';
import { colFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { USER_ROUTES } from '@constants/routes';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 80px 24px;
  box-sizing: border-box;
  background: #faf9f7;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const IconWrapper = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${Color.WHITE};
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #3c3530;
  margin-top: 28px;
  text-align: center;
  letter-spacing: -0.02em;
`;

const Description = styled.p`
  font-size: 15px;
  color: #8b95a1;
  margin-top: 12px;
  text-align: center;
  line-height: 1.6;
  word-break: keep-all;
`;

const HomeLink = styled(Link)`
  margin-top: 36px;
  padding: 14px 36px;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  font-size: 15px;
  font-weight: 600;
  border-radius: 999px;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: #ffa562;
  }

  &:active {
    background: #e87d30;
    transition: 0ms;
  }
`;

function MobileFallback() {
  return (
    <Container>
      <IconWrapper>
        <RiComputerLine size={32} color={Color.KIO_ORANGE} />
      </IconWrapper>
      <Title>PC에서 이용해주세요</Title>
      <Description>
        해당 페이지는 PC 환경에 최적화되어 있습니다.
        <br />더 나은 경험을 위해 PC에서 접속해주세요.
      </Description>
      <HomeLink to={USER_ROUTES.HOME}>홈으로 돌아가기</HomeLink>
    </Container>
  );
}

export default MobileFallback;
