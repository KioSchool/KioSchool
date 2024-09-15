import React from 'react';
import styled from '@emotion/styled';
import ArrowLeftSvg from '@resources/svg/ArrowLeftSvg';
import AppLabel from '@components/common/label/AppLabel';
import { useNavigate } from 'react-router-dom';
import { colFlex, rowFlex } from '@styles/flexStyles';

export interface TitleNavBarProps {
  title: string;
  subTitle?: string;
  useBackIcon?: boolean;
  children?: JSX.Element;
  onLeftArrowClick?: () => void;
}

const Container = styled.div<{ useSubTitle: boolean }>`
  padding-bottom: 25px;
  height: ${(props) => (props.useSubTitle ? '100px' : '50px')};
  width: 1000px;
  min-width: 1000px;
  position: fixed;
  top: 70px;
  ${rowFlex({ justify: 'center' })}
`;

const TitleContainer = styled.div<{ useBackIcon?: boolean }>`
  padding-left: ${(props) => (props.useBackIcon ? '40px' : '')};
  height: 40px;
  ${colFlex()}
`;

const SubContainer = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between' })}
`;

const LeftContainer = styled.div`
  position: relative;
  gap: 25px;
  ${rowFlex({ justify: 'center', align: 'center' })}
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

function TitleNavBar({ title, subTitle = '', useBackIcon = true, children, onLeftArrowClick }: TitleNavBarProps) {
  const navigate = useNavigate();

  return (
    <Container useSubTitle={!!subTitle} className={'title-nav-bar-container'}>
      <SubContainer className={'title-nav-bar-sub-container'}>
        <LeftContainer className={'left-container'}>
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
          <TitleContainer className={'title-container'} useBackIcon={useBackIcon}>
            <AppLabel size={25} style={{ fontWeight: 800, lineHeight: '40px' }}>
              {title}
            </AppLabel>
            <AppLabel size={20} style={{ fontWeight: 400, opacity: 0.8 }}>
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
