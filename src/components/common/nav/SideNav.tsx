import styled from '@emotion/styled';
import { Link, useLocation, useParams } from 'react-router-dom';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { adminNavData } from '@resources/data/adminNavData';
import { RiSubtractLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import { useCallback } from 'react';

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 65px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1010;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
`;

const SideNavContainer = styled.nav<{ isOpen: boolean }>`
  position: fixed;
  top: 65px;
  left: 0;
  height: calc(100vh - 65px);
  width: 280px;
  background: white;
  z-index: 1011;
  transform: translateX(${(props) => (props.isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease;
  border-right: 1px solid #e8eef2;
  ${colFlex()}
`;

const SideNavContent = styled.div`
  padding: 20px 10px 0 40px;
  gap: 24px;
  ${colFlex()}
`;

const NavCategory = styled.div`
  gap: 8px;
  ${colFlex()}
`;

const CategoryTitle = styled.h2`
  margin: 10px 0;
  color: #464a4d;
  font-family: 'LINE Seed Sans KR';
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
`;

const ItemPreIcon = styled(RiSubtractLine)`
  width: 15px;
  margin-right: 8px;
`;

const SideNavLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  text-decoration: none;
  color: #464a4d;
  font-family: 'LINE Seed Sans KR';
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
  onClose: () => void;
}

function SideNav({ isOpen, onClose }: SideNavProps) {
  const location = useLocation();
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const URL_PREFIX = `/admin/workspace/${workspaceId}`;

  const isActiveLink = useCallback(
    (path: string): boolean => {
      const currentPath = location.pathname.replace(`/admin/workspace/${workspaceId}`, '');
      const itemPathname = path.split('?')[0];

      return currentPath === itemPathname;
    },
    [location.pathname, workspaceId],
  );

  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <SideNavContainer isOpen={isOpen}>
        <SideNavContent>
          {adminNavData.map((categoryData) => (
            <NavCategory key={categoryData.category}>
              <CategoryTitle>{categoryData.category}</CategoryTitle>
              {categoryData.items.map((item) => (
                <SideNavLink key={item.path} to={`${URL_PREFIX}${item.path}`} isActive={isActiveLink(item.path)}>
                  <ItemPreIcon />
                  {item.name}
                </SideNavLink>
              ))}
            </NavCategory>
          ))}
        </SideNavContent>
      </SideNavContainer>
    </>
  );
}

export default SideNav;
