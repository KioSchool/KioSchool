import React from 'react';
import SelectWithOptions, { SelectWithOptionsProps } from '@components/common/select/SelectWithOptions';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';

interface SelectWithLabelProps extends SelectWithOptionsProps {
  titleLabel: string;
}

const Container = styled.div`
  width: 500px;
  outline: none;
  gap: 12px;
  ${colFlex()}
`;

const TitleLabel = styled.label`
  color: ${Color.GREY};
  font-size: 20px;
  font-weight: 500;
  padding-left: 10px;
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
