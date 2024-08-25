import React from 'react';
import styled from '@emotion/styled';
import ArrowLeftSvg from '@resources/svg/ArrowLeftSvg';
import AppLabel from '@components/common/label/AppLabel';
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  subTitle?: string;
  useBackIcon?: boolean;
  children?: JSX.Element;
  onLeftArrowClick?: () => void;
}

const Container = styled.div<{ useSubTitle: boolean }>`
  display: flex;
  padding-bottom: 25px;
  justify-content: center;
  height: ${(props) => (props.useSubTitle ? '100px' : '50px')};
  width: 1000px;
  min-width: 1000px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 50px;
  height: 40px;
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const LeftContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 25px;
`;

const ArrowLeftButton = styled(ArrowLeftSvg)<{ useBackIcon: boolean }>`
  display: ${(props) => (props.useBackIcon ? 'block' : 'none')};
  cursor: pointer;
  position: absolute;
  left: 1px;
  transition: transform 0.1s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

function TitleNavBar({ title, subTitle = '', useBackIcon = true, children, onLeftArrowClick }: Props) {
  const navigate = useNavigate();

  return (
    <Container useSubTitle={!!subTitle}>
      <SubContainer>
        <LeftContainer>
          <ArrowLeftButton
            onClick={() => {
              if (onLeftArrowClick) {
                onLeftArrowClick();
                return;
              }
              navigate(-1);
            }}
            useBackIcon={useBackIcon}
          />
          <TitleContainer>
            <AppLabel size={36} style={{ fontWeight: 800, lineHeight: '40px' }}>
              {title}
            </AppLabel>
            <AppLabel size={32} style={{ fontWeight: 400, opacity: 0.8 }}>
              {subTitle}
            </AppLabel>
          </TitleContainer>
        </LeftContainer>
        {children}
      </SubContainer>
    </Container>
  );
}

export default TitleNavBar;
