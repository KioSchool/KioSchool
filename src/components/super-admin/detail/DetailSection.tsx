import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

const Section = styled.div`
  width: 100%;
  gap: 6px;
  ${colFlex()}
`;

const Title = styled.div`
  font-size: 11px;
  color: ${Color.GREY};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 600;
`;

interface DetailSectionProps {
  title: string;
  children: ReactNode;
}

function DetailSection({ title, children }: DetailSectionProps) {
  return (
    <Section>
      <Title>{title}</Title>
      {children}
    </Section>
  );
}

export default DetailSection;
