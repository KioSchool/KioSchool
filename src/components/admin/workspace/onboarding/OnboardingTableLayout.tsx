import styled from '@emotion/styled';
import { useSetAtom } from 'jotai';
import { Table, Workspace } from '@@types/index';
import TableLayoutEditor from '@components/admin/order/table-manage/layout/edit/TableLayoutEditor';
import { GA_EVENT } from '@constants/analytics';
import useTableLayoutSave from '@hooks/admin/useTableLayoutSave';
import { TablePositionUpdate } from '@hooks/admin/useAdminTableLayout';
import { adminTablesAtom } from '@jotai/admin/atoms';
import { OnboardingColor } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { trackEvent } from '@utils/analytics';

const MIN_ONBOARDING_TABLE_COUNT = 2;

const UnavailableState = styled.div`
  width: 100%;
  min-height: 160px;
  padding: 24px;
  border: 1px dashed ${OnboardingColor.STEP_ACTIVE_BORDER};
  border-radius: 16px;
  box-sizing: border-box;
  color: ${OnboardingColor.BODY_TEXT};
  font-size: 13px;
  line-height: 1.6;
  text-align: center;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

interface OnboardingTableLayoutProps {
  workspace: Workspace;
  tables: Table[];
}

function OnboardingTableLayout({ workspace, tables }: OnboardingTableLayoutProps) {
  const setAdminTables = useSetAtom(adminTablesAtom);
  const { isSaving, conflictedPosition, clearConflict, save } = useTableLayoutSave(String(workspace.id), setAdminTables);

  if (workspace.tableCount < MIN_ONBOARDING_TABLE_COUNT) return null;

  if (tables.length !== workspace.tableCount) {
    return <UnavailableState>테이블 정보를 불러오지 못했습니다. 상단의 ‘최신 상태 확인’을 눌러주세요.</UnavailableState>;
  }

  const handleSave = async (changes: TablePositionUpdate[]) => {
    const saved = await save(changes);
    if (!saved) return;

    trackEvent(GA_EVENT.TABLE_LAYOUT_SAVED, { workspace_id: workspace.id, table_count: changes.length });
  };

  return <TableLayoutEditor tables={tables} onSave={handleSave} onPositionChange={clearConflict} isSaving={isSaving} conflictedPosition={conflictedPosition} />;
}

export default OnboardingTableLayout;
