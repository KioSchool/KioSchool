// 후원 모달 디자인 탐색용. 팀이 방향을 정하면 진 브랜치(visual 분기)는 삭제된다.
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import {
  DonationCopy,
  DONATION_COUNT_DISPLAY_MIN,
  DONATION_DAILY_GOAL_COUNT,
  DONATION_DESTINATION_NOTE,
  fillDonationAmount,
} from '@constants/data/customerDonationCopy';
import c1KCoding from '@resources/image/donation/c1-k-coding.webp';
import c2IPainting from '@resources/image/donation/c2-i-painting.webp';
import c5KCoffee from '@resources/image/donation/c5-k-coffee.webp';
import c6TrioCheers from '@resources/image/donation/c6-trio-cheers.webp';

export type DonationVisual = 'plain' | 'character' | 'gauge' | 'bubble';

const CHARACTER_IMAGE_HEIGHT_PX = 96;
const AVATAR_SIZE_PX = 32;
const GAUGE_TRACK_HEIGHT_PX = 7;
const GAUGE_FULL_PERCENT = 100;
const BUBBLE_LABEL_RESERVE_PX = 24;

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
  align-self: flex-start;
  object-fit: contain;
`;

const HeadGroup = styled.div`
  gap: 6px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const Headline = styled.div`
  font-size: 19px;
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
  line-height: 1.4;
  word-break: keep-all;
`;

const DestinationNote = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${Color.KIO_ORANGE_DARK};
  line-height: 1.5;
  word-break: keep-all;
`;

const BodyGroup = styled.div`
  gap: 2px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const SubLineGroup = styled.div`
  gap: 6px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const SubLine = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: ${Color.TEXT_BODY};
  line-height: 1.65;
  word-break: keep-all;
`;

const CountLine = styled.div`
  padding: 8px 10px;
  border-radius: 8px;
  background: ${Color.LIGHT_GREY};
  font-size: 12px;
  color: ${Color.TEXT_BODY};
  text-align: center;
`;

const GaugeBlock = styled.div`
  gap: 6px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const GaugeStatusRow = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'baseline' })};
`;

const GaugeStatusLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: ${Color.MUTED_GREY};
`;

const GaugeStatusValue = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
  font-variant-numeric: tabular-nums;
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
  padding-right: ${BUBBLE_LABEL_RESERVE_PX}px;
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
  const headlineText = fillDonationAmount(copy.headline, amount, copy.amountAnchors);
  const destinationNote = <DestinationNote>{DONATION_DESTINATION_NOTE}</DestinationNote>;
  const subLines = (
    <SubLineGroup>
      {copy.subLines.map((line) => (
        <SubLine key={line}>{fillDonationAmount(line, amount, copy.amountAnchors)}</SubLine>
      ))}
    </SubLineGroup>
  );

  const showCount = todayCount != null && todayCount >= DONATION_COUNT_DISPLAY_MIN;
  const countLine = showCount ? <CountLine>오늘 {todayCount}명이 보탰어요</CountLine> : null;

  if (visual === 'character') {
    const characterSrc = AMOUNT_CHARACTERS[amount] ?? DEFAULT_CHARACTER;
    return (
      <Container>
        <CharacterImage src={characterSrc} alt="키오스쿨 마스코트 캐릭터" />
        <HeadGroup>
          <Headline>{headlineText}</Headline>
          {destinationNote}
        </HeadGroup>
        <BodyGroup>
          {subLines}
          {countLine}
        </BodyGroup>
      </Container>
    );
  }

  if (visual === 'gauge') {
    const rawPercent = ((todayCount ?? 0) / DONATION_DAILY_GOAL_COUNT) * GAUGE_FULL_PERCENT;
    const fillPercent = Math.min(GAUGE_FULL_PERCENT, rawPercent);
    // 목표를 넘기면 "25명 · 20명"이 되어 오류처럼 읽힌다. 넘긴 뒤엔 목표치 대신 달성을 보여준다.
    const goalReached = (todayCount ?? 0) >= DONATION_DAILY_GOAL_COUNT;
    const gaugeStatusValue = goalReached ? `${todayCount}명 · 목표 달성` : `${todayCount}명 · ${DONATION_DAILY_GOAL_COUNT}명`;
    return (
      <Container>
        <HeadGroup>
          <Headline>{headlineText}</Headline>
          {destinationNote}
        </HeadGroup>
        {subLines}
        {todayCount != null && (
          <GaugeBlock>
            <GaugeStatusRow>
              <GaugeStatusLabel>오늘 보탠 사람</GaugeStatusLabel>
              <GaugeStatusValue>{gaugeStatusValue}</GaugeStatusValue>
            </GaugeStatusRow>
            <GaugeTrack>
              <GaugeFill percent={fillPercent} />
            </GaugeTrack>
          </GaugeBlock>
        )}
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
              {destinationNote}
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
      <HeadGroup>
        <Headline>{headlineText}</Headline>
        {destinationNote}
      </HeadGroup>
      <BodyGroup>
        {subLines}
        {countLine}
      </BodyGroup>
    </Container>
  );
}

export default DonationVisualHeader;
