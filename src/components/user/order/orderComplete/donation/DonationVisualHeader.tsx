import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { DonationCopy, fillDonationAmount } from '@constants/data/customerDonationCopy';
import { resolveDonationCountText } from '@utils/donation';
import c1KCoding from '@resources/image/donation/c1-k-coding.webp';
import c2IPainting from '@resources/image/donation/c2-i-painting.webp';
import c4IFlag from '@resources/image/donation/c4-i-flag.webp';
import c5KCoffee from '@resources/image/donation/c5-k-coffee.webp';

const CHARACTER_IMAGE_HEIGHT_PX = 96;

// TODO(후속): 생수/삼각김밥/커피에 맞는 전용 일러스트로 교체
const AMOUNT_CHARACTERS: Record<number, string> = {
  1000: c4IFlag,
  2000: c2IPainting,
  5000: c5KCoffee,
};
const DEFAULT_CHARACTER = c1KCoding;

const Container = styled.div`
  gap: 10px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const CharacterImage = styled.img`
  height: ${CHARACTER_IMAGE_HEIGHT_PX}px;
  align-self: flex-start;
  object-fit: contain;
`;

const Headline = styled.div`
  font-size: 19px;
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
  line-height: 1.4;
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
  padding: 9px 12px;
  border-radius: 8px;
  background: ${Color.KIO_ORANGE_FAINT};
  font-size: 13px;
  font-weight: 600;
  color: ${Color.KIO_ORANGE_DARK};
  text-align: center;
`;

interface DonationVisualHeaderProps {
  copy: DonationCopy;
  amount: number;
  todayCount: number | null;
}

function DonationVisualHeader({ copy, amount, todayCount }: DonationVisualHeaderProps) {
  const headlineText = fillDonationAmount(copy.headline, amount, copy);
  const characterSrc = AMOUNT_CHARACTERS[amount] ?? DEFAULT_CHARACTER;
  const countText = resolveDonationCountText(todayCount);

  return (
    <Container>
      <CharacterImage src={characterSrc} alt="키오스쿨 마스코트 캐릭터" />
      <Headline>{headlineText}</Headline>
      <BodyGroup>
        <SubLineGroup>
          {copy.subLines.map((line) => (
            <SubLine key={line}>{fillDonationAmount(line, amount, copy)}</SubLine>
          ))}
        </SubLineGroup>
        {countText && <CountLine>{countText}</CountLine>}
      </BodyGroup>
    </Container>
  );
}

export default DonationVisualHeader;
