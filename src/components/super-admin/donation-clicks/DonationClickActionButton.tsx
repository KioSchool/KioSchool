import styled from '@emotion/styled';
import { Color } from '@resources/colors';

type ActionButtonTone = 'default' | 'primary' | 'danger';

function resolveTextColor(tone: ActionButtonTone): string {
  if (tone === 'primary') return Color.WHITE;
  if (tone === 'danger') return Color.RED;
  return Color.GREY;
}

const DonationClickActionButton = styled.button<{ tone?: ActionButtonTone }>`
  height: 28px;
  padding: 0 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  border: 1px solid ${({ tone }) => (tone === 'primary' ? Color.KIO_ORANGE : Color.BORDER_GREY)};
  background: ${({ tone }) => (tone === 'primary' ? Color.KIO_ORANGE : Color.WHITE)};
  color: ${({ tone = 'default' }) => resolveTextColor(tone)};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default DonationClickActionButton;
