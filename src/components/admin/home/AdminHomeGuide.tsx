import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { RiArrowRightSLine, RiChat3Line, RiInstagramLine, RiQuestionLine } from '@remixicon/react';
import { Color, OnboardingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { URLS } from '@constants/urls';
import { USER_ROUTES } from '@constants/routes';

const Container = styled.section`
  width: 100%;
  margin-top: 48px;
  gap: 16px;
  ${colFlex()}
`;

const SectionTitle = styled.h2`
  margin: 0;
  color: ${Color.TEXT_STRONG};
  font-size: 18px;
  font-weight: 700;
`;

const CardList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  ${mobileMediaQuery} {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const cardStyle = `
  box-sizing: border-box;
  min-width: 0;
  padding: 16px;
  gap: 14px;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 14px;
  background: ${Color.WHITE};
  text-decoration: none;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: ${Color.KIO_ORANGE};
    background: ${OnboardingColor.STEP_ACTIVE_BG};
  }

  &:focus-visible {
    outline: 2px solid ${Color.KIO_ORANGE};
    outline-offset: 2px;
  }
`;

const ExternalCard = styled.a`
  ${cardStyle}
  ${rowFlex({ align: 'center' })}
`;

const InternalCard = styled(Link)`
  ${cardStyle}
  ${rowFlex({ align: 'center' })}
`;

const IconTile = styled.div`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  color: ${Color.KIO_ORANGE};
  background: ${Color.KIO_ORANGE_FAINT};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const TextGroup = styled.div`
  min-width: 0;
  flex-grow: 1;
  gap: 4px;
  ${colFlex()}
`;

const CardTitle = styled.div`
  color: ${Color.TEXT_STRONG};
  font-size: 15px;
  font-weight: 700;
`;

const CardDescription = styled.div`
  color: ${OnboardingColor.SUBTLE_TEXT};
  font-size: 13px;
  line-height: 1.4;
`;

const Arrow = styled(RiArrowRightSLine)`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: ${OnboardingColor.MUTED_TEXT};
`;

function AdminHomeGuide() {
  return (
    <Container>
      <SectionTitle>운영에 도움이 되는 자료</SectionTitle>
      <CardList>
        <ExternalCard href={URLS.EXTERNAL.NOTION_FAQ} target="_blank" rel="noopener noreferrer">
          <IconTile>
            <RiQuestionLine size={24} aria-hidden="true" />
          </IconTile>
          <TextGroup>
            <CardTitle>자주 묻는 질문</CardTitle>
            <CardDescription>운영하며 자주 받는 질문을 모았어요</CardDescription>
          </TextGroup>
          <Arrow aria-hidden="true" />
        </ExternalCard>
        <InternalCard to={USER_ROUTES.CONTACT}>
          <IconTile>
            <RiChat3Line size={24} aria-hidden="true" />
          </IconTile>
          <TextGroup>
            <CardTitle>문의하기</CardTitle>
            <CardDescription>해결되지 않는 문제는 바로 물어보세요</CardDescription>
          </TextGroup>
          <Arrow aria-hidden="true" />
        </InternalCard>
        <ExternalCard href={URLS.EXTERNAL.INSTAGRAM} target="_blank" rel="noopener noreferrer">
          <IconTile>
            <RiInstagramLine size={24} aria-hidden="true" />
          </IconTile>
          <TextGroup>
            <CardTitle>키오스쿨 소식</CardTitle>
            <CardDescription>업데이트와 공지를 인스타그램에서 확인해보세요</CardDescription>
          </TextGroup>
          <Arrow aria-hidden="true" />
        </ExternalCard>
      </CardList>
    </Container>
  );
}

export default AdminHomeGuide;
