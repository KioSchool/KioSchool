import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import CountUpValue from '@components/user/landing/CountUpValue';
import SectionHeading from '@components/user/landing/SectionHeading';
import { LandingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { LandingInner, LandingSection } from '@styles/landingStyles';

const PAIN_POINTS = [
  { value: 5, unit: '명+', label: '수기 운영 시 필요한 추가 인력' },
  { value: 2, unit: 'h+', label: '수기 정산 소요 시간' },
  { value: 10, unit: '건+', label: '하루 평균 주문 누락' },
];
const ITEM_STAGGER_SECONDS = 0.15;

const Items = styled.div`
  margin-top: 64px;
  gap: 96px;
  ${rowFlex({ justify: 'center', align: 'flex-start' })}

  ${mobileMediaQuery} {
    margin-top: 48px;
    gap: 40px;
    ${colFlex({ align: 'center' })}
  }
`;

const Item = styled(motion.div)`
  width: 220px;
  ${colFlex({ align: 'center' })}
`;

const Figure = styled.div`
  ${rowFlex({ justify: 'center', align: 'baseline' })}
`;

const Value = styled(CountUpValue)`
  font-size: 72px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;

  ${mobileMediaQuery} {
    font-size: 56px;
  }
`;

const Unit = styled.span`
  margin-left: 4px;
  font-size: 32px;
  font-weight: 700;
  color: ${LandingColor.ACCENT};

  ${mobileMediaQuery} {
    font-size: 26px;
  }
`;

const Label = styled.p`
  margin: 14px 0 0;
  font-size: 16px;
  color: ${LandingColor.DARK_SUB_TEXT};
`;

const Note = styled.div`
  margin-top: 56px;
  font-size: 13px;
  color: ${LandingColor.DARK_CAPTION};
  text-align: center;
`;

function PainPointSection() {
  return (
    <LandingSection tone="dark">
      <LandingInner>
        <SectionHeading titleLines={['축제 운영, 아직도 이렇게 하고 계신가요?']} centered onDark />
        <Items>
          {PAIN_POINTS.map((point, index) => (
            <Item
              key={point.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * ITEM_STAGGER_SECONDS }}
            >
              <Figure>
                <Value value={point.value} />
                <Unit>{point.unit}</Unit>
              </Figure>
              <Label>{point.label}</Label>
            </Item>
          ))}
        </Items>
        <Note>키오스쿨 사용자 인터뷰 기반</Note>
      </LandingInner>
    </LandingSection>
  );
}

export default PainPointSection;
