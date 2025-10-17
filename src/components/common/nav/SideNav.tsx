import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { adminNavData, AdminNavItem } from '@resources/data/adminNavData';
import { RiSubtractLine } from '@remixicon/react';
import { Color } from '@resources/colors';

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
  height: 100vh;
  width: 280px;
  background: white;
  z-index: 1011;
  transform: translateX(${(props) => (props.isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease;
  border-right: 1px solid #e8eef2;
  ${colFlex({ justify: 'flex-start', align: 'stretch' })}
`;

const SideNavContent = styled.div`
  padding: 20px 10px 0 40px;
  gap: 24px;
  ${colFlex({ justify: 'flex-start', align: 'stretch' })}
`;

const NavCategory = styled.div`
  gap: 8px;
  ${colFlex({ justify: 'flex-start', align: 'stretch' })}
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

const SideNavLink = styled(Link)<{ isActive: boolean }>`
  text-decoration: none;
  color: #464a4d;
  font-family: 'LINE Seed Sans KR';
  font-size: 16px;
  font-style: normal;
  font-weight: ${(props) => (props.isActive ? 700 : 400)};
  cursor: pointer;
  ${rowFlex({ justify: 'flex-start', align: 'center' })}

  &:hover {
    color: ${Color.KIO_ORANGE};
  }
`;

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
  workspaceId: string;
}

function SideNav({ isOpen, onClose, workspaceId }: SideNavProps) {
  const location = useLocation();

  const groupedNav = adminNavData.reduce<Record<string, AdminNavItem[]>>((acc, item) => {
    const categoryItems = acc[item.category] ?? [];

    return { ...acc, [item.category]: [...categoryItems, item] };
  }, {});

  const isActiveLink = (itemPath: string): boolean => {
    const currentPathWithoutWorkspace = location.pathname.replace(`/admin/workspace/${workspaceId}`, '');
    const itemPathname = itemPath.split('?')[0];

    return currentPathWithoutWorkspace === itemPathname;
  };

  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <SideNavContainer isOpen={isOpen}>
        <SideNavContent>
          {Object.entries(groupedNav).map(([category, items]) => (
            <NavCategory key={category}>
              <CategoryTitle>{category}</CategoryTitle>
              {items.map((item) => (
                <SideNavLink key={item.path} to={`/admin/workspace/${workspaceId}${item.path}`} isActive={isActiveLink(item.path)}>
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
