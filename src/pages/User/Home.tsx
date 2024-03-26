import React from 'react';
import { Link } from 'react-router-dom';
import AuthenticationButton from '@components/user/AuthenticationButton';
import Container from '@components/common/container/Container';
import styled from '@emotion/styled';
import ArrowRight from '../../resources/svg/ArrowRight';

const MainTitle = styled.div`
  width: 540px;
  height: 160px;
  font-size: 64px;
  font-weight: 800;
`;

const LinkAdminHome = styled(Link)`
  text-decoration: none;
  width: 348.695px;
  height: 80px;
  border-radius: 50px;
  background: #eb6d09;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &:hover {
    background: linear-gradient(133deg, #ff9f32, #eb6d09);
  }
`;

const LinkText = styled.div`
  width: 314.256px;
  height: 47px;
  color: #fff;
  font-size: 32px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

function Home() {
  return (
    <>
      <Container justifyValue={'center'}>
        <>
          <MainTitle>
            키오스쿨로
            <br /> 주점관리를 손쉽게,
          </MainTitle>
          <LinkAdminHome to={'/admin'}>
            <LinkText>
              내 주점 바로가기
              <ArrowRight />
            </LinkText>
          </LinkAdminHome>
          <br></br>
          <AuthenticationButton />
        </>
      </Container>
    </>
  );
}

export default Home;
