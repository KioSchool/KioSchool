import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const Row = styled.div`
  width: 100%;
  gap: 12px;
  font-size: 13px;
  ${rowFlex({ justify: 'space-between', align: 'flex-start' })}
`;

const Label = styled.span`
  flex-shrink: 0;
  color: ${Color.GREY};
`;

const Value = styled.span`
  min-width: 0;
  color: ${Color.BLACK};
  text-align: right;
  word-break: break-all;
`;

interface DetailInfoRowProps {
  label: string;
  children: ReactNode;
}

function DetailInfoRow({ label, children }: DetailInfoRowProps) {
  return (
    <Row>
      <Label>{label}</Label>
      <Value>{children}</Value>
    </Row>
  );
}

export default DetailInfoRow;
