import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { captionTypography, eyebrowTypography, headingTypography } from '@styles/landingTypography';
import { Color } from '@resources/colors';

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

const ProfileCircle = styled.div<{ bgColor: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ bgColor }) => bgColor};
  font-size: 24px;
  font-weight: 700;
  color: ${Color.WHITE};
  margin-bottom: 16px;
  ${colFlex({ justify: 'center', align: 'center' })};
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

const PROFILE_COLORS = ['#FF9142', '#46ADFF', '#0CAF60', '#9D78FF', '#FF5A5A'];

// TODO 팀원 데이터 — 실제 데이터로 교체 필요
const TEAM_MEMBERS = [
  { name: '멤버 2', role: 'Backend', bio: '안정적인 서비스를 설계합니다' },
  { name: '멤버 1', role: 'Frontend', bio: '사용자 경험을 만듭니다' },
  { name: '멤버 4', role: 'Frontend', bio: '사용자 경험을 만듭니다' },
  { name: '멤버 3', role: 'Design', bio: '직관적인 인터페이스를 그립니다' },
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
              <ProfileCircle bgColor={PROFILE_COLORS[index % PROFILE_COLORS.length]}>{member.name.charAt(0)}</ProfileCircle>
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
