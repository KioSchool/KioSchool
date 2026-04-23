import styled from '@emotion/styled';
import { RiArrowRightLine, RiQuestionFill } from '@remixicon/react';
import { URLS } from '@constants/urls';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const GuideSection = styled.div`
  width: 100%;
  height: 48px;
  box-shadow: 0px 4px 20px rgba(92, 92, 92, 0.05);
  border-radius: 10px;
  background: linear-gradient(180deg, #fff, #fcfdff);
  border: 1px solid #eef3f7;
  box-sizing: border-box;
  padding: 10px 16px;
  gap: 10px;
  ${rowFlex({ justify: 'flex-start', align: 'center' })}
`;

const GuideSectionText = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #5b616a;
  font-size: 12px;
  line-height: 1.3;
`;

const GuideSectionQuestionText = styled.div`
  color: #5b616a;
  font-size: 12px;
  line-height: 1.3;
`;

const GuideButton = styled.a`
  text-decoration: none;
  color: ${Color.KIO_ORANGE};
  font-weight: 700;
  font-size: 12px;
  background: #fff5ea;
  border: 1px solid #ffd8ac;
  border-radius: 999px;
  padding: 6px 12px;
  line-height: 1;
  transition: all 0.18s ease;
  gap: 4px;
  ${rowFlex({ align: 'center' })}

  &:hover {
    color: ${Color.WHITE};
    background: #ff9d42;
    border-color: #ff9d42;
  }
`;

function NotionGuideSection() {
  return (
    <GuideSection>
      <GuideSectionText>
        <RiQuestionFill size={14} />
        <GuideSectionQuestionText>더 궁금한 정보가 있으신가요?</GuideSectionQuestionText>
      </GuideSectionText>
      <GuideButton href={URLS.EXTERNAL.NOTION_FAQ} target="_blank" rel="noopener noreferrer">
        <RiArrowRightLine size={14} />
        가이드 열기
      </GuideButton>
    </GuideSection>
  );
}

export default NotionGuideSection;
