import styled from '@emotion/styled';
import { Link, useLocation, useParams } from 'react-router-dom';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { adminNavData } from '@constants/data/adminNavData';
import { Color } from '@resources/colors';

const SideNavContainer = styled.nav<{ isOpen: boolean }>`
  position: fixed;
  top: 65px;
  left: 0;
  height: calc(100vh - 65px);
  width: 220px;
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

const CategoryTitle = styled.h2`
  margin: 10px 0;
  color: #464a4d;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
`;

const SideNavLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  text-decoration: none;
  color: #464a4d;
  font-size: 16px;
  font-style: normal;
  font-weight: ${(props) => (props.isActive ? 700 : 400)};
  cursor: pointer;
  ${rowFlex()}

  &:hover {
    color: ${Color.KIO_ORANGE};
  }
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

  const buildNavPath = (path: string, defaultQuery?: Record<string, string>): string => {
    const fullPath = `${URL_PREFIX}${path}`;
    if (!defaultQuery) return fullPath;

    const queryString = new URLSearchParams(defaultQuery).toString();

    return `${fullPath}?${queryString}`;
  };

  return (
    <SideNavContainer isOpen={isOpen}>
      {adminNavData.map((categoryData) => (
        <NavCategory key={categoryData.category}>
          <CategoryTitle>{categoryData.category}</CategoryTitle>
          {categoryData.items.map((item) => (
            <SideNavLink key={item.path} to={buildNavPath(item.path, item.defaultQuery)} isActive={isActiveLink(item.path)}>
              {item.name}
            </SideNavLink>
          ))}
        </NavCategory>
      ))}
    </SideNavContainer>
  );
}

export default SideNav;
