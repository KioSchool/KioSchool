import styled from '@emotion/styled';
import { DEMO_WORKSPACE } from '@constants/data/demo/demoSeed';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

const TitleContainer = styled.div`
  padding-bottom: 30px;
  gap: 15px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const WorkspaceName = styled.div`
  color: ${Color.TEXT_DEFAULT};
  text-align: center;
  font-size: 40px;
  font-weight: 700;
  line-height: 125%;
`;

const LocationLabel = styled.div`
  color: ${Color.TEXT_DEFAULT};
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
`;

interface DemoAdminTitleProps {
  label: string;
}

function DemoAdminTitle({ label }: DemoAdminTitleProps) {
  return (
    <TitleContainer>
      <WorkspaceName>{DEMO_WORKSPACE.name}</WorkspaceName>
      <LocationLabel>{label}</LocationLabel>
    </TitleContainer>
  );
}

export default DemoAdminTitle;
