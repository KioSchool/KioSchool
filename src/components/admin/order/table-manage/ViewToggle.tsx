import styled from '@emotion/styled';
import { useAtom } from 'jotai';
import { RiLayoutGridFill, RiListUnordered } from '@remixicon/react';
import { adminTableViewModeAtom, TABLE_VIEW, TableView } from '@jotai/admin/atoms';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

const TOGGLE_BUTTON_SIZE_PX = 36;

const Container = styled.div`
  background-color: ${Color.LIGHT_GREY};
  border-radius: 10px;
  padding: 4px;
  gap: 4px;
  ${rowFlex({ align: 'center' })};

  ${mobileMediaQuery} {
    display: none;
  }
`;

const ToggleButton = styled.button<{ active: boolean }>`
  width: ${TOGGLE_BUTTON_SIZE_PX}px;
  height: ${TOGGLE_BUTTON_SIZE_PX}px;
  border: none;
  border-radius: 8px;
  background-color: ${({ active }) => (active ? Color.WHITE : 'transparent')};
  color: ${({ active }) => (active ? Color.KIO_ORANGE : Color.GREY)};
  box-shadow: ${({ active }) => (active ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const GridIcon = styled(RiLayoutGridFill)`
  width: 16px;
  height: 16px;
`;

const ListIcon = styled(RiListUnordered)`
  width: 16px;
  height: 16px;
`;

function ViewToggle() {
  const [viewMode, setViewMode] = useAtom(adminTableViewModeAtom);

  const handleSelect = (view: TableView) => () => setViewMode(view);

  return (
    <Container>
      <ToggleButton active={viewMode === TABLE_VIEW.LIST} aria-label="목록 보기" onClick={handleSelect(TABLE_VIEW.LIST)}>
        <ListIcon />
      </ToggleButton>
      <ToggleButton active={viewMode === TABLE_VIEW.LAYOUT} aria-label="배치 보기" onClick={handleSelect(TABLE_VIEW.LAYOUT)}>
        <GridIcon />
      </ToggleButton>
    </Container>
  );
}

export default ViewToggle;
