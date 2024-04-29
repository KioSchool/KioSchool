import React from 'react';
import SelectWithOptions, { SelectWithOptionsProps } from '@components/common/select/SelectWithOptions';
import styled from '@emotion/styled';

interface SelectWithLabel extends SelectWithOptionsProps {
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

function SelectWithLabel(props: SelectWithLabel) {
  return (
    <Container>
      <TitleLabel>{props.titleLabel}</TitleLabel>
      <SelectWithOptions {...props} />
    </Container>
  );
}

export default SelectWithLabel;
