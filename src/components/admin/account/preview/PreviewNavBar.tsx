import styled from '@emotion/styled';
import { RiArrowLeftLine } from '@remixicon/react';
import { rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';

const NavBar = styled.div`
  height: 56px;
  padding: 0 10px;
  gap: 10px;
  border-bottom: 1px solid ${Color.LIGHT_GREY};
  ${rowFlex({ align: 'center' })}
`;

const NavTitle = styled.span`
  color: ${Color.BLACK};
  font-size: 20px;
  font-weight: 700;
`;

const NavTable = styled.span`
  color: ${Color.BLACK};
  font-size: 15px;
  font-weight: 700;
`;

function PreviewNavBar() {
  return (
    <NavBar>
      <RiArrowLeftLine size={20} color={Color.BLACK} />
      <NavTitle>우리 주점</NavTitle>
      <NavTable>테이블 3</NavTable>
    </NavBar>
  );
}

export default PreviewNavBar;
