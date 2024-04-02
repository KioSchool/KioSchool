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
  margin-top: 200px;
  justify-content: center;
  height: 50px;
  width: 100%;
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

function TitleNavBar({ title, useBackIcon = true, children }: Props) {
  const navigate = useNavigate();

  return (
    <Container>
      <SubContainer>
        <LeftContainer>
          <ArrowLeftSvg
            style={{ display: useBackIcon ? '' : 'hidden', cursor: 'pointer' }}
            onClick={() => {
              navigate(-1);
            }}
          />
          <AppLabel size={36} style={{ fontWeight: 800 }}>
            {title}
          </AppLabel>
        </LeftContainer>
        {children}
      </SubContainer>
    </Container>
  );
}

export default TitleNavBar;
