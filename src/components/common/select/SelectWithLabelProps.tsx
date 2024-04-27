import React from 'react';
import SelectWithOptions, { SelectWithOptionsProps } from '@components/common/select/SelectWithOptions';
import styled from '@emotion/styled';

interface SelectWithLabelProps extends SelectWithOptionsProps {
  titleLabel: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
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
      <SelectWithOptions options={props.options} />
    </Container>
  );
}

export default SelectWithLabel;
