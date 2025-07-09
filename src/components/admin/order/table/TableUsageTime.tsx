import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';

const Container = styled.div`
  ${colFlex({ justify: 'center', align: 'center' })}
  border: 1px solid black;
`;

interface TableUsageTimeProps {
  usageTime: string;
}

function TableUsageTime({ usageTime }: TableUsageTimeProps) {
  return <Container>{usageTime}</Container>;
}

export default TableUsageTime;
