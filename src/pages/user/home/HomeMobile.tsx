import React from 'react';
import signBoard from '@resources/image/home/signBoard.png';
// import cloud1 from '@resources/image/home/cloud1.png';
// import cloud2 from '@resources/image/home/cloud2.png';
// import cloud3 from '@resources/image/home/cloud3.png';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { RiArrowRightLine } from '@remixicon/react';
import { Color } from '@resources/colors';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #eaf6ff;
  overflow: hidden;
`;

const Cloud = styled.div<{ top: string; left?: string; right?: string; scale?: number }>`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left ?? 'auto'};
  right: ${({ right }) => right ?? 'auto'};
  transform: scale(${({ scale = 1 }) => scale});
  width: 160px;
  height: 50px;
  background: #d3f0fd;
  border-radius: 50px;
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 30px;
    width: 80px;
    height: 60px;
    background: #d3f0fd;
    border-radius: 50%;
  }
  &::after {
    content: '';
    position: absolute;
    top: -10px;
    left: 70px;
    width: 100px;
    height: 40px;
    background: #d3f0fd;
    border-radius: 50px;
  }
`;

const Grass = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 35%;
  background-color: #7fc47f;
`;

const SignBoard = styled.div`
  position: absolute;
  bottom: 300px;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  max-width: 350px;
  aspect-ratio: 330 / 387;
  background: url(${signBoard}) no-repeat center/contain;
  ${colFlex({ justify: 'start', align: 'center' })}
  gap: 10%;
  z-index: 1;
`;

const BoardContents = styled.div`
  margin-top: 18%;
  ${colFlex({ justify: 'center', align: 'center' })}
  gap: 18px;
`;

const BoardText = styled.p`
  color: ${Color.WHITE};
  text-align: center;
  font-size: 15px;
  white-space: pre-line;
`;

const BoardButton = styled.button`
  width: clamp(150px, 40vw, 210px);
  height: clamp(28px, 6vw, 35px);
  ${rowFlex({ justify: 'center', align: 'center' })}
  gap: clamp(5px, 2vw, 10px);
  flex-shrink: 0;
  border-radius: 50px;
  border: none;
  color: #6d4d42;
  font-weight: 700;
  font-size: clamp(10px, 2.5vw, 14px);
`;

const RightIcon = styled(RiArrowRightLine)`
  width: 15px;
  height: 15px;
`;

function HomeMobile() {
  return (
    <Container>
      <Cloud top="10%" left="5%" scale={0.8} />
      <Cloud top="5%" right="10%" scale={1.1} />
      <Cloud top="20%" left="50%" scale={0.9} />

      <SignBoard>
        <BoardContents>
          <BoardText>
            주점 관리자 운영화면은{'\n'}
            PC 또는 태블릿으로 이용이 가능합니다.
          </BoardText>
          <BoardButton>
            키오스쿨 소개 페이지로 이동
            <RightIcon />
          </BoardButton>
        </BoardContents>
      </SignBoard>

      <Grass />
    </Container>
  );
}

export default HomeMobile;
