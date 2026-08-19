import styled from '@emotion/styled';
import { useAtom } from 'jotai';
import { RiLayoutGridFill, RiListUnordered } from '@remixicon/react';
import { adminTableViewModeAtom, TABLE_VIEW, TableView } from '@jotai/admin/atoms';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

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
  border: none;
  border-radius: 8px;
  background-color: ${({ active }) => (active ? Color.WHITE : 'transparent')};
  color: ${({ active }) => (active ? Color.KIO_ORANGE : Color.GREY)};
  box-shadow: ${({ active }) => (active ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none')};
  font-size: 14px;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  padding: 6px 14px;
  cursor: pointer;
  gap: 6px;
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
      <ToggleButton active={viewMode === TABLE_VIEW.LAYOUT} onClick={handleSelect(TABLE_VIEW.LAYOUT)}>
        <GridIcon />
        배치
      </ToggleButton>
      <ToggleButton active={viewMode === TABLE_VIEW.LIST} onClick={handleSelect(TABLE_VIEW.LIST)}>
        <ListIcon />
        목록
      </ToggleButton>
    </Container>
  );
}

export default ViewToggle;
