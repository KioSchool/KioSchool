// 후원 모달 디자인 탐색용. 팀이 방향을 정하면 진 브랜치(visual 분기)는 삭제된다.
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { DonationCopy, DONATION_COUNT_DISPLAY_MIN, DONATION_DAILY_GOAL_COUNT, fillDonationAmount } from '@constants/data/customerDonationCopy';
import c1KCoding from '@resources/image/donation/c1-k-coding.webp';
import c2IPainting from '@resources/image/donation/c2-i-painting.webp';
import c5KCoffee from '@resources/image/donation/c5-k-coffee.webp';
import c6TrioCheers from '@resources/image/donation/c6-trio-cheers.webp';

export type DonationVisual = 'plain' | 'character' | 'gauge' | 'bubble';

const CHARACTER_IMAGE_HEIGHT_PX = 96;
const AVATAR_SIZE_PX = 32;
const GAUGE_TRACK_HEIGHT_PX = 7;
const GAUGE_FULL_PERCENT = 100;

const DEFAULT_CHARACTER = c1KCoding;
const AMOUNT_CHARACTERS: Record<number, string> = {
  1000: c5KCoffee,
  2000: c2IPainting,
  5000: c6TrioCheers,
};

const Container = styled.div`
  gap: 10px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const CharacterImage = styled.img`
  height: ${CHARACTER_IMAGE_HEIGHT_PX}px;
  object-fit: contain;
`;

const Headline = styled.div`
  padding-right: 24px;
  font-size: 16px;
  font-weight: 600;
  color: ${Color.BLACK};
  line-height: 1.45;
  word-break: keep-all;
`;

const SubLineGroup = styled.div`
  gap: 6px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const SubLine = styled.div`
  font-size: 13px;
  color: ${Color.GREY};
  line-height: 1.65;
  word-break: keep-all;
`;

const CountLine = styled.div`
  padding: 8px 10px;
  border-radius: 8px;
  background: ${Color.LIGHT_GREY};
  font-size: 12px;
  color: ${Color.GREY};
  text-align: center;
`;

const GaugeTrack = styled.div`
  width: 100%;
  height: ${GAUGE_TRACK_HEIGHT_PX}px;
  border-radius: 4px;
  background: ${Color.LIGHT_GREY};
  overflow: hidden;
`;

const GaugeFill = styled.div<{ percent: number }>`
  width: ${({ percent }) => `${percent}%`};
  height: 100%;
  border-radius: 4px;
  background: ${Color.KIO_ORANGE};
`;

const BubbleRow = styled.div`
  gap: 10px;
  ${rowFlex({ justify: 'flex-start', align: 'flex-start' })};
`;

const Avatar = styled.img`
  width: ${AVATAR_SIZE_PX}px;
  height: ${AVATAR_SIZE_PX}px;
  flex-shrink: 0;
  border-radius: 50%;
  object-fit: cover;
`;

const BubbleColumn = styled.div`
  gap: 4px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const BubbleLabel = styled.div`
  font-size: 11px;
  color: ${Color.MUTED_GREY};
`;

const SpeechBubble = styled.div`
  padding: 10px 12px;
  border-radius: 3px 12px 12px 12px;
  background: ${Color.LIGHT_GREY};
  gap: 6px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

interface DonationVisualHeaderProps {
  visual: DonationVisual;
  copy: DonationCopy;
  amount: number;
  todayCount: number | null;
}

function DonationVisualHeader({ visual, copy, amount, todayCount }: DonationVisualHeaderProps) {
  const headlineText = fillDonationAmount(copy.headline, amount);
  const subLines = (
    <SubLineGroup>
      {copy.subLines.map((line) => (
        <SubLine key={line}>{fillDonationAmount(line, amount)}</SubLine>
      ))}
    </SubLineGroup>
  );

  const showCount = todayCount != null && todayCount >= DONATION_COUNT_DISPLAY_MIN;
  const countLine = showCount ? <CountLine>오늘 {todayCount}명이 키오스쿨과 함께했어요</CountLine> : null;

  if (visual === 'character') {
    const characterSrc = AMOUNT_CHARACTERS[amount] ?? DEFAULT_CHARACTER;
    return (
      <Container>
        <CharacterImage src={characterSrc} alt="키오스쿨 마스코트 캐릭터" />
        <Headline>{headlineText}</Headline>
        {subLines}
        {countLine}
      </Container>
    );
  }

  if (visual === 'gauge') {
    const gaugeHeadline = todayCount != null ? `오늘 ${todayCount}명이 보탰어요` : headlineText;
    const rawPercent = ((todayCount ?? 0) / DONATION_DAILY_GOAL_COUNT) * GAUGE_FULL_PERCENT;
    const fillPercent = Math.min(GAUGE_FULL_PERCENT, rawPercent);
    return (
      <Container>
        <Headline>{gaugeHeadline}</Headline>
        <GaugeTrack>
          <GaugeFill percent={fillPercent} />
        </GaugeTrack>
        {subLines}
      </Container>
    );
  }

  if (visual === 'bubble') {
    return (
      <Container>
        <BubbleRow>
          <Avatar src={DEFAULT_CHARACTER} alt="키오스쿨을 만든 학생" />
          <BubbleColumn>
            <BubbleLabel>키오스쿨 만든 학생</BubbleLabel>
            <SpeechBubble>
              <Headline>{headlineText}</Headline>
              {subLines}
            </SpeechBubble>
          </BubbleColumn>
        </BubbleRow>
        {countLine}
      </Container>
    );
  }

  return (
    <Container>
      <Headline>{headlineText}</Headline>
      {subLines}
      {countLine}
    </Container>
  );
}

export default DonationVisualHeader;
