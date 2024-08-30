import React from 'react';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';

interface ImageRouteButtonProps {
  src: string;
  buttonText: string;
  onClick: () => void;
}

const Container = styled.div<{ src: string }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 280px;
  height: 440px;
  box-sizing: border-box;
  padding: 40px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) -18.3%, rgba(0, 0, 0, 0.6) 100%), url(${(props) => props.src});
  &:hover {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #eb6d09 120%), url(${(props) => props.src});
  }
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
`;

const RouteButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 8px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  backdrop-filter: blur(8px);
`;

function ImageRouteButton(props: ImageRouteButtonProps) {
  return (
    <Container src={props.src} className={'image-route-button-container'}>
      <SubContainer className={'image-route-sub-container'}>
        <AppLabel size={30} style={{ color: 'white', fontWeight: 600, textShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}>
          {props.buttonText}
        </AppLabel>
        <RouteButton type={'button'} onClick={props.onClick} className={'route-button'}>
          바로가기
        </RouteButton>
      </SubContainer>
    </Container>
  );
}

export default ImageRouteButton;
