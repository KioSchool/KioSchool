import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import ProductShot from '@components/user/landing/ProductShot';
import { LandingColor } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { landingBodyTypography } from '@styles/landingStyles';

const PHONE_RATIO = 780 / 1688;

const STEP_STAGGER_SECONDS = 0.1;

const Container = styled(motion.div)`
  width: 260px;

  ${mobileMediaQuery} {
    width: calc(50% - 7px);
  }
`;

const Caption = styled.div`
  margin-top: 20px;
`;

const StepNumber = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background: ${LandingColor.TEXT};
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Title = styled.h3`
  margin: 24px 0 0;
  font-size: 20px;
  font-weight: 700;

  ${mobileMediaQuery} {
    margin-top: 16px;
    font-size: 17px;
  }
`;

const Description = styled.p`
  ${landingBodyTypography}
`;

interface PhoneStepProps {
  step: number;
  image: string;
  title: string;
  description: string;
}

function PhoneStep({ step, image, title, description }: PhoneStepProps) {
  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: (step - 1) * STEP_STAGGER_SECONDS }}
    >
      <ProductShot src={image} alt={`${title} 화면`} ratio={PHONE_RATIO} shape="phone" />
      <Caption>
        <StepNumber>{step}</StepNumber>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Caption>
    </Container>
  );
}

export default PhoneStep;
