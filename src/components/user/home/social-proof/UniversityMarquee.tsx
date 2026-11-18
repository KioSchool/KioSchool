import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { LandingColor } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

const UNIVERSITIES = [
  '한양대',
  '제주대',
  '국민대',
  '가천대',
  '한국기술교육대',
  '세종대',
  '경희대',
  '강남대',
  '건국대',
  '광운대',
  '홍익대',
  '고려대',
  '동국대',
  '서강대',
  '경북대',
  '숙명여대',
  '충남대',
];
const MARQUEE_ITEMS = [...UNIVERSITIES, ...UNIVERSITIES];

const scroll = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;

const Viewport = styled.div`
  position: relative;
  margin-top: 56px;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    width: 96px;
  }

  &::before {
    left: 0;
    background: linear-gradient(90deg, #ffffff, rgba(255, 255, 255, 0));
  }

  &::after {
    right: 0;
    background: linear-gradient(270deg, #ffffff, rgba(255, 255, 255, 0));
  }

  ${mobileMediaQuery} {
    margin-top: 36px;

    &::before,
    &::after {
      width: 48px;
    }
  }
`;

const Track = styled.div`
  width: max-content;
  gap: 10px;
  animation: ${scroll} 24s linear infinite;
  will-change: transform;
  ${rowFlex({ align: 'center' })}

  ${mobileMediaQuery} {
    animation-duration: 20s;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Chip = styled.span`
  flex: none;
  height: 44px;
  padding: 0 20px;
  border: 1px solid ${LandingColor.LINE};
  border-radius: 22px;
  background: #ffffff;
  font-size: 16px;
  font-weight: 600;
  color: ${LandingColor.SUB_TEXT};
  ${rowFlex({ align: 'center' })}

  ${mobileMediaQuery} {
    height: 38px;
    padding: 0 16px;
    font-size: 14px;
  }
`;

function UniversityMarquee() {
  return (
    <Viewport>
      <Track>
        {MARQUEE_ITEMS.map((name, index) => (
          <Chip key={`${name}-${index}`}>{name}</Chip>
        ))}
      </Track>
    </Viewport>
  );
}

export default UniversityMarquee;
