import styled from '@emotion/styled';
import { RiArrowLeftLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const Container = styled.div<{ isShow: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: ${Color.WHITE};
  transition: transform 0.1s ease-in-out;
  transform: translateY(${({ isShow }) => Number(!isShow) * -100}%);
  z-index: 1000;
  border-bottom: 6px solid ${Color.LIGHT_GREY};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const ContentsContainer = styled.div`
  box-sizing: border-box;
  padding: 0 10px;
  width: 100%;
  height: 100%;
  ${rowFlex({ justify: 'start', align: 'center' })}
`;

const BackButton = styled.button`
  flex-shrink: 0;
  padding: 0;
  border: 0;
  background: none;
  line-height: 0;
  cursor: pointer;
`;

const ArrowLeftIcon = styled(RiArrowLeftLine)`
  fill: ${Color.BLACK};
  transition: transform 0.1s ease;
  width: 24px;
  height: 24px;

  &:hover {
    transform: scale(1.1);
  }
`;

const WorkspaceNameLabel = styled.label`
  box-sizing: border-box;
  max-width: 260px;
  font-size: 20px;
  padding-left: 10px;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const TableLabel = styled.label`
  margin-right: auto;
  padding-left: 10px;
  width: 70px;
  font-size: 15px;
  font-weight: 600;
`;

interface DemoGuestNavBarProps {
  showNavBar: boolean;
  workspaceName: string;
  tableNo?: number;
  onBack?: () => void;
}

function DemoGuestNavBar({ showNavBar, workspaceName, tableNo, onBack }: DemoGuestNavBarProps) {
  return (
    <Container isShow={showNavBar} data-guest-navbar>
      <ContentsContainer>
        {onBack && (
          <BackButton type="button" aria-label="뒤로 가기" onClick={onBack}>
            <ArrowLeftIcon />
          </BackButton>
        )}
        <WorkspaceNameLabel>{workspaceName}</WorkspaceNameLabel>
        {tableNo && <TableLabel>테이블 {tableNo}</TableLabel>}
      </ContentsContainer>
    </Container>
  );
}

export default DemoGuestNavBar;
