import styled from '@emotion/styled';
import NavBar from '@components/common/nav/NavBar';
import { colFlex } from '@styles/flexStyles';
import { SerializedStyles } from '@emotion/react';
import { Color } from '@resources/colors';
import { useLocation } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { adminWorkspaceAtom } from 'src/jotai/admin/atoms';
import { getPageTitle } from '@@types/guard';

export const MainContainer = styled.div<{ backgroundColor?: string }>`
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : Color.WHITE)};
  ${colFlex({ align: 'center' })}
`;

export const SubContainer = styled.div<{
  customWidth?: string;
  customGap?: string;
  useTitle?: boolean;
}>`
  max-width: ${(props) => props.customWidth || '1200px'};
  width: 100%;
  box-sizing: border-box;
  padding-top: ${(props) => (props.useTitle ? '90px' : '0')};
  flex-grow: 1;
  ${colFlex({
    justify: 'flex-start',
    align: 'center',
  })}
`;

const TitleContainer = styled.div`
  padding-bottom: 30px;
  gap: 15px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const WorkspaceName = styled.div`
  color: #464a4d;
  text-align: center;
  font-size: 40px;
  font-weight: 700;
  line-height: 125%;
`;

const LocationLabel = styled.div`
  color: #464a4d;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
`;

const ContentContainer = styled.div<{ useFlex: SerializedStyles; customGap?: string; useFullHeight?: boolean }>`
  padding-bottom: ${(props) => (props.useFullHeight ? '0' : '50px')};
  flex-grow: 1;
  width: 100%;
  height: 100%;
  gap: ${(props) => props.customGap};
  ${(props) => props.useFlex};
`;

interface Props {
  children: JSX.Element;
  useFlex: SerializedStyles;
  backgroundColor?: string;
  useNavBackground?: boolean;
  useTitle?: boolean;
  useFullHeight?: boolean;
  customWidth?: string;
  customGap?: string;
}

function AppContainer({ children, useFlex, backgroundColor, useNavBackground = true, useTitle = true, useFullHeight = false, customWidth, customGap }: Props) {
  const location = useLocation();
  const workspace = useAtomValue(adminWorkspaceAtom);

  const isAdminHome = location.pathname === '/admin';
  const title = isAdminHome ? '키오스쿨' : workspace.name;
  const label = isAdminHome ? `${workspace.owner.name}님 환영합니다.` : getPageTitle(location.pathname);

  return (
    <MainContainer backgroundColor={backgroundColor} className={'main-container'}>
      <NavBar useBackground={useNavBackground} />
      <SubContainer customWidth={customWidth} className={'sub-container'} useTitle={useTitle}>
        {useTitle && (
          <TitleContainer className={'title-container'}>
            <WorkspaceName>{title}</WorkspaceName>
            <LocationLabel>{label}</LocationLabel>
          </TitleContainer>
        )}
        <ContentContainer useFlex={useFlex} customGap={customGap} useFullHeight={useFullHeight} className={'content-container'}>
          {children}
        </ContentContainer>
      </SubContainer>
    </MainContainer>
  );
}

export default AppContainer;
