import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import ArrowRight from '@resources/svg/ArrowRightSvg';
import { css } from '@emotion/react';
import AppFooter from '@components/common/footer/AppFooter';

const MainTitle = styled.div`
  width: 540px;
  height: 160px;
  font-size: 64px;
  font-weight: 800;
  z-index: 1002;
  margin-bottom: 24px;
`;

const LinkAdminHome = styled(Link)`
  text-decoration: none;
  z-index: 1001;
  width: 349px;
  height: 80px;
  border-radius: 50px;
  background: #000000;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #000;
    background-image: linear-gradient(
      133deg,
      rgba(255, 255, 255, 0.2) 1.42%,
      rgba(255, 255, 255, 0) 1.43%,
      rgba(248, 248, 248, 0) 1.44%,
      rgba(255, 255, 255, 0.2) 32.44%,
      rgba(255, 255, 255, 0.2) 61.04%,
      rgba(255, 255, 255, 0.1) 85.77%,
      rgba(146, 146, 146, 0.1) 98.37%
    );
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

const HoverOverlay = styled.div<{ isHover: boolean }>`
  position: fixed;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  z-index: 1000;
  opacity: ${(props) => (props.isHover ? 1 : 0)};
  animation-name: ${(props) => (props.isHover ? 'moveIn' : 'moveOut')};
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.3) 12.8%, rgba(164, 164, 164, 0.3) 56.2%, rgba(0, 0, 0, 0.3) 99.6%), #fff;
  transition: all 0.5s ease;
  ${(props) =>
    props.isHover &&
    css`
      transform: translate(-100%, 0);
      transition: all 0.5s ease;
    `}
`;

function SuperAdminHome() {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <AppContainer justifyValue={'center'} flexDirection={'column'} alignItems={'flex-start'}>
      <>
        <MainTitle>
          키오스쿨로
          <br /> 주점관리를 손쉽게,
        </MainTitle>
        <LinkAdminHome to={'/admin'} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
          <LinkText>
            SUPER ADMIN
            <ArrowRight />
          </LinkText>
        </LinkAdminHome>
        <AppFooter />
        <HoverOverlay isHover={isHover} />
      </>
    </AppContainer>
  );
}

export default SuperAdminHome;