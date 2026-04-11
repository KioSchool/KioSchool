import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { RiCloseLine } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { Color } from '@resources/colors';
import { URLS } from '@constants/urls';
import { USER_ROUTES, ADMIN_ROUTES } from '@constants/routes';

const Overlay = styled.div<{ isOpen: boolean }>`
  display: none;

  ${mobileMediaQuery} {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1006;
  }
`;

const Menu = styled.div<{ isOpen: boolean }>`
  display: none;

  ${mobileMediaQuery} {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    width: 280px;
    height: 100%;
    background: white;
    z-index: 1007;
    padding: 24px;
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.08);
    transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
    transition: transform 0.25s ease;
    gap: 8px;
    ${colFlex({})};
  }
`;

const MenuHeader = styled.div`
  margin-bottom: 16px;
  ${rowFlex({ justify: 'flex-end' })};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #3c3530;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const NavLink = styled(Link)`
  padding: 14px 0;
  font-size: 16px;
  font-weight: 500;
  color: #3c3530;
  text-decoration: none;
  border-bottom: 1px solid #f2f4f6;

  &:hover {
    color: ${Color.KIO_ORANGE};
  }
`;

const NavUrl = styled.a`
  padding: 14px 0;
  font-size: 16px;
  font-weight: 500;
  color: #3c3530;
  text-decoration: none;
  border-bottom: 1px solid #f2f4f6;

  &:hover {
    color: ${Color.KIO_ORANGE};
  }
`;

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <Menu isOpen={isOpen}>
        <MenuHeader>
          <CloseButton onClick={onClose}>
            <RiCloseLine size={24} />
          </CloseButton>
        </MenuHeader>
        <NavLink to={USER_ROUTES.INFO} onClick={onClose}>
          키오스쿨 소개
        </NavLink>
        <NavUrl href={URLS.EXTERNAL.NOTION_FAQ} target="_blank" rel="noopener noreferrer" onClick={onClose}>
          FAQ
        </NavUrl>
        <NavLink to={USER_ROUTES.LOGIN} onClick={onClose}>
          로그인
        </NavLink>
        <NavLink to={USER_ROUTES.REGISTER} onClick={onClose}>
          회원가입
        </NavLink>
        <NavLink to={ADMIN_ROUTES.MY_INFO} onClick={onClose}>
          마이페이지
        </NavLink>
      </Menu>
    </>
  );
}

export default MobileNav;
