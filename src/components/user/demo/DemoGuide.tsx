import styled from '@emotion/styled';
import { LandingColor } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

const Container = styled.div`
  gap: 14px;
  padding: 18px 24px;
  border-radius: 16px;
  background: ${LandingColor.TINT};
  ${rowFlex({ align: 'center' })}

  ${mobileMediaQuery} {
    gap: 10px;
    padding: 14px 16px;
    border-radius: 12px;
  }
`;

const Badge = styled.span`
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${LandingColor.ACCENT};
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  ${rowFlex({ justify: 'center', align: 'center' })}

  ${mobileMediaQuery} {
    width: 24px;
    height: 24px;
    font-size: 12px;
  }
`;

const Text = styled.p`
  flex: 1;
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
  color: ${LandingColor.TEXT};

  ${mobileMediaQuery} {
    font-size: 15px;
    line-height: 1.45;
  }
`;

interface DemoGuideProps {
  stepNumber: number;
  text: string;
}

function DemoGuide({ stepNumber, text }: DemoGuideProps) {
  return (
    <Container role="status" aria-live="polite">
      <Badge aria-hidden="true">{stepNumber}</Badge>
      <Text>{text}</Text>
    </Container>
  );
}

export default DemoGuide;
