import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import { RiArrowRightLine } from '@remixicon/react';
import { css } from '@emotion/react';
import AppFooter from '@components/common/footer/AppFooter';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import AppFaqButton from '@components/common/button/AppFaqButton';

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
  background: ${Color.KIO_ORANGE};
  ${rowFlex({ align: 'center', justify: 'center' })}

  &:hover {
    background: linear-gradient(133deg, #ff9f32, ${Color.KIO_ORANGE});
  }
`;

const LinkText = styled.div`
  width: 315px;
  height: 47px;
  color: #fff;
  font-size: 32px;
  font-weight: 600;
  gap: 10px;
  ${rowFlex({ align: 'center', justify: 'center' })}
`;

const RightArrow = styled(RiArrowRightLine)`
  width: 30px;
  height: 30px;
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
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.3) 12.8%, rgba(255, 192, 141, 0.3) 56.2%, rgba(235, 109, 9, 0.3) 99.6%), #fff;
  transition: all 0.5s ease;
  ${(props) =>
    props.isHover &&
    css`
      transform: translate(-100%, 0);
      transition: all 0.5s ease;
    `}
`;

function Home() {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'start' })}>
      <>
        <MainTitle>
          키오스쿨로
          <br /> 주점관리를 손쉽게,
        </MainTitle>
        <LinkAdminHome to={'/admin'} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
          <LinkText>
            내 주점 바로가기
            <RightArrow />
          </LinkText>
        </LinkAdminHome>
        <AppFooter />
        <HoverOverlay isHover={isHover} />
        <AppFaqButton />
      </>
    </AppContainer>
  );
}

export default Home;
