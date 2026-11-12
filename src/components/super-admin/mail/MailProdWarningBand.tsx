import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { RiAlertFill } from '@remixicon/react';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const PRODUCTION_ENVIRONMENT = 'production';
const LABEL = '운영 서버';
const ICON_SIZE = 16;
const REPEAT_COUNT = 20;
const REPEATED_LABEL_KEYS = Array.from({ length: REPEAT_COUNT }, (_, index) => index);

// 같은 글자가 두 벌 이어져 있어 절반만큼 움직인 뒤 처음으로 돌아가면 끊겨 보이지 않는다
const flow = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;

const Band = styled.div`
  width: 100%;
  height: 36px;
  margin-bottom: 16px;
  overflow: hidden;
  border-radius: 8px;
  background: ${Color.RED};
  color: ${Color.WHITE};
  font-size: 14px;
  font-weight: 700;
`;

const Track = styled.div`
  width: max-content;
  height: 100%;
  animation: ${flow} 60s linear infinite;
  ${rowFlex({ align: 'center' })}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Item = styled.span`
  padding: 0 120px;
  gap: 6px;
  white-space: nowrap;
  ${rowFlex({ align: 'center' })}
`;

// VITE_ENVIRONMENT는 API 주소와 같은 설정 파일에서 정해져 화면이 붙은 서버와 항상 같다
function MailProdWarningBand() {
  if (import.meta.env.VITE_ENVIRONMENT !== PRODUCTION_ENVIRONMENT) return null;

  return (
    <Band role="status" aria-label={LABEL}>
      <Track aria-hidden="true">
        {REPEATED_LABEL_KEYS.map((key) => (
          <Item key={key}>
            <RiAlertFill size={ICON_SIZE} />
            {LABEL}
          </Item>
        ))}
      </Track>
    </Band>
  );
}

export default MailProdWarningBand;
