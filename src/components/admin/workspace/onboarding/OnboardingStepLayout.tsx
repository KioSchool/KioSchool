import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { RiExternalLinkLine, RiQuestionLine } from '@remixicon/react';
import { URLS } from '@constants/urls';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Container = styled.section`
  width: 100%;
  padding: 34px 36px;
  border: 1px solid #e8eef2;
  border-radius: 28px;
  background: linear-gradient(180deg, #ffffff 0%, #fffaf6 100%);
  box-shadow: 0 18px 50px rgba(92, 92, 92, 0.08);
  box-sizing: border-box;
  gap: 24px;
  ${colFlex({ align: 'start' })}
`;

const Header = styled.div`
  width: 100%;
  gap: 14px;
  ${colFlex({ align: 'start' })}
`;

const HeaderTopRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const StepBadge = styled.div`
  padding: 8px 14px;
  border-radius: 999px;
  background: #fff0e5;
  color: ${Color.KIO_ORANGE};
  font-size: 13px;
  font-weight: 700;
  ${rowFlex({ justify: 'center', align: 'center' })}
  gap: 6px;
`;

const FaqLink = styled.a`
  color: #6a7074;
  font-size: 14px;
  text-decoration: none;
  ${rowFlex({ justify: 'center', align: 'center' })}
  gap: 6px;

  &:hover {
    color: ${Color.KIO_ORANGE};
  }
`;

const Title = styled.h2`
  margin: 0;
  color: #25282b;
  font-size: 34px;
  line-height: 1.25;
`;

const Description = styled.p`
  margin: 0;
  color: #5d6368;
  font-size: 16px;
  line-height: 1.7;
`;

const TipBox = styled.div`
  width: 100%;
  padding: 16px 18px;
  border-radius: 18px;
  background: #fff7f0;
  color: #6a4c34;
  font-size: 14px;
  line-height: 1.6;
`;

const Content = styled.div`
  width: 100%;
  gap: 20px;
  ${colFlex({ align: 'start' })}
`;

interface OnboardingStepLayoutProps {
  stepLabel: string;
  title: string;
  description: string;
  tip: string;
  children: ReactNode;
}

function OnboardingStepLayout({ stepLabel, title, description, tip, children }: OnboardingStepLayoutProps) {
  return (
    <Container>
      <Header>
        <HeaderTopRow>
          <StepBadge>
            <RiQuestionLine size={16} />
            {stepLabel}
          </StepBadge>
          <FaqLink href={URLS.EXTERNAL.NOTION_FAQ} target="_blank" rel="noopener noreferrer">
            왜 필요한가요?
            <RiExternalLinkLine size={16} />
          </FaqLink>
        </HeaderTopRow>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Header>

      <TipBox>{tip}</TipBox>

      <Content>{children}</Content>
    </Container>
  );
}

export default OnboardingStepLayout;
