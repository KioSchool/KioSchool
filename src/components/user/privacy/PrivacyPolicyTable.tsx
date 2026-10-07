import styled from '@emotion/styled';
import { mobileMediaQuery } from '@styles/globalStyles';

const MOBILE_MIN_COLUMN_WIDTH = 140;

// 열이 많은 표는 좁은 화면에서 표만 가로로 밀리게 하고 페이지는 넘치지 않게 한다.
const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const Table = styled.table<{ columnCount: number }>`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  line-height: 1.6;
  color: #4e5968;

  th,
  td {
    padding: 10px 12px;
    border: 1px solid #e5e8eb;
    text-align: left;
    vertical-align: top;
    word-break: keep-all;
    overflow-wrap: anywhere;
  }

  th {
    background: #f8f9fa;
    color: #333d4b;
    font-weight: 600;
    white-space: nowrap;
  }

  ${mobileMediaQuery} {
    min-width: ${({ columnCount }) => columnCount * MOBILE_MIN_COLUMN_WIDTH}px;
    font-size: 13px;
  }
`;

interface PrivacyPolicyTableProps {
  headers: string[];
  rows: string[][];
}

function PrivacyPolicyTable({ headers, rows }: PrivacyPolicyTableProps) {
  return (
    <ScrollContainer>
      <Table columnCount={headers.length}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join('|')}>
              {row.map((cell, index) => (
                <td key={`${headers[index]}-${cell}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollContainer>
  );
}

export default PrivacyPolicyTable;
