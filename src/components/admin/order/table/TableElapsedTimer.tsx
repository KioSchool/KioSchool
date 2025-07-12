import styled from '@emotion/styled';
import useFormattedTime from '@hooks/useFormattedTime';
import { colFlex } from '@styles/flexStyles';
import { formatElapsedTime } from '@utils/FormatDate';

const Container = styled.div`
  ${colFlex({ justify: 'center', align: 'center' })}
  border: 1px solid black;
`;

interface TableUsageTimeProps {
  createdAt: string | undefined;
}

function TableElapsedTimer({ createdAt }: TableUsageTimeProps) {
  const elapsedTime = useFormattedTime<string>({
    date: createdAt,
    formatter: formatElapsedTime,
  });

  return <Container>사용시간: {elapsedTime}</Container>;
}

export default TableElapsedTimer;
