import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { bodyTypography, eyebrowTypography, headingTypography } from '@styles/landingTypography';

const Container = styled.div`
  width: 100%;
  padding: 120px 24px;
  background: #f8f9fa;
  ${colFlex({ align: 'center' })};

  ${mobileMediaQuery} {
    padding: 80px 20px;
  }
`;

const SectionLabel = styled.span`
  margin-bottom: 8px;
  ${eyebrowTypography};
`;

const SectionTitle = styled.h2`
  text-align: center;
  ${headingTypography};
`;

const FaqList = styled.div`
  max-width: 640px;
  width: 100%;
  margin-top: 48px;
`;

const FaqItem = styled.div`
  border-bottom: 1px solid #e5e8eb;
`;

const FaqQuestion = styled.button`
  width: 100%;
  padding: 24px 0;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
`;

const QuestionText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #191f28;

  ${mobileMediaQuery} {
    font-size: 15px;
  }
`;

const Chevron = styled.span<{ open: boolean }>`
  font-size: 18px;
  color: #adb1ba;
  transition: transform 0.2s ease;
  transform: rotate(${({ open }) => (open ? '180deg' : '0deg')});
  flex-shrink: 0;
  margin-left: 16px;
`;

const AnswerText = styled(motion.div)`
  padding-bottom: 24px;
  overflow: hidden;
  ${bodyTypography};
`;

const FAQ_DATA = [
  {
    question: '무료로 사용할 수 있나요?',
    answer: '키오스쿨은 무료로 사용할 수 있습니다. 별도의 장비나 구독료 없이 바로 시작하세요!',
  },
  {
    question: '결제 시스템은 어떻게 되나요?',
    answer:
      '키오스쿨은 주문 접수와 관리에 집중하는 서비스입니다. 결제는 기존 방식(현금, 계좌이체 등)을 그대로 사용하시면 됩니다. 키오스쿨에서 간편한 송금이 가능하도록 기능으로 제공하고있습니다.',
  },
  {
    question: '얼마나 많은 테이블을 등록할 수 있나요?',
    answer: '테이블 수에 제한은 없습니다. 주점 규모에 맞게 자유롭게 설정할 수 있습니다.',
  },
  {
    question: '인터넷 연결이 필요한가요?',
    answer: '네, 실시간 주문 접수와 관리를 위해 인터넷 연결이 필요합니다. 모바일 데이터나 Wi-Fi 모두 사용 가능합니다.',
  },
  {
    question: '축제 당일 문제가 생기면 어떻게 하나요?',
    answer: '운영 중 문제가 발생하면 키오스쿨 인스타를 통해 실시간으로 문의하실 수 있습니다.',
  },
];

function FaqAccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FaqItem>
      <FaqQuestion onClick={() => setIsOpen(!isOpen)}>
        <QuestionText>{question}</QuestionText>
        <Chevron open={isOpen}>&#8964;</Chevron>
      </FaqQuestion>
      <AnimatePresence>
        {isOpen && (
          <AnswerText
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {answer}
          </AnswerText>
        )}
      </AnimatePresence>
    </FaqItem>
  );
}

function InfoFaqSection() {
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ textAlign: 'center' }}
      >
        <SectionLabel>FAQ</SectionLabel>
        <SectionTitle>자주 묻는 질문</SectionTitle>
      </motion.div>
      <FaqList>
        {FAQ_DATA.map((item) => (
          <FaqAccordionItem key={item.question} question={item.question} answer={item.answer} />
        ))}
      </FaqList>
    </Container>
  );
}

export default InfoFaqSection;
