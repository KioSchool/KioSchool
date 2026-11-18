import { css } from '@emotion/react';
import { LandingColor } from '@resources/colors';
import { rowFlex } from './flexStyles';

export const DEMO_STAGE_WIDTH = 1120;

export const DEMO_GUEST_DESIGN = { width: 390, height: 844 };

export const DEMO_ADMIN_DESIGN = { width: 1440, height: 1000 };

export const demoEmptyPhoneStyle = css`
  width: 100%;
  height: 100%;
  background: ${LandingColor.SURFACE};
  font-size: 15px;
  font-weight: 600;
  color: ${LandingColor.CAPTION};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;
