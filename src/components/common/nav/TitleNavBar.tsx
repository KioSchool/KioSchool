import React from 'react';
import styled from '@emotion/styled';
import ArrowLeftSvg from '@resources/svg/ArrowLeftSvg';
import AppLabel from '@components/common/label/AppLabel';
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  useBackIcon?: boolean;
  children?: JSX.Element;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 50px;
  width: 100%;
  min-width: 1200px;
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
`;

const LeftContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;

const ArrowLeftButton = styled(ArrowLeftSvg)`
  cursor: pointer;
  position: absolute;
  left: 1px;
  transition: transform 0.1s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

function TitleNavBar({ title, useBackIcon = true, children }: Props) {
  const navigate = useNavigate();

  return (
    <Container style={{ paddingBottom: 25 }}>
      <SubContainer>
        <LeftContainer>
          <ArrowLeftButton
            onClick={() => {
              navigate(-1);
            }}
            style={{ display: useBackIcon ? '' : 'hidden' }}
          />
          <AppLabel size={36} style={{ fontWeight: 800, paddingLeft: 50 }}>
            {title}
          </AppLabel>
        </LeftContainer>
        {children}
      </SubContainer>
    </Container>
  );
}

export default TitleNavBar;
