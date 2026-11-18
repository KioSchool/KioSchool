import styled from '@emotion/styled';
import { LandingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { LandingInner, LandingSection, landingLeadTypography, landingTitleTypography } from '@styles/landingStyles';
import LandingFaqItem from './LandingFaqItem';
import RevealOnScroll from './RevealOnScroll';

const Layout = styled.div`
  gap: 80px;
  ${rowFlex({ align: 'flex-start' })}

  ${mobileMediaQuery} {
    gap: 32px;
    ${colFlex({ align: 'stretch' })}
  }
`;

const Heading = styled.div`
  width: 360px;
  flex: none;

  ${mobileMediaQuery} {
    width: 100%;
  }
`;

const Title = styled.h2`
  ${landingTitleTypography}
`;

const Lead = styled.p`
  ${landingLeadTypography}
`;

const List = styled.div`
  flex: 1;
  border-top: 1px solid ${LandingColor.LINE};
`;

interface LandingFaqEntry {
  question: string;
  answer: string;
}

interface LandingFaqSectionProps {
  items: LandingFaqEntry[];
  collapsible?: boolean;
}

function LandingFaqSection({ items, collapsible = false }: LandingFaqSectionProps) {
  return (
    <LandingSection tone="grey">
      <LandingInner>
        <Layout>
          <Heading>
            <RevealOnScroll>
              <Title>자주 묻는 질문</Title>
              <Lead>더 궁금한 점은 문의하기로 남겨 주세요</Lead>
            </RevealOnScroll>
          </Heading>
          <List>
            <RevealOnScroll delay={0.1}>
              {items.map((item) => (
                <LandingFaqItem key={item.question} question={item.question} answer={item.answer} collapsible={collapsible} />
              ))}
            </RevealOnScroll>
          </List>
        </Layout>
      </LandingInner>
    </LandingSection>
  );
}

export default LandingFaqSection;
