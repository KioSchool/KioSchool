import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { Color } from '@resources/colors';

const Card = styled.div`
  flex: 1;
  min-width: 0;
  padding: 28px;
  border-radius: 20px;
  background: ${Color.WHITE};
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.05);
  -webkit-font-smoothing: antialiased;
  word-break: keep-all;
  gap: 16px;
  ${colFlex({})};

  ${mobileMediaQuery} {
    padding: 20px;
    gap: 12px;
  }
`;

const Header = styled.div`
  gap: 12px;
  ${rowFlex({ align: 'center' })};
`;

const PROFILE_STYLES = [
  { background: 'rgba(255, 145, 66, 0.12)', color: '#FF9142' },
  { background: 'rgba(70, 173, 255, 0.12)', color: '#46ADFF' },
  { background: 'rgba(12, 175, 96, 0.12)', color: '#0CAF60' },
  { background: 'rgba(255, 90, 90, 0.12)', color: '#FF5A5A' },
  { background: 'rgba(157, 120, 255, 0.12)', color: '#9D78FF' },
];

const ProfileCircle = styled.div<{ colorIndex: number }>`
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 50%;
  background: ${({ colorIndex }) => PROFILE_STYLES[colorIndex % PROFILE_STYLES.length].background};
  font-size: 14px;
  font-weight: 600;
  color: ${({ colorIndex }) => PROFILE_STYLES[colorIndex % PROFILE_STYLES.length].color};
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const Name = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #3c3530;
`;

const Text = styled.p`
  font-size: 15px;
  color: #78706a;
  line-height: 1.6;
  margin: 0;

  ${mobileMediaQuery} {
    font-size: 14px;
  }
`;

const NameGroup = styled.div`
  ${colFlex({})};
`;

const EventLabel = styled.span`
  font-size: 10px;
  color: #adb1ba;
`;

const Timestamp = styled.span`
  font-size: 10px;
  color: #adb1ba;
`;

interface ReviewChatProps {
  name: string;
  text: string;
  index: number;
  event: string;
  time: string;
}

function ReviewChat({ name, text, index, event, time }: ReviewChatProps) {
  const initial = name.charAt(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
    >
      <Card>
        <Header>
          <ProfileCircle colorIndex={index}>{initial}</ProfileCircle>
          <NameGroup>
            <Name>{name}</Name>
            <EventLabel>{event}</EventLabel>
          </NameGroup>
        </Header>
        <Text>{text}</Text>
        <Timestamp>{time}</Timestamp>
      </Card>
    </motion.div>
  );
}

export default ReviewChat;
