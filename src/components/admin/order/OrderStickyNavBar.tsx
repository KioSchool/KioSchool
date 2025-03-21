import React from 'react';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { useNavigate } from 'react-router-dom';
import { RiShareForward2Fill, RiArrowLeftLine } from '@remixicon/react';

const Container = styled.div<{ isShow: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  height: 45px;
  background: ${Color.WHITE};
  transition: transform 0.1s ease-in-out;
  transform: translateY(${({ isShow }) => (isShow ? '0' : '-100%')});
  z-index: 1000;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const LeftContainer = styled.div`
  padding-left: 10px;
  width: 300px;
  height: 100%;
  gap: 20px;
  ${rowFlex({ justify: 'start', align: 'center' })}
`;

const TextContainer = styled.div`
  gap: 10px;
  ${rowFlex({ align: 'end' })}
`;

const RightContainer = styled.div`
  padding-right: 10px;
  ${rowFlex({ align: 'center' })}
`;

const ArrowLeftButton = styled(RiArrowLeftLine, {
  shouldForwardProp: (prop) => prop !== 'useLeftArrow',
})<{ useLeftArrow?: boolean }>`
  display: ${({ useLeftArrow }) => (useLeftArrow ? 'block' : 'none')};
  cursor: pointer;
  fill: ${Color.BLACK};
  transition: transform 0.1s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const ShareButton = styled(RiShareForward2Fill)`
  cursor: pointer;
  transition: transform 0.1s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

interface OrderStickyNavBarProps {
  useLeftArrow?: boolean;
  showNavBar: boolean;
  workspaceName: string;
  tableNo?: string | number | null;
  useShareButton?: boolean;
}

function OrderStickyNavBar({ useLeftArrow = true, showNavBar, workspaceName, tableNo, useShareButton = true }: OrderStickyNavBarProps) {
  const navigate = useNavigate();
  const onClickShare = async () => {
    if (!navigator.share) {
      alert('이 브라우저는 Web Share API를 지원하지 않습니다. 다른 브라우저를 사용해주세요.');
      return;
    }

    await navigator.share({
      title: workspaceName,
      url: window.location.href,
    });
  };

  return (
    <Container isShow={showNavBar}>
      <LeftContainer>
        <ArrowLeftButton useLeftArrow={useLeftArrow} onClick={() => navigate(-1)} />
        <TextContainer>
          <AppLabel color={Color.BLACK} size={20} style={{ fontWeight: '600' }}>
            {workspaceName}
          </AppLabel>
          {tableNo && (
            <AppLabel color={Color.BLACK} size={15} style={{ fontWeight: '600' }}>
              테이블 {tableNo}
            </AppLabel>
          )}
        </TextContainer>
      </LeftContainer>
      <RightContainer>{useShareButton && <ShareButton onClick={onClickShare} />}</RightContainer>
    </Container>
  );
}

export default OrderStickyNavBar;
