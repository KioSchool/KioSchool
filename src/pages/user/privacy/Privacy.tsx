import styled from '@emotion/styled';
import PageSeo from '@components/common/page/PageSeo';
import AppContainer from '@components/common/container/AppContainer';
import SiteFooter from '@components/common/footer/SiteFooter';
import PrivacyPolicySectionContent from '@components/user/privacy/PrivacyPolicySectionContent';
import { MARKETING_SEO } from '@constants/marketingSeo';
import { PRIVACY_POLICY_EFFECTIVE_DATE, PRIVACY_POLICY_INTRO, PRIVACY_POLICY_SECTIONS } from '@constants/data/privacyPolicy';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

const Page = styled.div``;

const PageContent = styled.main`
  max-width: 760px;
  width: 100%;
  padding: 130px 20px 96px;
  box-sizing: border-box;
  word-break: keep-all;
  gap: 40px;
  ${colFlex()};

  ${mobileMediaQuery} {
    padding: 110px 16px 64px;
    gap: 32px;
  }
`;

const Header = styled.header`
  gap: 12px;
  ${colFlex()};
`;

const Eyebrow = styled.span`
  color: ${Color.KIO_ORANGE};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
`;

const Title = styled.h1`
  margin: 0;
  color: #191f28;
  font-size: 38px;
  line-height: 1.3;

  ${mobileMediaQuery} {
    font-size: 30px;
  }
`;

const EffectiveDate = styled.span`
  color: #8b95a1;
  font-size: 14px;
`;

const Intro = styled.p`
  margin: 0;
  color: #4e5968;
  font-size: 15px;
  line-height: 1.75;
`;

function Privacy() {
  return (
    <Page>
      <PageSeo {...MARKETING_SEO.privacy} />
      <AppContainer useFlex={colFlex({ align: 'center' })} customWidth="100%" useTitle={false} useFullHeight={true}>
        <PageContent>
          <Header>
            <Eyebrow>PRIVACY</Eyebrow>
            <Title>개인정보처리방침</Title>
            <EffectiveDate>시행일 {PRIVACY_POLICY_EFFECTIVE_DATE}</EffectiveDate>
          </Header>
          <Intro>{PRIVACY_POLICY_INTRO}</Intro>
          {PRIVACY_POLICY_SECTIONS.map((section) => (
            <PrivacyPolicySectionContent key={section.title} section={section} />
          ))}
        </PageContent>
      </AppContainer>
      <SiteFooter />
    </Page>
  );
}

export default Privacy;
