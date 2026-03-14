import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { RiCheckLine } from '@remixicon/react';

const Label = styled.label`
  cursor: pointer;
  user-select: none;
  gap: 8px;
  ${rowFlex({ align: 'center' })}
`;

const Box = styled.div<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border: 1px solid ${({ checked }) => (checked ? Color.KIO_ORANGE : '#e5e5e5')};
  border-radius: 4px;
  background: ${({ checked }) => (checked ? Color.KIO_ORANGE : 'transparent')};
  transition: all 0.15s;
  flex-shrink: 0;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`;

const Text = styled.span`
  font-size: 14px;
  color: #464a4d;
  white-space: nowrap;
`;

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

function CustomCheckbox({ checked, onChange, label }: CustomCheckboxProps) {
  return (
    <Label>
      <HiddenInput type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <Box checked={checked}>{checked && <RiCheckLine size={16} color={Color.WHITE} />}</Box>
      <Text>{label}</Text>
    </Label>
  );
}

export default CustomCheckbox;
