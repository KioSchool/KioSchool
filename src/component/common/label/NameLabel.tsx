import React from 'react';
import styled from '@emotion/styled';

export interface NameLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: 'small' | 'medium' | 'large';
}

const Container = styled.label`
  color: #000;
  font-family: Inter;
  font-size: 14.33px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: block;
`;

function NameLabel(props: NameLabelProps) {
  return <Container {...props} />;
}

export default NameLabel;
