import signBoard from '@resources/image/home/signBoard.png';
import cloud1 from '@resources/image/home/cloud1.png';
import cloud2 from '@resources/image/home/cloud2.png';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { RiArrowRightLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import { useNavigate } from 'react-router-dom';
import AppFaqButton from '@components/common/button/AppFaqButton';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Cloud = styled.img<{
  src: string;
  top: string;
  left?: string;
  right?: string;
  scale?: number;
}>`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left ?? 'auto'};
  right: ${({ right }) => right ?? 'auto'};
  transform-origin: ${({ right }) => (right ? 'top right' : 'top left')};
  transform: scale(${({ scale = 1 }) => scale});
  width: 160px;
`;

const Grass = styled.div<{
  left: string;
  color: string;
  size?: string;
  zIndex: number;
}>`
  position: absolute;
  bottom: 30%;
  left: ${({ left }) => left};
  transform: translateX(-50%);
  width: ${({ size = '60px' }) => size};
  height: ${({ size = '60px' }) => `calc(${size} / 2)`};
  background-color: ${({ color }) => color};
  border-radius: ${({ size = '60px' }) => `${size} ${size} 0 0`};
  z-index: ${({ zIndex }) => zIndex};
`;

const Ground = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30%;
  background-color: #7fc47f;
`;

const SignBoard = styled.div`
  position: absolute;
  bottom: 30%;
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

const cloudClusters = [
  { id: 1, src: cloud1, top: '10%', right: '0', scale: 0.5 },
  { id: 2, src: cloud2, top: '15%', left: '-80px', scale: 1.1 },
  { id: 3, src: cloud2, top: '5%', left: '15%', scale: 0.8 },
];

const grassClusters = [
  { id: 1, left: '10%', color: '#67AE63', size: '50px', zIndex: 0 },
  { id: 2, left: '25%', color: '#67AE63', size: '40px', zIndex: 2 },
  { id: 3, left: '32%', color: '#4F784D', size: '60px', zIndex: 0 },
  { id: 4, left: '68%', color: '#4F784D', size: '45px', zIndex: 2 },
  { id: 5, left: '75%', color: '#67AE63', size: '50px', zIndex: 2 },
  { id: 6, left: '90%', color: '#4F784D', size: '60px', zIndex: 0 },
];

const infoText = `주점 관리자 운영화면은
PC 또는 태블릿으로 이용이 가능합니다.
`;

export default function HomeMobile() {
  const navigate = useNavigate();
  return (
    <Container>
      {cloudClusters.map(({ id, ...cloudProps }) => (
        <Cloud key={id} {...cloudProps} />
      ))}

      {grassClusters.map(({ id, ...grassProps }) => (
        <Grass key={id} {...grassProps} />
      ))}

      <SignBoard>
        <BoardContents>
          <BoardText>{infoText}</BoardText>
          <BoardButton onClick={() => navigate('/info')}>
            키오스쿨 소개 페이지로 이동
            <RightIcon />
          </BoardButton>
        </BoardContents>
      </SignBoard>

      <Ground />
      <AppFaqButton />
    </Container>
  );
}
