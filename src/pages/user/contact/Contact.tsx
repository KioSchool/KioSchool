import styled from '@emotion/styled';
import AppContainer from '@components/common/container/AppContainer';
import ContactFaqCard from '@components/user/contact/ContactFaqCard';
import ContactInquiryForm from '@components/user/contact/ContactInquiryForm';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

const PageContent = styled.main`
  max-width: 720px;
  width: 100%;
  padding: 130px 20px 80px;
  box-sizing: border-box;
  gap: 28px;
  ${colFlex({ align: 'center' })};

  ${mobileMediaQuery} {
    padding: 110px 16px 56px;
    gap: 22px;
  }
`;

const Header = styled.header`
  text-align: center;
  gap: 12px;
  ${colFlex({ align: 'center' })};
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

const Description = styled.p`
  margin: 0;
  color: ${Color.GREY};
  font-size: 16px;
  line-height: 1.7;
`;

function Contact() {
  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} customWidth="100%" useTitle={false} backgroundColor="#f8f9fa">
      <PageContent>
        <Header>
          <Eyebrow>CONTACT</Eyebrow>
          <Title>키오스쿨 문의하기</Title>
          <Description>서비스 이용 중 궁금한 점이나 불편한 내용을 남겨주시면 입력하신 이메일로 답변드리겠습니다.</Description>
        </Header>
        <ContactFaqCard />
        <ContactInquiryForm />
      </PageContent>
    </AppContainer>
  );
}

export default Contact;
