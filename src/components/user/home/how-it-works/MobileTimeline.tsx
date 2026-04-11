import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { Color } from '@resources/colors';

const Container = styled.div`
  display: none;
  width: 100%;
  margin-top: 40px;

  ${mobileMediaQuery} {
    ${colFlex({})};
  }
`;

const Step = styled.div`
  gap: 20px;
  ${rowFlex({ align: 'flex-start' })};
`;

const NodeColumn = styled.div`
  flex-shrink: 0;
  ${colFlex({ align: 'center' })};
`;

const NodeCircle = styled.div<{ step: number }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ step }) => (step === 3 ? Color.KIO_ORANGE : Color.WHITE)};
  border: 2px solid ${({ step }) => (step === 3 ? Color.KIO_ORANGE : '#e5e8eb')};
  color: ${({ step }) => (step === 3 ? Color.WHITE : '#3C3530')};
  font-size: 16px;
  font-weight: 800;
  flex-shrink: 0;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const Connector = styled.div`
  width: 2px;
  height: 40px;
  background: #e5e8eb;
`;

const StepContent = styled.div`
  padding-bottom: 32px;
  ${colFlex({})};
`;

const StepTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #3c3530;
  letter-spacing: -0.02em;
`;

const StepDescription = styled.p`
  font-size: 14px;
  color: #8b95a1;
  letter-spacing: -0.01em;
  line-height: 1.65;
  margin-top: 4px;
`;

interface StepData {
  number: number;
  title: string;
  description: string;
}

interface MobileTimelineProps {
  steps: StepData[];
}

function MobileTimeline({ steps }: MobileTimelineProps) {
  return (
    <Container>
      {steps.map((step, index) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
        >
          <Step>
            <NodeColumn>
              <NodeCircle step={step.number}>{step.number}</NodeCircle>
              {index < steps.length - 1 && <Connector />}
            </NodeColumn>
            <StepContent>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </StepContent>
          </Step>
        </motion.div>
      ))}
    </Container>
  );
}

export default MobileTimeline;
