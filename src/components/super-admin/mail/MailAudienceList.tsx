import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { Color } from '@resources/colors';
import type { MailAudienceRow } from '@@types/mail';
import { formatCurrency, formatNumber } from '@utils/formatNumber';
import { formatLastSent, formatOperatingPeriod } from '@utils/mailCampaign';

type SortKey = 'orderCount' | 'revenue' | 'operatingDays' | 'insightCardCount' | 'lastSentAt';

const SORTABLE_COLUMNS: { key: SortKey; label: string; isNumber: boolean }[] = [
  { key: 'orderCount', label: '주문 수', isNumber: true },
  { key: 'revenue', label: '매출', isNumber: true },
  { key: 'operatingDays', label: '운영일', isNumber: true },
  { key: 'insightCardCount', label: '인사이트 카드', isNumber: true },
  { key: 'lastSentAt', label: '지난 발송', isNumber: false },
];

const Wrap = styled.div`
  width: 100%;
  max-height: 420px;
  overflow: auto;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`;

const HeadCell = styled.th`
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 9px 10px;
  background: ${Color.LIGHT_GREY};
  color: ${Color.GREY};
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
`;

const SortButton = styled.button<{ isNumber: boolean }>`
  width: 100%;
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  text-align: ${({ isNumber }) => (isNumber ? 'right' : 'left')};
  white-space: nowrap;
`;

const Row = styled.tr<{ isExcluded: boolean }>`
  color: ${({ isExcluded }) => (isExcluded ? Color.MUTED_GREY : Color.BLACK)};
`;

const Cell = styled.td`
  padding: 9px 10px;
  border-top: 1px solid ${Color.BORDER_GREY};
  vertical-align: top;
`;

const NumberCell = styled(Cell)`
  text-align: right;
  white-space: nowrap;
`;

const SubText = styled.div`
  color: ${Color.MUTED_GREY};
  font-size: 12px;
  overflow-wrap: anywhere;
`;

const SentTag = styled.span<{ isSent: boolean }>`
  display: inline-block;
  padding: 2px 7px;
  border-radius: 10px;
  background: ${({ isSent }) => (isSent ? Color.KIO_ORANGE_FAINT : Color.LIGHT_GREY)};
  color: ${({ isSent }) => (isSent ? Color.KIO_ORANGE_DARK : Color.GREY)};
  font-size: 11px;
  font-weight: 600;
`;

function getSortValue(row: MailAudienceRow, key: SortKey): number {
  return match(key)
    .with('lastSentAt', () => new Date(row.lastSentAt ?? 0).getTime())
    .otherwise((numberKey) => row[numberKey]);
}

function getSortDirection(isDescending: boolean): number {
  if (isDescending) return -1;
  return 1;
}

function getSortMark(isSorted: boolean, isDescending: boolean): string {
  if (!isSorted) return ' ↕';
  if (isDescending) return ' ↓';
  return ' ↑';
}

interface MailAudienceListProps {
  rows: MailAudienceRow[];
  excludedIds: number[];
  onToggle: (workspaceId: number) => void;
  onToggleAll: (isExcludingAll: boolean) => void;
}

function MailAudienceList({ rows, excludedIds, onToggle, onToggleAll }: MailAudienceListProps) {
  const [sortKey, setSortKey] = useState<SortKey>('orderCount');
  const [isDescending, setIsDescending] = useState(true);
  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => (getSortValue(a, sortKey) - getSortValue(b, sortKey)) * getSortDirection(isDescending));
  }, [isDescending, rows, sortKey]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setIsDescending((current) => !current);
      return;
    }
    setSortKey(key);
    setIsDescending(true);
  };

  return (
    <Wrap>
      <Table>
        <thead>
          <tr>
            <HeadCell>
              <input type="checkbox" aria-label="전체 선택" checked={excludedIds.length === 0} onChange={() => onToggleAll(excludedIds.length === 0)} />
            </HeadCell>
            <HeadCell>주점</HeadCell>
            <HeadCell>받는 사람</HeadCell>
            {SORTABLE_COLUMNS.map((column) => (
              <HeadCell key={column.key}>
                <SortButton type="button" isNumber={column.isNumber} onClick={() => handleSort(column.key)}>
                  {column.label}
                  {getSortMark(sortKey === column.key, isDescending)}
                </SortButton>
              </HeadCell>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row) => (
            <Row key={row.workspaceId} isExcluded={excludedIds.includes(row.workspaceId)}>
              <Cell>
                <input
                  type="checkbox"
                  aria-label={`${row.workspaceName} 받기`}
                  checked={!excludedIds.includes(row.workspaceId)}
                  onChange={() => onToggle(row.workspaceId)}
                />
              </Cell>
              <Cell>
                {row.workspaceName}
                <SubText>
                  {row.schoolName} · #{row.workspaceId}
                </SubText>
              </Cell>
              <Cell>
                {row.ownerName}
                <SubText>{row.ownerEmail}</SubText>
              </Cell>
              <NumberCell>{formatNumber(row.orderCount)}건</NumberCell>
              <NumberCell>{formatCurrency(row.revenue)}</NumberCell>
              <NumberCell>
                {row.operatingDays}일<SubText>{formatOperatingPeriod(row.firstOperatingDate, row.lastOperatingDate)}</SubText>
              </NumberCell>
              <NumberCell>{row.insightCardCount}장</NumberCell>
              <Cell>
                <SentTag isSent={row.lastSentAt !== null}>{formatLastSent(row)}</SentTag>
              </Cell>
            </Row>
          ))}
        </tbody>
      </Table>
    </Wrap>
  );
}

export default MailAudienceList;
