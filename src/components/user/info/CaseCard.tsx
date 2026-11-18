import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { LandingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

const CARD_STAGGER_SECONDS = 0.1;

const Card = styled(motion.div)`
  padding: 40px;
  border-radius: 16px;
  background: #ffffff;
  ${colFlex()}

  ${mobileMediaQuery} {
    padding: 28px;
  }
`;

const Organization = styled.div`
  font-size: 15px;
  color: ${LandingColor.CAPTION};
`;

const OrganizationName = styled.b`
  display: block;
  margin-bottom: 2px;
  color: ${LandingColor.TEXT};
`;

const Title = styled.h3`
  margin: 12px 0 0;
  font-size: 24px;
  font-weight: 700;

  ${mobileMediaQuery} {
    font-size: 20px;
  }
`;

const Quote = styled.p`
  margin: 12px 0 0;
  font-size: 17px;
  line-height: 1.6;
  color: ${LandingColor.SUB_TEXT};

  ${mobileMediaQuery} {
    font-size: 16px;
  }
`;

const Metrics = styled.div`
  margin-top: auto;
  padding-top: 32px;
  gap: 40px;
  ${rowFlex({ align: 'flex-start' })}
`;

const Metric = styled.div``;

const MetricValue = styled.b`
  display: block;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${LandingColor.ACCENT_TEXT};
`;

const MetricLabel = styled.span`
  display: block;
  margin-top: 2px;
  font-size: 14px;
  color: ${LandingColor.CAPTION};
`;

interface CaseMetric {
  value: string;
  label: string;
}

interface CaseCardProps {
  order: number;
  organization: string;
  event?: string;
  title: string;
  quote: string;
  metrics: CaseMetric[];
}

function CaseCard({ order, organization, event, title, quote, metrics }: CaseCardProps) {
  return (
    <Card
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: order * CARD_STAGGER_SECONDS }}
    >
      <Organization>
        <OrganizationName>{organization}</OrganizationName>
        {event}
      </Organization>
      <Title>{title}</Title>
      <Quote>“{quote}”</Quote>
      <Metrics>
        {metrics.map((metric) => (
          <Metric key={metric.label}>
            <MetricValue>{metric.value}</MetricValue>
            <MetricLabel>{metric.label}</MetricLabel>
          </Metric>
        ))}
      </Metrics>
    </Card>
  );
}

export default CaseCard;
