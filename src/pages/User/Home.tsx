import React from 'react';
import { Link } from 'react-router-dom';
import AuthenticationButton from '@components/user/AuthenticationButton';
import Container from '@components/common/container/Container';
import styled from '@emotion/styled';

const MainTitle = styled.div`
  width: 540px;
  height: 160px;
  font-size: 64px;
  font-weight: 800;
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
          <Link to={'/admin'}>Admin</Link>
          <br></br>
          <AuthenticationButton />
        </>
      </Container>
    </>
  );
}

export default Home;
