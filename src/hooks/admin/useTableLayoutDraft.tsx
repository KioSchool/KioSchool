import { useMemo, useState } from 'react';
import { Table, TablePosition } from '@@types/index';
import { TablePositionUpdate } from '@hooks/admin/useAdminTableLayout';

type DraftMap = Map<number, TablePosition | null>;

function isSamePosition(a: TablePosition | null, b: TablePosition | null) {
  if (a === null || b === null) return a === b;
  return a.x === b.x && a.y === b.y;
}

function useTableLayoutDraft(tables: Table[]) {
  const [draft, setDraft] = useState<DraftMap>(new Map());

  const positionOf = (table: Table) => (draft.has(table.id) ? draft.get(table.id)! : table.position ?? null);

  const place = (tableId: number, position: TablePosition | null) => {
    setDraft((previous) => {
      const next = new Map(previous);
      next.set(tableId, position);
      return next;
    });
  };

  const resetAll = () => {
    setDraft(new Map(tables.map((table) => [table.id, null])));
  };

  const clear = () => setDraft(new Map());

  // 옮겼다가 원래 자리로 되돌린 항목은 draft에 남아 있지만 서버와 같으므로 보내지 않는다.
  const changes: TablePositionUpdate[] = useMemo(() => {
    const result: TablePositionUpdate[] = [];

    draft.forEach((position, tableId) => {
      const table = tables.find((item) => item.id === tableId);
      if (!table) return;
      if (isSamePosition(table.position, position)) return;

      result.push({ tableId, position });
    });

    return result;
  }, [draft, tables]);

  return { positionOf, place, resetAll, clear, changes, isDirty: changes.length > 0 };
}

export default useTableLayoutDraft;
