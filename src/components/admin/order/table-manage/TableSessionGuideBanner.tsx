import styled from '@emotion/styled';
import { RiInformationLine } from '@remixicon/react';
import { useAtomValue } from 'jotai';
import { adminTablesAtom, adminWorkspaceAtom } from '@jotai/admin/atoms';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { getTableStatus, TABLE_STATUS } from '@utils/tableStatus';

const ICON_SIZE_PX = 20;

const Banner = styled.div`
  box-sizing: border-box;
  width: 95%;
  padding: 12px 16px;
  margin-bottom: 12px;
  border: 1px solid ${Color.BLUE_ICON_BG};
  border-radius: 10px;
  background: ${Color.BLUE_FAINT};
  gap: 10px;
  ${rowFlex({ justify: 'start', align: 'center' })}
`;

const Icon = styled(RiInformationLine)`
  flex-shrink: 0;
  width: ${ICON_SIZE_PX}px;
  height: ${ICON_SIZE_PX}px;
  color: ${Color.BLUE};
`;

const TextColumn = styled.div`
  min-width: 0;
  gap: 2px;
  word-break: keep-all;
  ${colFlex({ align: 'start' })}
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
`;

const Description = styled.span`
  font-size: 13px;
  color: ${Color.TEXT_BODY};
`;

function TableSessionGuideBanner() {
  const workspace = useAtomValue(adminWorkspaceAtom);
  const tables = useAtomValue(adminTablesAtom);
  const hasNoTableInUse = tables.length > 0 && tables.every((table) => getTableStatus(table) === TABLE_STATUS.EMPTY);

  if (workspace.isOnboarding) return null;
  if (!hasNoTableInUse) return null;

  return (
    <Banner role="status">
      <Icon />
      <TextColumn>
        <Title>사용 중인 테이블이 없습니다</Title>
        <Description>테이블을 선택해 ‘사용 시작’을 눌러야 손님이 그 테이블에서 주문할 수 있습니다.</Description>
      </TextColumn>
    </Banner>
  );
}

export default TableSessionGuideBanner;
