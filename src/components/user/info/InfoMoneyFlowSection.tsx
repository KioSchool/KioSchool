import styled from '@emotion/styled';
import { INFO_SECTION_ID } from '@constants/data/landingContent';
import RevealOnScroll from '@components/user/landing/RevealOnScroll';
import SectionHeading from '@components/user/landing/SectionHeading';
import { LandingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { LandingInner, LandingSection } from '@styles/landingStyles';

const MONEY_NOTES = [
  { title: '키오스쿨은 돈을 받지 않아요', description: '중간에 보관하는 돈이 없고, 키오스쿨에 내는 수수료도 없습니다.' },
  { title: '운영진은 확인만 하면 돼요', description: '입금자명을 확인하고 체크를 누르면 손님 화면도 주문 완료로 바뀝니다.' },
];

const Flow = styled.div`
  margin-top: 72px;
  ${rowFlex({ justify: 'center', align: 'center' })}

  ${mobileMediaQuery} {
    margin-top: 48px;
    ${colFlex({ align: 'stretch' })}
  }
`;

const Node = styled.div`
  width: 260px;
  padding: 32px 28px;
  border: 1px solid ${LandingColor.DARK_LINE};
  border-radius: 16px;
  background: ${LandingColor.DARK_SURFACE};
  text-align: center;

  ${mobileMediaQuery} {
    width: 100%;
  }
`;

const NodeTitle = styled.b`
  display: block;
  font-size: 22px;
`;

const NodeCaption = styled.span`
  display: block;
  margin-top: 8px;
  font-size: 15px;
  color: ${LandingColor.DARK_SUB_TEXT};
`;

const Arrow = styled.div`
  width: 280px;
  font-size: 15px;
  font-weight: 600;
  color: ${LandingColor.ACCENT};
  text-align: center;

  ${mobileMediaQuery} {
    width: auto;
    padding: 18px 0;
  }
`;

const ArrowLine = styled.div`
  position: relative;
  height: 2px;
  margin: 10px 24px 0;
  background: ${LandingColor.ACCENT};

  &::after {
    content: '';
    position: absolute;
    top: -5px;
    right: -2px;
    border: 6px solid transparent;
    border-right: 0;
    border-left: 9px solid ${LandingColor.ACCENT};
  }

  ${mobileMediaQuery} {
    width: 2px;
    height: 28px;
    margin: 10px auto 0;

    &::after {
      top: auto;
      right: auto;
      bottom: -2px;
      left: -5px;
      border: 6px solid transparent;
      border-bottom: 0;
      border-top: 9px solid ${LandingColor.ACCENT};
    }
  }
`;

const Notes = styled.div`
  max-width: 820px;
  margin: 40px auto 0;
  gap: 16px;
  ${rowFlex({ align: 'stretch' })}

  ${mobileMediaQuery} {
    ${colFlex({ align: 'stretch' })}
  }
`;

const Note = styled.div`
  flex: 1;
  padding: 28px;
  border-radius: 12px;
  background: ${LandingColor.DARK_SURFACE};
`;

const NoteTitle = styled.b`
  display: block;
  font-size: 18px;
`;

const NoteDescription = styled.p`
  margin: 8px 0 0;
  font-size: 16px;
  line-height: 1.6;
  color: ${LandingColor.DARK_SUB_TEXT};
`;

function InfoMoneyFlowSection() {
  return (
    <LandingSection id={INFO_SECTION_ID.MONEY} tone="dark">
      <LandingInner>
        <SectionHeading eyebrow="돈 흐름" titleLines={['손님이 보낸 돈은', '주점 계좌로 바로 가요']} centered onDark />
        <RevealOnScroll offsetY={20} delay={0.1}>
          <Flow>
            <Node>
              <NodeTitle>손님 폰</NodeTitle>
              <NodeCaption>메뉴를 고르고 송금</NodeCaption>
            </Node>
            <Arrow>
              토스 · 카카오페이 · 계좌이체
              <ArrowLine />
            </Arrow>
            <Node>
              <NodeTitle>주점 계좌</NodeTitle>
              <NodeCaption>가입할 때 등록한 계좌</NodeCaption>
            </Node>
          </Flow>
        </RevealOnScroll>
        <RevealOnScroll offsetY={20} delay={0.2}>
          <Notes>
            {MONEY_NOTES.map((note) => (
              <Note key={note.title}>
                <NoteTitle>{note.title}</NoteTitle>
                <NoteDescription>{note.description}</NoteDescription>
              </Note>
            ))}
          </Notes>
        </RevealOnScroll>
      </LandingInner>
    </LandingSection>
  );
}

export default InfoMoneyFlowSection;
