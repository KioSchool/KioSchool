import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { USER_ROUTES } from '@constants/routes';
import { rowFlex } from '@styles/flexStyles';

const Container = styled.nav`
  gap: 8px;
  color: #b0b8c1;
  font-size: 12px;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const LegalLink = styled(Link)`
  color: #8b95a1;
  text-decoration: none;

  &:hover {
    color: #4e5968;
    text-decoration: underline;
  }
`;

const PrivacyLink = styled(LegalLink)`
  color: #4e5968;
  font-weight: 700;
`;

interface LegalLinksProps {
  className?: string;
}

function LegalLinks({ className }: LegalLinksProps) {
  return (
    <Container className={className} aria-label="개인정보처리방침과 문의">
      <PrivacyLink to={USER_ROUTES.PRIVACY}>개인정보처리방침</PrivacyLink>
      <span aria-hidden="true">·</span>
      <LegalLink to={USER_ROUTES.CONTACT}>문의하기</LegalLink>
    </Container>
  );
}

export default LegalLinks;
