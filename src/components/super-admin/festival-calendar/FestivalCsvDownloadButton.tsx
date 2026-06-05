import { RiDownload2Line } from '@remixicon/react';
import styled from '@emotion/styled';
import { FestivalWorkspaceRankItem } from '@@types/index';
import { getAdminWorkspacePath } from '@constants/routes';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { exportToCsv } from '@utils/csv';

const MONTH_PAD_LENGTH = 2;

const CSV_HEADERS = ['대학교', '주점명', '운영자 이름', '운영자 이메일', '주점 Admin URL', '축제 일수', '총 주문', '총 매출'];

const Button = styled.button`
  gap: 6px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  color: ${Color.WHITE};
  background: ${Color.KIO_ORANGE};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    background: ${Color.KIO_ORANGE_DARK};
  }

  &:disabled {
    background: ${Color.HEAVY_GREY};
    cursor: not-allowed;
  }
`;

interface FestivalCsvDownloadButtonProps {
  workspaceRanking: FestivalWorkspaceRankItem[];
  year: number;
  month: number;
}

function FestivalCsvDownloadButton({ workspaceRanking, year, month }: FestivalCsvDownloadButtonProps) {
  const handleDownload = () => {
    const grouped = new Map<string, FestivalWorkspaceRankItem[]>();
    workspaceRanking.forEach((w) => {
      const group = grouped.get(w.universityName) ?? [];
      group.push(w);
      grouped.set(w.universityName, group);
    });

    const schoolsSortedByRevenue = [...grouped.entries()].sort(
      (a, b) => b[1].reduce((sum, w) => sum + w.totalRevenue, 0) - a[1].reduce((sum, w) => sum + w.totalRevenue, 0),
    );

    const rows: (string | number)[][] = schoolsSortedByRevenue.flatMap(([, workspaces]) =>
      [...workspaces]
        .sort((a, b) => b.totalRevenue - a.totalRevenue)
        .map((workspace) => [
          workspace.universityName,
          workspace.workspaceName,
          workspace.ownerName,
          workspace.ownerEmail,
          `${window.location.origin}${getAdminWorkspacePath(workspace.workspaceId)}`,
          workspace.festivalDays,
          workspace.totalOrders,
          workspace.totalRevenue,
        ]),
    );

    const fileName = `축제주점_${year}-${String(month).padStart(MONTH_PAD_LENGTH, '0')}.csv`;
    exportToCsv(fileName, CSV_HEADERS, rows);
  };

  return (
    <Button type="button" onClick={handleDownload} disabled={workspaceRanking.length === 0}>
      <RiDownload2Line size={16} />
      CSV 다운로드
    </Button>
  );
}

export default FestivalCsvDownloadButton;
