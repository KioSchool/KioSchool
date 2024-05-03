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
  width: 270px;
  height: 440px;
  box-sizing: border-box;
  background-image: url(${(props) => props.src});
  padding: 40px;
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
    <Container src={props.src}>
      <SubContainer>
        <AppLabel size={25} style={{ color: 'white' }}>
          {props.buttonText}
        </AppLabel>
        <RouteButton type={'button'} onClick={props.onClick}>
          바로가기
        </RouteButton>
      </SubContainer>
    </Container>
  );
}

export default ImageRouteButton;
