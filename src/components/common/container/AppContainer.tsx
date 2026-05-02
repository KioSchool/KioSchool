import styled from '@emotion/styled';
import NavBar from '@components/common/nav/NavBar';
import { colFlex } from '@styles/flexStyles';
import { SerializedStyles } from '@emotion/react';
import { Color } from '@resources/colors';
import { useLocation } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import { adminSideNavIsOpenAtom, adminUserAtom, adminWorkspaceAtom } from '@jotai/admin/atoms';
import { layoutParamsAtom, windowWidthAtom } from '@jotai/atoms';
import { calculateLayoutScale } from 'src/utils/layout';
import { getPageTitle } from '@@types/guard';
import { DEFAULT_LAYOUT_WIDTH, SIDE_NAV_WIDTH } from '@constants/layout';
import { tabletMediaQuery } from '@styles/globalStyles';
import { useEffect } from 'react';

export const MainContainer = styled.div<{ backgroundColor?: string; sideNavOffset: number }>`
  width: ${(props) => (props.sideNavOffset > 0 ? `calc(100% - ${props.sideNavOffset}px)` : '100%')};
  min-height: 100vh;
  box-sizing: border-box;
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : Color.WHITE)};
  margin-left: ${(props) => props.sideNavOffset}px;
  transition: width 0.3s ease, margin-left 0.3s ease;
  ${colFlex({ align: 'center' })}
`;

export const SubContainer = styled.div<{
  customWidth?: string;
  customGap?: string;
  customHeight?: string;
  useTitle?: boolean;
  useFlex?: SerializedStyles;
}>`
  max-width: ${(props) => props.customWidth || `${DEFAULT_LAYOUT_WIDTH}px`};
  width: 100%;
  height: ${(props) => props.customHeight || 'auto'};
  gap: ${(props) => props.customGap || '0'};
  box-sizing: border-box;
  flex-grow: 1;
  padding-top: ${(props) => (props.useTitle ? '90px' : '0')};
  ${(props) =>
    props.useFlex ||
    colFlex({
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

  ${tabletMediaQuery} {
    font-size: 32px;
  }
`;

const LocationLabel = styled.div`
  color: #464a4d;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;

  ${tabletMediaQuery} {
    font-size: 16px;
  }
`;

const ContentContainer = styled.div<{
  useFlex: SerializedStyles;
  customGap?: string;
  useFullHeight?: boolean;
  scale?: number;
}>`
  padding-bottom: ${(props) => (props.useFullHeight ? '0' : '50px')};
  flex-grow: 1;
  width: 100%;
  height: 100%;
  gap: ${(props) => props.customGap};
  zoom: ${(props) => (props.scale && props.scale !== 1 ? props.scale : undefined)};
  ${(props) => props.useFlex};
`;

interface Props {
  children: JSX.Element;
  useFlex: SerializedStyles;
  backgroundColor?: string;
  useTitle?: boolean;
  useFullHeight?: boolean;
  customWidth?: string;
  customGap?: string;
}

const getHeaderInfo = (pathname: string, workspaceName: string, userName: string) => {
  if (pathname.startsWith('/super-admin')) {
    return { title: '슈퍼 어드민', label: getPageTitle(pathname) };
  }
  if (pathname === '/admin') {
    return { title: '키오스쿨', label: `${userName}님 환영합니다.` };
  }
  return { title: workspaceName, label: getPageTitle(pathname) };
};

function AppContainer({ children, useFlex, backgroundColor, useTitle = true, useFullHeight = false, customWidth, customGap }: Props) {
  const location = useLocation();
  const workspace = useAtomValue(adminWorkspaceAtom);
  const user = useAtomValue(adminUserAtom);
  const isSideNavOpen = useAtomValue(adminSideNavIsOpenAtom);
  const windowWidth = useAtomValue(windowWidthAtom);
  const setLayoutParams = useSetAtom(layoutParamsAtom);

  const isAdminWorkspace = location.pathname.startsWith('/admin/workspace/');
  const { title, label } = getHeaderInfo(location.pathname, workspace.name, user.name);

  const useNavBackground = true;
  const sideNavOffset = isAdminWorkspace && isSideNavOpen ? SIDE_NAV_WIDTH : 0;
  const scale = calculateLayoutScale(windowWidth, customWidth, sideNavOffset);

  useEffect(() => {
    setLayoutParams({ customWidth, sideNavOffset });
  }, [customWidth, sideNavOffset, setLayoutParams]);

  return (
    <MainContainer backgroundColor={backgroundColor} sideNavOffset={sideNavOffset} className={'main-container'}>
      <NavBar useBackground={useNavBackground} />
      <SubContainer customWidth={customWidth} className={'sub-container'} useTitle={useTitle}>
        {useTitle && (
          <TitleContainer className={'title-container'}>
            <WorkspaceName>{title}</WorkspaceName>
            <LocationLabel>{label}</LocationLabel>
          </TitleContainer>
        )}
        <ContentContainer useFlex={useFlex} customGap={customGap} useFullHeight={useFullHeight} className={'content-container'} scale={scale}>
          {children}
        </ContentContainer>
      </SubContainer>
    </MainContainer>
  );
}

export default AppContainer;
