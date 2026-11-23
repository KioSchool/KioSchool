import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { INFO_SECTION_ID } from '@constants/data/landingContent';
import SectionHeading from '@components/user/landing/SectionHeading';
import ahyoung from '@resources/image/info/ahyoung.webp';
import jin from '@resources/image/info/jin.webp';
import jiwon from '@resources/image/info/jiwon.webp';
import sungjong from '@resources/image/info/sungjong.webp';
import { LandingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { LandingInner, LandingSection } from '@styles/landingStyles';
import TeamMemberCard from './TeamMemberCard';

const TEAM_MEMBERS = [
  { photo: jin, name: '박지인', role: '리더 · 백엔드', bio: '안정적인 서비스를 설계합니다' },
  { photo: sungjong, name: '이성종', role: '프론트엔드 리드', bio: '사용자 경험을 개선합니다' },
  { photo: jiwon, name: '정지원', role: '프론트엔드', bio: '사용자 경험을 개선합니다' },
  { photo: ahyoung, name: '서아영', role: '디자인', bio: '화면의 복잡함을 덜어냅니다' },
];

const VISION_PARAGRAPHS = [
  '키오스쿨은 대학 축제 주점 운영의 불편함에서 시작했습니다. 수기 주문, 수동 정산, 부족한 인력 때문에 축제를 준비한 학생들이 정작 축제를 즐기지 못하는 문제를 해결하고 싶었습니다.',
  '운영의 부담은 키오스쿨이 덜고, 축제를 준비한 사람도 축제를 즐길 수 있는 환경을 만들어 가고 있습니다.',
];

const Vision = styled.div`
  gap: 80px;
  ${rowFlex({ align: 'flex-start' })}

  ${mobileMediaQuery} {
    gap: 24px;
    ${colFlex({ align: 'stretch' })}
  }
`;

const VisionHeading = styled.div`
  width: 460px;
  flex: none;

  ${mobileMediaQuery} {
    width: 100%;
  }
`;

const VisionText = styled(motion.div)`
  flex: 1;
  gap: 16px;
  ${colFlex()}
`;

const VisionParagraph = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 1.7;
  color: ${LandingColor.SUB_TEXT};

  ${mobileMediaQuery} {
    font-size: 16px;
  }
`;

const Members = styled.div`
  margin-top: 72px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  ${mobileMediaQuery} {
    margin-top: 40px;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
`;

function InfoTeamSection() {
  return (
    <LandingSection id={INFO_SECTION_ID.TEAM} tone="white">
      <LandingInner>
        <Vision>
          <VisionHeading>
            <SectionHeading eyebrow="만든 사람들" titleLines={['모든 대학 축제가', '즐거운 경험이 되도록']} />
          </VisionHeading>
          <VisionText
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            {VISION_PARAGRAPHS.map((paragraph) => (
              <VisionParagraph key={paragraph}>{paragraph}</VisionParagraph>
            ))}
          </VisionText>
        </Vision>
        <Members>
          {TEAM_MEMBERS.map((member, index) => (
            <TeamMemberCard key={member.name} order={index} photo={member.photo} name={member.name} role={member.role} bio={member.bio} />
          ))}
        </Members>
      </LandingInner>
    </LandingSection>
  );
}

export default InfoTeamSection;
