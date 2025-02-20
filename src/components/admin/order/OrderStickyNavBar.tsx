import React from 'react';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import ArrowLeftSvg from '@resources/svg/ArrowLeftSvg';
import ShareSvg from '@resources/svg/ShareSvg';
import { rowFlex } from '@styles/flexStyles';

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
  width: 100px;
  height: 100%;
  gap: 5px;
  ${rowFlex({ justify: 'space-evenly', align: 'center' })}
`;

const RightContainer = styled.div`
  padding-right: 10px;
  ${rowFlex({ align: 'center' })}
`;

const ArrowLeftButton = styled(ArrowLeftSvg)`
  cursor: pointer;
  fill: ${Color.BLACK};
  transition: transform 0.1s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const ShareButton = styled(ShareSvg)`
  cursor: pointer;
  transition: transform 0.1s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

interface OrderStickyNavBarProps {
  showNavBar: boolean;
  workspaceName: string;
}

function OrderStickyNavBar({ showNavBar, workspaceName }: OrderStickyNavBarProps) {
  const onClickShare = async () => {
    if (!navigator.share) {
      alert('이 브라우저는 Web Share API를 지원하지 않습니다. 다른 브라우저를 사용해주세요.');
      return;
    }

    try {
      await navigator.share({
        title: document.title,
        text: `키오스쿨에서 같이 주문해요!!`,
        url: window.location.href,
      });
    } catch (error) {
      alert(`공유 실패: ${error}`);
    }
  };

  return (
    <Container isShow={showNavBar}>
      <LeftContainer>
        <ArrowLeftButton />
        <AppLabel color={Color.BLACK} size={20} style={{ fontWeight: '600' }}>
          {workspaceName}
        </AppLabel>
      </LeftContainer>
      <RightContainer>
        <ShareButton onClick={onClickShare} />
      </RightContainer>
    </Container>
  );
}

export default OrderStickyNavBar;
