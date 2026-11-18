import styled from '@emotion/styled';
import { LandingColor } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

const Card = styled.div`
  height: 100%;
  padding: 40px;
  border-radius: 16px;
  background: ${LandingColor.SURFACE};
  ${colFlex()}

  ${mobileMediaQuery} {
    padding: 28px;
  }
`;

const Quote = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 1.6;
  color: ${LandingColor.TEXT};

  ${mobileMediaQuery} {
    font-size: 16px;
  }
`;

const Author = styled.div`
  margin-top: auto;
  padding-top: 40px;
  font-size: 15px;
  color: ${LandingColor.CAPTION};
`;

const Name = styled.b`
  display: block;
  margin-bottom: 4px;
  color: ${LandingColor.TEXT};
`;

interface ReviewCardProps {
  name: string;
  event: string;
  text: string;
}

function ReviewCard({ name, event, text }: ReviewCardProps) {
  return (
    <Card>
      <Quote>“{text}”</Quote>
      <Author>
        <Name>{name}</Name>
        {event}
      </Author>
    </Card>
  );
}

export default ReviewCard;
