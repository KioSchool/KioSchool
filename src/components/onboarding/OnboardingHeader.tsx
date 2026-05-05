import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { OnboardingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex({ align: 'start' })}
`;

const HeaderRow = styled.div`
  width: 100%;
  gap: 12px;
  ${rowFlex({ justify: 'space-between', align: 'end' })}
`;

const TextContainer = styled.div`
  gap: 8px;
  ${colFlex({ align: 'start' })}
`;

const Eyebrow = styled.div`
  color: ${OnboardingColor.EYEBROW_TEXT};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
`;

const Title = styled.h1`
  margin: 0;
  color: ${OnboardingColor.TITLE_TEXT};
  font-size: 18px;
  line-height: 1.2;
`;

const Description = styled.p`
  margin: 0;
  color: ${OnboardingColor.BODY_TEXT};
  font-size: 14px;
  line-height: 1.7;
`;

interface OnboardingHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}

function OnboardingHeader({ eyebrow, title, description, action }: OnboardingHeaderProps) {
  return (
    <Container>
      <HeaderRow>
        <TextContainer>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Title>{title}</Title>
        </TextContainer>
        {action}
      </HeaderRow>
      <Description>{description}</Description>
    </Container>
  );
}

export default OnboardingHeader;
