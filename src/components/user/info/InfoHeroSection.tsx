import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { INFO_SECTION_ID, LANDING_STATS } from '@constants/data/landingContent';
import CountUpValue from '@components/user/landing/CountUpValue';
import LandingStartButton from '@components/user/landing/LandingStartButton';
import ProductShot from '@components/user/landing/ProductShot';
import RevealOnScroll from '@components/user/landing/RevealOnScroll';
import dashboard from '@resources/image/landing/dashboard.webp';
import { LandingColor } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { LandingInner, landingEyebrowTypography, landingLeadTypography } from '@styles/landingStyles';
import { DEMO_ENTRY } from '@constants/analytics';
import LandingDemoButton from '@components/user/landing/LandingDemoButton';

const DASHBOARD_RATIO = 2360 / 1380;

const TABLE_OF_CONTENTS = [
  { id: INFO_SECTION_ID.ORDER, label: '손님 주문' },
  { id: INFO_SECTION_ID.PROCESS, label: '주문 처리' },
  { id: INFO_SECTION_ID.TABLE, label: '테이블' },
  { id: INFO_SECTION_ID.LAYOUT, label: '테이블 배치' },
  { id: INFO_SECTION_ID.MENU, label: '메뉴와 주점' },
  { id: INFO_SECTION_ID.SETTLEMENT, label: '정산과 기록' },
  { id: INFO_SECTION_ID.MONEY, label: '돈 흐름' },
  { id: INFO_SECTION_ID.PREPARATION, label: '준비물' },
  { id: INFO_SECTION_ID.TEAM, label: '만든 사람들' },
];

const Section = styled.section`
  width: 100%;
  padding: 140px 0 0;
  background: #ffffff;
  color: ${LandingColor.TEXT};
  text-align: center;

  ${mobileMediaQuery} {
    padding-top: 100px;
  }
`;

const Content = styled(motion.div)``;

const Eyebrow = styled.div`
  ${landingEyebrowTypography}
`;

const Title = styled.h1`
  margin: 0;
  font-size: 56px;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.02em;
  white-space: pre-line;

  ${mobileMediaQuery} {
    font-size: 34px;
  }
`;

const Lead = styled.p`
  ${landingLeadTypography}
  white-space: pre-line;
`;

const Buttons = styled.div`
  margin-top: 36px;
  gap: 10px;
  ${rowFlex({ justify: 'center', align: 'center' })}

  ${mobileMediaQuery} {
    & > * {
      flex: 1;
    }
  }
`;

const TableOfContents = styled.nav`
  margin-top: 28px;
  flex-wrap: wrap;
  gap: 6px 22px;
  ${rowFlex({ justify: 'center', align: 'center' })}

  ${mobileMediaQuery} {
    gap: 6px 14px;
  }
`;

const TableOfContentsLink = styled.a`
  font-size: 15px;
  font-weight: 600;
  color: ${LandingColor.SUB_TEXT};
  text-decoration: underline;
  text-underline-offset: 5px;
  text-decoration-color: ${LandingColor.OUTLINE};

  ${mobileMediaQuery} {
    font-size: 14px;
  }
`;

const Visual = styled.div`
  margin-top: 64px;

  ${mobileMediaQuery} {
    margin-top: 40px;
  }
`;

const Stats = styled.div`
  margin-top: 56px;
  ${rowFlex({ align: 'flex-start' })}

  ${mobileMediaQuery} {
    margin-top: 36px;
    flex-wrap: wrap;
    row-gap: 24px;
  }
`;

const Stat = styled.div`
  flex: 1;

  ${mobileMediaQuery} {
    flex: 1 1 50%;
  }
`;

const StatValue = styled.div`
  ${rowFlex({ justify: 'center', align: 'baseline' })}
`;

const Value = styled(CountUpValue)`
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.02em;

  ${mobileMediaQuery} {
    font-size: 28px;
  }
`;

const Unit = styled.span`
  margin-left: 2px;
  font-size: 20px;
  font-weight: 700;
  color: ${LandingColor.ACCENT_TEXT};
`;

const StatLabel = styled.p`
  margin: 4px 0 0;
  font-size: 15px;
  color: ${LandingColor.SUB_TEXT};
`;

function InfoHeroSection() {
  return (
    <Section>
      <LandingInner>
        <Content initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
          <Eyebrow>키오스쿨 소개</Eyebrow>
          <Title>{'대학 축제 주점을 위한\nQR 주문 서비스'}</Title>
          <Lead>{'손님 주문부터 입금 확인, 테이블 시간, 마감 정산까지\n키오스쿨로 할 수 있는 일을 하나씩 소개합니다.'}</Lead>
          <Buttons>
            <LandingStartButton location="info_hero" />
            <LandingDemoButton entry={DEMO_ENTRY.INFO} variant="outline" />
          </Buttons>
          <TableOfContents aria-label="소개 목차">
            {TABLE_OF_CONTENTS.map((item) => (
              <TableOfContentsLink key={item.id} href={`#${item.id}`}>
                {item.label}
              </TableOfContentsLink>
            ))}
          </TableOfContents>
        </Content>
        <Visual>
          <RevealOnScroll offsetY={30} delay={0.2}>
            <ProductShot src={dashboard} alt="주점 대시보드와 손님 메뉴 미리보기" ratio={DASHBOARD_RATIO} />
          </RevealOnScroll>
        </Visual>
        <Stats>
          {LANDING_STATS.map((stat) => (
            <Stat key={stat.label}>
              <StatValue>
                <Value value={stat.value} format={stat.format} />
                <Unit>{stat.unit}</Unit>
              </StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </Stat>
          ))}
        </Stats>
      </LandingInner>
    </Section>
  );
}

export default InfoHeroSection;
