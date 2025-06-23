import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { useNavigate } from 'react-router-dom';
import { RiShareForward2Fill, RiArrowLeftLine } from '@remixicon/react';

const Container = styled.div<{ isShow: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background: ${Color.WHITE};
  transition: transform 0.1s ease-in-out;
  transform: translateY(${({ isShow }) => (isShow ? '0' : '-100%')});
  z-index: 1000;
  ${rowFlex({ justify: 'center', align: 'center' })}
  border-bottom: 6px solid ${Color.LIGHT_GREY};
`;

const ContentsContainer = styled.div`
  box-sizing: border-box;
  padding: 0 10px;
  width: 100%;
  height: 100%;
  ${rowFlex({ justify: 'start', align: 'center' })}
`;

const ArrowLeftButton = styled(RiArrowLeftLine, {
  shouldForwardProp: (prop) => prop !== 'useLeftArrow',
})<{ useLeftArrow?: boolean }>`
  display: ${({ useLeftArrow }) => (useLeftArrow ? 'block' : 'none')};
  cursor: pointer;
  fill: ${Color.BLACK};
  transition: transform 0.1s ease;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  &:hover {
    transform: scale(1.1);
  }
`;

const ShareButton = styled(RiShareForward2Fill)`
  cursor: pointer;
  transition: transform 0.1s ease;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  margin-left: auto;
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
  width: 60px;
  font-size: 15px;
  font-weight: 600;
`;

interface OrderStickyNavBarProps {
  useLeftArrow?: boolean;
  showNavBar: boolean;
  workspaceName: string;
  tableNo?: string | number | null;
  useShareButton?: boolean;
}

function OrderStickyNavBar({ useLeftArrow = true, showNavBar, workspaceName, tableNo, useShareButton = true }: OrderStickyNavBarProps) {
  const navigate = useNavigate();
  const onClickShare = async () => {
    if (!navigator.share) {
      alert('이 브라우저는 Web Share API를 지원하지 않습니다. 다른 브라우저를 사용해주세요.');
      return;
    }

    await navigator.share({
      title: workspaceName,
      url: window.location.href,
    });
  };

  return (
    <Container isShow={showNavBar}>
      <ContentsContainer>
        <ArrowLeftButton useLeftArrow={useLeftArrow} onClick={() => navigate(-1)} />
        <WorkspaceNameLabel>{workspaceName}</WorkspaceNameLabel>
        {tableNo && <TableLabel>테이블 {tableNo}</TableLabel>}
        {useShareButton && <ShareButton onClick={onClickShare} />}
      </ContentsContainer>
    </Container>
  );
}

export default OrderStickyNavBar;
