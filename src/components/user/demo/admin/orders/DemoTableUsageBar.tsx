import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { RiArrowRightSLine, RiInformationLine } from '@remixicon/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { getTableStatus, TABLE_STATUS } from '@utils/tableStatus';

const ICON_SIZE_PX = 18;

const warningStyle = css`
  border-color: ${Color.KIO_ORANGE_ICON_BG};
  background: ${Color.KIO_ORANGE_FAINT};
`;

const Container = styled.div<{ isWarning: boolean }>`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 10px;
  background: ${Color.WHITE};
  gap: 12px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  ${({ isWarning }) => isWarning && warningStyle}
`;

const Message = styled.div`
  min-width: 0;
  gap: 8px;
  font-size: 13px;
  word-break: keep-all;
  color: ${Color.TEXT_SUBTLE};
  ${rowFlex({ justify: 'start', align: 'center' })}
`;

const WarningIcon = styled(RiInformationLine)`
  flex-shrink: 0;
  width: ${ICON_SIZE_PX}px;
  height: ${ICON_SIZE_PX}px;
  color: ${Color.KIO_ORANGE_DARK};
`;

const Strong = styled.strong`
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
`;

const TableLink = styled.button`
  flex-shrink: 0;
  padding: 0;
  border: 0;
  background: none;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  color: ${Color.KIO_ORANGE_DARK};
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const LinkArrow = styled(RiArrowRightSLine)`
  width: ${ICON_SIZE_PX}px;
  height: ${ICON_SIZE_PX}px;
`;

interface DemoTableUsageBarProps {
  hasTableLink?: boolean;
}

function DemoTableUsageBar({ hasTableLink = true }: DemoTableUsageBarProps) {
  const { tables } = useAtomValue(demoStateAtom);
  const dispatch = useSetAtom(demoStateAtom);
  const tablesInUseCount = tables.filter((table) => getTableStatus(table) !== TABLE_STATUS.EMPTY).length;
  const hasNoTableInUse = tablesInUseCount === 0;

  return (
    <Container isWarning={hasNoTableInUse} role="status">
      {hasNoTableInUse && (
        <Message>
          <WarningIcon />
          <span>
            <Strong>사용 중인 테이블이 없습니다.</Strong> 테이블 사용을 시작해야 손님이 주문할 수 있습니다.
          </span>
        </Message>
      )}
      {!hasNoTableInUse && (
        <Message>
          <span>
            테이블{' '}
            <Strong>
              {tablesInUseCount} / {tables.length}
            </Strong>{' '}
            사용 중
          </span>
        </Message>
      )}
      {hasTableLink && (
        <TableLink type="button" onClick={() => dispatch({ type: 'ADMIN_PAGE', page: 'table' })}>
          테이블 관리
          <LinkArrow />
        </TableLink>
      )}
    </Container>
  );
}

export default DemoTableUsageBar;
