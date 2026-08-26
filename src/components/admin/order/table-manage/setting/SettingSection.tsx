import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  gap: 8px;

  ${colFlex()};
`;

const Label = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${Color.MUTED_GREY};
`;

const Card = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  gap: 10px;
  background-color: ${Color.LIGHT_GREY};
  border-radius: 12px;

  ${colFlex()};
`;

interface SettingSectionProps {
  label: string;
  children: ReactNode;
}

function SettingSection({ label, children }: SettingSectionProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <Card>{children}</Card>
    </Container>
  );
}

export default SettingSection;
