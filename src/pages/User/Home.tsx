import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@components/common/container/Container';
import styled from '@emotion/styled';
import ArrowRight from '../../resources/svg/ArrowRight';
import NavBar from '@components/common/nav/NavBar';

const MainTitle = styled.div`
  width: 540px;
  height: 160px;
  font-size: 64px;
  font-weight: 800;
  margin-bottom: 24px;
`;

const LinkAdminHome = styled(Link)`
  text-decoration: none;
  width: 349px;
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
  width: 315px;
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
      <NavBar fix={'fixed'} logoSize={'small'} />
      <Container justifyValue={'center'} flexDirection={'column'} alignItems={'flex-start'}>
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
        </>
      </Container>
    </>
  );
}

export default Home;
