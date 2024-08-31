import React from 'react';
import SelectWithOptions, { SelectWithOptionsProps } from '@components/common/select/SelectWithOptions';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';

interface SelectWithLabelProps extends SelectWithOptionsProps {
  titleLabel: string;
}

const Container = styled.div`
  gap: 12px;
  ${colFlex()}
`;

const TitleLabel = styled.label`
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
`;

function SelectWithLabel(props: SelectWithLabelProps) {
  return (
    <Container>
      <TitleLabel>{props.titleLabel}</TitleLabel>
      <SelectWithOptions {...props} />
    </Container>
  );
}

export default SelectWithLabel;
