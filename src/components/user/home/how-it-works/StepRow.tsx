import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { LandingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { landingBodyTypography } from '@styles/landingStyles';

const Row = styled.div`
  padding: 28px 28px 28px 48px;
  gap: 56px;
  border-radius: 16px;
  background: ${LandingColor.SURFACE};
  ${rowFlex({ align: 'center' })}

  ${mobileMediaQuery} {
    padding: 28px 20px 20px;
    gap: 24px;
    ${colFlex({ align: 'stretch' })}
  }
`;

const Text = styled.div`
  width: 380px;
  flex: none;

  ${mobileMediaQuery} {
    width: 100%;
  }
`;

const Number = styled.div`
  font-size: 40px;
  font-weight: 700;
  line-height: 1;
  color: ${LandingColor.ACCENT_TEXT};

  ${mobileMediaQuery} {
    font-size: 34px;
  }
`;

const Title = styled.h3`
  margin: 16px 0 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.4;

  ${mobileMediaQuery} {
    font-size: 19px;
  }
`;

const Description = styled.p`
  ${landingBodyTypography}
  white-space: pre-line;
`;

const Visual = styled.div`
  flex: 1;
  height: 280px;
  border-radius: 12px;
  background: #ffffff;
  ${rowFlex({ justify: 'center', align: 'center' })}

  ${mobileMediaQuery} {
    flex: none;
    height: 220px;
    padding: 0 16px;
  }
`;

interface StepRowProps {
  step: number;
  title: string;
  description: string;
  children: ReactNode;
}

function StepRow({ step, title, description, children }: StepRowProps) {
  return (
    <Row>
      <Text>
        <Number>{step}</Number>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Text>
      <Visual>{children}</Visual>
    </Row>
  );
}

export default StepRow;
