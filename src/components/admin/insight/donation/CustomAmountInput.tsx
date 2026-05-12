import { useMemo } from 'react';
import styled from '@emotion/styled';
import { QRCodeSVG } from 'qrcode.react';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { CUSTOM_RANDOM_ILLUSTRATIONS } from './donationConstants';

const Container = styled.div`
  width: 100%;
  min-width: 0;
  gap: 8px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const ToggleHeader = styled.button<{ expanded: boolean }>`
  width: 100%;
  padding: 8px 0;
  background: transparent;
  border: none;
  font-size: 13px;
  font-weight: 600;
  color: ${({ expanded }) => (expanded ? Color.KIO_ORANGE_DARK : Color.GREY)};
  cursor: pointer;
  text-align: left;
`;

const Panel = styled.div`
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 12px;
  background: ${Color.KIO_ORANGE_FAINT};
  border-radius: 8px;
  gap: 10px;
  ${colFlex({ justify: 'start', align: 'center' })};
`;

const Illustration = styled.img`
  width: 100%;
  max-width: 140px;
  aspect-ratio: 1;
  object-fit: contain;
`;

const QrFrame = styled.div`
  padding: 8px;
  background: ${Color.WHITE};
  border-radius: 8px;
  border: 1px solid ${Color.KIO_ORANGE_FAINT};
`;

const Guide = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
  text-align: center;
  line-height: 1.4;
`;

const Placeholder = styled.div`
  font-size: 13px;
  color: ${Color.GREY};
  padding: 12px;
  text-align: center;
`;

function pickRandomIllustration(): string {
  const idx = Math.floor(Math.random() * CUSTOM_RANDOM_ILLUSTRATIONS.length);
  return CUSTOM_RANDOM_ILLUSTRATIONS[idx];
}

interface CustomAmountInputProps {
  expanded: boolean;
  tossAccountUrl: string | undefined;
  onToggle: () => void;
}

function CustomAmountInput({ expanded, tossAccountUrl, onToggle }: CustomAmountInputProps) {
  const illustration = useMemo(() => pickRandomIllustration(), []);

  return (
    <Container>
      <ToggleHeader expanded={expanded} onClick={onToggle} type="button">
        {expanded ? '원하는 만큼 직접 보내기 ▴' : '원하는 만큼 직접 보내기 ▾'}
      </ToggleHeader>
      {expanded && (
        <Panel>
          <Illustration src={illustration} alt="KioSchool 마스코트" />
          {tossAccountUrl ? (
            <QrFrame>
              <QRCodeSVG value={tossAccountUrl} size={180} level="M" bgColor="#ffffff" fgColor="#000000" />
            </QrFrame>
          ) : (
            <Placeholder>도네이션 정보가 설정되지 않았습니다.</Placeholder>
          )}
          <Guide>토스 앱에서 원하는 금액으로 자유롭게 보내세요.</Guide>
        </Panel>
      )}
    </Container>
  );
}

export default CustomAmountInput;
