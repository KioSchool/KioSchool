import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { LandingColor } from '@resources/colors';
import { landingEyebrowTypography, landingLeadTypography, landingTitleTypography } from '@styles/landingStyles';

const Container = styled(motion.div, { shouldForwardProp: (prop) => prop !== 'centered' })<{ centered: boolean }>`
  max-width: 640px;
  ${({ centered }) => centered && 'max-width: none; text-align: center;'}
`;

const Eyebrow = styled.div`
  ${landingEyebrowTypography}
`;

const Title = styled.h2`
  ${landingTitleTypography}
`;

const TitleLine = styled.span`
  display: block;
`;

const Lead = styled.p<{ inverse: boolean }>`
  ${landingLeadTypography}
  ${({ inverse }) => inverse && `color: ${LandingColor.DARK_SUB_TEXT};`}
`;

interface SectionHeadingProps {
  eyebrow?: string;
  titleLines: string[];
  lead?: string;
  centered?: boolean;
  onDark?: boolean;
}

function SectionHeading({ eyebrow, titleLines, lead, centered = false, onDark = false }: SectionHeadingProps) {
  return (
    <Container
      centered={centered}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Title>
        {titleLines.map((line) => (
          <TitleLine key={line}>{line}</TitleLine>
        ))}
      </Title>
      {lead && <Lead inverse={onDark}>{lead}</Lead>}
    </Container>
  );
}

export default SectionHeading;
