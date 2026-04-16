import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { captionTypography, eyebrowTypography, headingTypography } from '@styles/landingTypography';
import { Color } from '@resources/colors';
import ahyoung from '@resources/image/info/ahyoung.webp';
import jiwon from '@resources/image/info/jiwon.webp';
import sungjong from '@resources/image/info/sungjong.webp';
import jin from '@resources/image/info/jin.webp';

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

const TeamGrid = styled.div`
  margin-top: 48px;
  gap: 32px;
  flex-wrap: wrap;
  ${rowFlex({ justify: 'center' })};

  ${mobileMediaQuery} {
    gap: 24px;
  }
`;

const MemberCard = styled.div`
  width: 160px;
  text-align: center;
  ${colFlex({ align: 'center' })};
`;

const ProfileCircle = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 30%;
  margin-bottom: 16px;
  overflow: hidden;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MemberName = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #191f28;
`;

const MemberRole = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${Color.KIO_ORANGE};
  margin-top: 4px;
`;

const MemberBio = styled.span`
  margin-top: 6px;
  ${captionTypography};
`;

const TEAM_MEMBERS = [
  { name: '박지인', role: 'Backend', bio: '안정적인 서비스를 설계합니다', image: jin },
  { name: '정지원', role: 'Frontend', bio: '사용자 경험을 개선합니다', image: jiwon },
  { name: '이성종', role: 'Frontend', bio: '사용자 경험을 개선합니다', image: sungjong },
  { name: '서아영', role: 'Design', bio: '화면의 복잡함을 덜어냅니다', image: ahyoung },
];

function InfoTeamSection() {
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ textAlign: 'center' }}
      >
        <SectionLabel>TEAM</SectionLabel>
        <SectionTitle>만든 사람들</SectionTitle>
      </motion.div>
      <TeamGrid>
        {TEAM_MEMBERS.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
          >
            <MemberCard>
              <ProfileCircle>
                <ProfileImage src={member.image} alt={`${member.name} 프로필`} />
              </ProfileCircle>
              <MemberName>{member.name}</MemberName>
              <MemberRole>{member.role}</MemberRole>
              <MemberBio>{member.bio}</MemberBio>
            </MemberCard>
          </motion.div>
        ))}
      </TeamGrid>
    </Container>
  );
}

export default InfoTeamSection;
