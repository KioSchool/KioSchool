import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { RiLayoutGridFill, RiListUnordered } from '@remixicon/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { TABLE_VIEW } from '@jotai/admin/atoms';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const TOGGLE_BUTTON_SIZE_PX = 36;
const VIEW_TOGGLE_RADIUS_PX = 10;

const Container = styled.div`
  background-color: ${Color.LIGHT_GREY};
  border-radius: ${VIEW_TOGGLE_RADIUS_PX}px;
  padding: 4px;
  gap: 4px;
  ${rowFlex({ align: 'center' })};
`;

const activeToggleStyle = css`
  background-color: ${Color.WHITE};
  color: ${Color.KIO_ORANGE};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ToggleButton = styled.button<{ isActive: boolean }>`
  width: ${TOGGLE_BUTTON_SIZE_PX}px;
  height: ${TOGGLE_BUTTON_SIZE_PX}px;
  border: none;
  border-radius: 8px;
  background-color: transparent;
  color: ${Color.GREY};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  ${rowFlex({ justify: 'center', align: 'center' })};
  ${({ isActive }) => isActive && activeToggleStyle}
`;

const GridIcon = styled(RiLayoutGridFill)`
  width: 16px;
  height: 16px;
`;

const ListIcon = styled(RiListUnordered)`
  width: 16px;
  height: 16px;
`;

function DemoViewToggle() {
  const { tableViewMode } = useAtomValue(demoStateAtom);
  const dispatch = useSetAtom(demoStateAtom);

  return (
    <Container>
      <ToggleButton
        type="button"
        isActive={tableViewMode === TABLE_VIEW.LIST}
        aria-label="목록 보기"
        onClick={() => dispatch({ type: 'TABLE_VIEW_MODE', mode: TABLE_VIEW.LIST })}
      >
        <ListIcon />
      </ToggleButton>
      <ToggleButton
        type="button"
        isActive={tableViewMode === TABLE_VIEW.LAYOUT}
        aria-label="배치 보기"
        onClick={() => dispatch({ type: 'TABLE_VIEW_MODE', mode: TABLE_VIEW.LAYOUT })}
      >
        <GridIcon />
      </ToggleButton>
    </Container>
  );
}

export default DemoViewToggle;
