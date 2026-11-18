import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { match } from 'ts-pattern';
import { LandingColor } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { landingBodyTypography } from '@styles/landingStyles';

const Item = styled.div`
  padding: 28px 0;
  border-bottom: 1px solid ${LandingColor.LINE};
`;

const Question = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;

  ${mobileMediaQuery} {
    font-size: 17px;
  }
`;

const QuestionButton = styled.button`
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  text-align: left;
  cursor: pointer;
  gap: 16px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const CHEVRON_OPEN_DEGREE = 180;

const Chevron = styled.span<{ open: boolean }>`
  flex: none;
  font-size: 18px;
  color: ${LandingColor.CAPTION};
  transform: rotate(${({ open }) => Number(open) * CHEVRON_OPEN_DEGREE}deg);
  transition: transform 0.2s ease;
`;

const Answer = styled.p`
  ${landingBodyTypography}
  margin-top: 10px;
`;

const CollapsibleAnswer = styled(motion.div)`
  overflow: hidden;
`;

interface LandingFaqItemProps {
  question: string;
  answer: string;
  collapsible: boolean;
}

function LandingFaqItem({ question, answer, collapsible }: LandingFaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const answerMotion = match(isOpen)
    .with(true, () => ({ height: 'auto', opacity: 1 }))
    .otherwise(() => ({ height: 0, opacity: 0 }));

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  if (!collapsible) {
    return (
      <Item>
        <Question>{question}</Question>
        <Answer>{answer}</Answer>
      </Item>
    );
  }

  return (
    <Item>
      <QuestionButton type="button" onClick={handleToggle} aria-expanded={isOpen}>
        <Question>{question}</Question>
        <Chevron open={isOpen}>&#8964;</Chevron>
      </QuestionButton>
      <CollapsibleAnswer initial={false} animate={answerMotion} transition={{ duration: 0.25, ease: 'easeOut' }} aria-hidden={!isOpen}>
        <Answer>{answer}</Answer>
      </CollapsibleAnswer>
    </Item>
  );
}

export default LandingFaqItem;
