import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { LandingColor } from '@resources/colors';
import { mobileMediaQuery } from '@styles/globalStyles';

const CARD_STAGGER_SECONDS = 0.1;

const Card = styled(motion.div)`
  width: 100%;
`;

const Photo = styled.img`
  width: 100%;
  aspect-ratio: 3 / 4;
  display: block;
  border-radius: 16px;
  background: ${LandingColor.SURFACE};
  object-fit: cover;
`;

const Name = styled.h3`
  margin: 20px 0 0;
  font-size: 20px;
  font-weight: 700;

  ${mobileMediaQuery} {
    font-size: 17px;
  }
`;

const Role = styled.div`
  margin-top: 4px;
  font-size: 15px;
  font-weight: 600;
  color: ${LandingColor.ACCENT_TEXT};

  ${mobileMediaQuery} {
    font-size: 14px;
  }
`;

const Bio = styled.p`
  margin: 6px 0 0;
  font-size: 16px;
  color: ${LandingColor.SUB_TEXT};

  ${mobileMediaQuery} {
    font-size: 14px;
  }
`;

interface TeamMemberCardProps {
  order: number;
  photo: string;
  name: string;
  role: string;
  bio: string;
}

function TeamMemberCard({ order, photo, name, role, bio }: TeamMemberCardProps) {
  return (
    <Card
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: order * CARD_STAGGER_SECONDS }}
    >
      <Photo src={photo} alt={`${name} 사진`} loading="lazy" />
      <Name>{name}</Name>
      <Role>{role}</Role>
      <Bio>{bio}</Bio>
    </Card>
  );
}

export default TeamMemberCard;
