import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { Color } from '@resources/colors';
import type { MailAudienceRow } from '@@types/mail';
import { formatCurrency, formatNumber } from '@utils/formatNumber';
import { formatLastSent, formatOperatingPeriod, getOwnerWorkspaceCounts } from '@utils/mailCampaign';

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

const Row = styled.tr<{ isPicked: boolean }>`
  background: ${({ isPicked }) => (isPicked ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  color: ${Color.BLACK};
  cursor: pointer;
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

const OwnerTag = styled.span`
  display: inline-block;
  margin-top: 2px;
  padding: 1px 6px;
  border-radius: 8px;
  background: ${Color.KIO_ORANGE_FAINT};
  color: ${Color.KIO_ORANGE_DARK};
  font-size: 11px;
  font-weight: 600;
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
  allRows: MailAudienceRow[];
  pickedIds: Set<number>;
  onToggle: (workspaceId: number) => void;
}

function MailAudienceList({ rows, allRows, pickedIds, onToggle }: MailAudienceListProps) {
  const [sortKey, setSortKey] = useState<SortKey>('orderCount');
  const [isDescending, setIsDescending] = useState(true);
  const ownerCounts = useMemo(() => getOwnerWorkspaceCounts(allRows), [allRows]);
  const sortedRows = useMemo(
    () => [...rows].sort((a, b) => (getSortValue(a, sortKey) - getSortValue(b, sortKey)) * getSortDirection(isDescending)),
    [isDescending, rows, sortKey],
  );

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
            <HeadCell aria-label="담기" />
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
            <Row key={row.workspaceId} isPicked={pickedIds.has(row.workspaceId)} onClick={() => onToggle(row.workspaceId)}>
              <Cell onClick={(event) => event.stopPropagation()}>
                <input
                  type="checkbox"
                  aria-label={`${row.workspaceName} 담기`}
                  checked={pickedIds.has(row.workspaceId)}
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
                {(ownerCounts.get(row.ownerEmail) ?? 0) > 1 && <OwnerTag>같은 사장 {ownerCounts.get(row.ownerEmail)}곳</OwnerTag>}
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
