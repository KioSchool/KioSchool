import styled from '@emotion/styled';
import { Link, useLocation, useParams } from 'react-router-dom';
import { colFlex } from '@styles/flexStyles';
import { adminNavData } from '@constants/data/adminNavData';
import { Color } from '@resources/colors';
import { SIDE_NAV_WIDTH } from '@constants/layout';

const SideNavContainer = styled.nav<{ isOpen: boolean }>`
  position: fixed;
  top: 65px;
  left: 0;
  height: calc(100vh - 65px);
  width: ${SIDE_NAV_WIDTH}px;
  background: white;
  box-sizing: border-box;
  padding: 20px 10px 0 40px;
  gap: 20px;
  z-index: 1011;
  transform: translateX(${(props) => (props.isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease;
  border-right: 1px solid #e8eef2;
  ${colFlex()}
`;

const NavCategory = styled.div`
  gap: 8px;
  ${colFlex()}
`;

const CategoryTitle = styled.div`
  color: #464a4d;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
`;

const NavItem = styled('li', {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  position: relative;
  list-style: none;
  margin-left: 24px;
  color: #464a4d;
  font-size: 16px;
  font-weight: ${(props) => (props.isActive ? 700 : 400)};
  line-height: 1.8;

  &::before {
    content: '';
    position: absolute;
    left: -14px;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: currentColor;
  }
  cursor: pointer;

  &:hover {
    color: ${Color.KIO_ORANGE};
  }

  ${(props) =>
    props.isActive &&
    `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -64px;
      width: ${SIDE_NAV_WIDTH}px;
      height: 100%;
      background-color: #fff0e5;
      z-index: -1;
    }
  `}
`;

const SideNavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  display: block;
  width: 100%;
  height: 100%;
`;

interface SideNavProps {
  isOpen: boolean;
}

function SideNav({ isOpen }: SideNavProps) {
  const location = useLocation();
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const URL_PREFIX = `/admin/workspace/${workspaceId}`;

  const isActiveLink = (path: string): boolean => {
    const currentPath = location.pathname.replace(`/admin/workspace/${workspaceId}`, '');
    return currentPath === path;
  };

  return (
    <SideNavContainer isOpen={isOpen}>
      {adminNavData.map((categoryData) => (
        <NavCategory key={categoryData.category}>
          <CategoryTitle>{categoryData.category}</CategoryTitle>
          {categoryData.items.map((item) => (
            <NavItem key={item.path} isActive={isActiveLink(item.path)}>
              <SideNavLink to={`${URL_PREFIX}${item.path}`}>{item.name}</SideNavLink>
            </NavItem>
          ))}
        </NavCategory>
      ))}
    </SideNavContainer>
  );
}

export default SideNav;
