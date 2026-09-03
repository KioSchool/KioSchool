import styled from '@emotion/styled';
import { RiArrowRightUpLine, RiQuestionAnswerLine } from '@remixicon/react';
import { URLS } from '@constants/urls';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

const Card = styled.a`
  width: 100%;
  padding: 24px 28px;
  border: 1px solid #ffe0c7;
  border-radius: 20px;
  box-sizing: border-box;
  background: ${Color.KIO_ORANGE_FAINT};
  color: ${Color.BLACK};
  text-decoration: none;
  gap: 16px;
  transition: border-color 0.2s ease, transform 0.2s ease;
  ${rowFlex({ align: 'center' })};

  &:hover {
    border-color: ${Color.KIO_ORANGE};
    transform: translateY(-2px);
  }

  ${mobileMediaQuery} {
    padding: 20px;
  }
`;

const IconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  flex-shrink: 0;
  background: ${Color.WHITE};
  color: ${Color.KIO_ORANGE};
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const TextGroup = styled.div`
  flex: 1;
  min-width: 0;
  gap: 4px;
  ${colFlex()};
`;

const Title = styled.strong`
  font-size: 17px;
  line-height: 1.4;
`;

const Description = styled.span`
  color: ${Color.GREY};
  font-size: 14px;
  line-height: 1.5;
`;

const ArrowIcon = styled(RiArrowRightUpLine)`
  flex-shrink: 0;
  color: ${Color.KIO_ORANGE};
`;

function ContactFaqCard() {
  return (
    <Card href={URLS.EXTERNAL.NOTION_FAQ} target="_blank" rel="noopener noreferrer">
      <IconBox>
        <RiQuestionAnswerLine size={24} />
      </IconBox>
      <TextGroup>
        <Title>자주 묻는 질문 먼저 확인하기</Title>
        <Description>문의 전에 FAQ에서 더 빠르게 답을 찾을 수 있어요.</Description>
      </TextGroup>
      <ArrowIcon size={22} aria-hidden="true" />
    </Card>
  );
}

export default ContactFaqCard;
