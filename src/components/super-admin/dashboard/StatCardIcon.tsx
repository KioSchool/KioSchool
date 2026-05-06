import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const IconBox = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${Color.LIGHT_GREY};
  color: ${Color.GREY};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

interface StatCardIconProps {
  children: ReactNode;
}

function StatCardIcon({ children }: StatCardIconProps) {
  return <IconBox>{children}</IconBox>;
}

export default StatCardIcon;
