import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { DonationCopy, fillDonationAmount } from '@constants/data/customerDonationCopy';
import { resolveDonationCountText } from '@utils/donation';
import c1KCoding from '@resources/image/donation/c1-k-coding.webp';
import c7KWater from '@resources/image/donation/c7-k-water.webp';
import c8KRiceBall from '@resources/image/donation/c8-k-rice-ball.webp';
import c9KCoffee from '@resources/image/donation/c9-k-coffee.webp';

const CHARACTER_IMAGE_HEIGHT_PX = 112;

const AMOUNT_CHARACTERS: Record<number, string> = {
  1000: c7KWater,
  2000: c8KRiceBall,
  5000: c9KCoffee,
};
const DEFAULT_CHARACTER = c1KCoding;

const Container = styled.div`
  gap: 10px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const CharacterImage = styled.img`
  height: ${CHARACTER_IMAGE_HEIGHT_PX}px;
  align-self: center;
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
  note: string;
  amount: number;
  todayCount: number | null;
  titleId?: string;
}

function DonationVisualHeader({ copy, note, amount, todayCount, titleId }: DonationVisualHeaderProps) {
  const headlineText = fillDonationAmount(copy.headline, amount, copy);
  const characterSrc = AMOUNT_CHARACTERS[amount] ?? DEFAULT_CHARACTER;
  const countText = resolveDonationCountText(todayCount);

  return (
    <Container>
      <CharacterImage src={characterSrc} alt="키오스쿨 마스코트 캐릭터" />
      <HeadGroup>
        <Headline id={titleId}>{headlineText}</Headline>
        <DestinationNote>{note}</DestinationNote>
      </HeadGroup>
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
