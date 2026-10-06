import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { RiGithubFill, RiInstagramLine } from '@remixicon/react';
import { USER_ROUTES } from '@constants/routes';
import { URLS } from '@constants/urls';
import kioLogo from '@resources/image/kioLogo.png';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

const Container = styled.footer`
  width: 100%;
  padding: 40px 24px 48px;
  box-sizing: border-box;
  background: #f8f9fa;
  border-top: 1px solid #eceef1;
  word-break: keep-all;
  ${colFlex({ align: 'center' })};

  ${mobileMediaQuery} {
    padding: 32px 20px 40px;
  }
`;

const Inner = styled.div`
  max-width: 1120px;
  width: 100%;
  gap: 20px;
  ${colFlex()};
`;

const TopRow = styled.div`
  gap: 16px;
  ${rowFlex({ justify: 'space-between', align: 'flex-start' })};
`;

const Brand = styled.div`
  gap: 8px;
  ${colFlex()};
`;

const LogoImage = styled.img`
  width: 42px;
  height: 20px;
`;

const Tagline = styled.span`
  color: #6b7684;
  font-size: 13px;
`;

const SocialLinks = styled.div`
  gap: 14px;
  ${rowFlex({ align: 'center' })};
`;

const SocialLink = styled.a`
  color: #8b95a1;
  transition: color 0.2s ease;
  ${rowFlex({ align: 'center' })};

  &:hover {
    color: #4e5968;
  }
`;

const Divider = styled.hr`
  width: 100%;
  margin: 0;
  border: none;
  border-top: 1px solid #e5e8eb;
`;

const BottomRow = styled.div`
  gap: 12px;
  ${rowFlex({ justify: 'space-between', align: 'center' })};

  ${mobileMediaQuery} {
    ${colFlex({ align: 'flex-start' })};
  }
`;

const LinkList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  flex-wrap: wrap;
  row-gap: 6px;
  ${rowFlex({ align: 'center' })};

  li + li::before {
    content: '·';
    margin: 0 8px;
    color: #b0b8c1;
  }

  ${mobileMediaQuery} {
    column-gap: 16px;

    li + li::before {
      display: none;
    }
  }
`;

const linkStyle = css`
  color: #6b7684;
  font-size: 13px;
  text-decoration: none;

  &:hover {
    color: #333d4b;
    text-decoration: underline;
  }
`;

const FooterLink = styled(Link)`
  ${linkStyle};
`;

const ExternalFooterLink = styled.a`
  ${linkStyle};
`;

const PrivacyLink = styled(Link)`
  ${linkStyle};
  color: #333d4b;
  font-weight: 700;
`;

const Copyright = styled.span`
  color: #8b95a1;
  font-size: 13px;
`;

const SOCIAL_ICON_SIZE = 20;

function SiteFooter() {
  return (
    <Container>
      <Inner>
        <TopRow>
          <Brand>
            <LogoImage src={kioLogo} alt="키오스쿨" />
            <Tagline>대학 주점을 위한 주문 서비스</Tagline>
          </Brand>
          <SocialLinks>
            <SocialLink href={URLS.EXTERNAL.INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="키오스쿨 인스타그램">
              <RiInstagramLine size={SOCIAL_ICON_SIZE} aria-hidden="true" />
            </SocialLink>
            <SocialLink href={URLS.EXTERNAL.GITHUB} target="_blank" rel="noopener noreferrer" aria-label="키오스쿨 GitHub">
              <RiGithubFill size={SOCIAL_ICON_SIZE} aria-hidden="true" />
            </SocialLink>
          </SocialLinks>
        </TopRow>
        <Divider />
        <BottomRow>
          <nav aria-label="사이트 정보">
            <LinkList>
              <li>
                <FooterLink to={USER_ROUTES.INFO}>서비스 소개</FooterLink>
              </li>
              <li>
                <ExternalFooterLink href={URLS.EXTERNAL.NOTION_FAQ} target="_blank" rel="noopener noreferrer">
                  자주 묻는 질문
                </ExternalFooterLink>
              </li>
              <li>
                <FooterLink to={USER_ROUTES.CONTACT}>문의하기</FooterLink>
              </li>
              <li>
                <PrivacyLink to={USER_ROUTES.PRIVACY}>개인정보처리방침</PrivacyLink>
              </li>
            </LinkList>
          </nav>
          <Copyright>© {new Date().getFullYear()} KioSchool</Copyright>
        </BottomRow>
      </Inner>
    </Container>
  );
}

export default SiteFooter;
