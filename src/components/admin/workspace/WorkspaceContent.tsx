import { Workspace } from '@@types/index';
import styled from '@emotion/styled';
import useAdminUser from '@hooks/admin/useAdminUser';
import useCustomNavigate from '@hooks/useCustomNavigate';
import useConfirm from '@hooks/useConfirm';
import { RiDeleteBinLine } from '@remixicon/react';
import React from 'react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { expandButtonStyle } from '@styles/buttonStyles';

const WorkspaceContainer = styled.div`
  cursor: pointer;
  width: 321px;
  height: 332px;
  border-radius: 25px;
  background: ${Color.KIO_ORANGE};
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  ${colFlex({ justify: 'space-between', align: 'flex-start' })}

  &:hover {
    background: linear-gradient(140deg, #ffe3cc -165.17%, ${Color.KIO_ORANGE} 92.63%);
  }

  &:active {
    border-radius: 25px;
    background: ${Color.KIO_ORANGE};
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.25) inset;
  }
`;

const MenuTitle = styled.div`
  padding: 0 0 25px 22px;
  width: 164px;
  height: 27px;
  flex-shrink: 0;
  color: #fff;
  font-size: 24px;
  font-weight: 300;
  ${rowFlex()}
`;

const DeleteContainer = styled.div`
  position: relative;
  padding: 12px 15px 0 0;
`;

const DeleteButton = styled(RiDeleteBinLine)`
  position: absolute;
  color: ${Color.WHITE};
  right: 15px;
  top: 12px;
  width: 30px;
  height: 30px;
  ${expandButtonStyle}
`;

const TitleContainer = styled.div`
  width: 100%;
  flex-wrap: wrap;
  ${colFlex()}
`;

const MainTitleContainer = styled.div`
  width: 100%;
  flex-wrap: wrap;
  ${rowFlex({ justify: 'space-between' })}
`;

const SubTitleContainer = styled.div``;

const Description = styled.div`
  padding: 26px 10px 0 23px;
  flex-wrap: wrap;
  width: 198px;
  color: #fff;
  font-size: 32px;
  font-weight: 100;
  ${rowFlex()}
`;

const Title = styled.div`
  padding: 5px 10px 22px 22px;
  flex-wrap: wrap;
  width: 69%;
  height: 50px;
  color: #fff;
  font-size: 40px;
  font-weight: 700;
  ${rowFlex()}
`;

interface Props {
  workspaces: Workspace[];
}

function WorkspaceContent({ workspaces }: Props) {
  const { leaveWorkspace } = useAdminUser();
  const { appendPath } = useCustomNavigate();
  const { ConfirmModal, confirm } = useConfirm({
    title: '해당 워크스페이스를 삭제하시겠습니까?',
    description: '확인 후 되돌릴 수 없습니다.',
    okText: '확인',
    cancelText: '취소',
  });

  const leaveHandler = async (e: React.FormEvent, id: number) => {
    e.stopPropagation();
    const userInput = await confirm();
    if (userInput) leaveWorkspace(id);
  };

  return (
    <>
      {workspaces.map((it) => (
        <WorkspaceContainer
          key={it.id}
          onClick={() => {
            appendPath(`/workspace/${it.id}`);
          }}
          className={'workspace-container'}
        >
          <TitleContainer className={'title-container'}>
            <MainTitleContainer className={'main-title-container'}>
              <Description className={'description'}>{it.description}</Description>
              <DeleteContainer className={'delete-container'}>
                <DeleteButton
                  onClick={(e: React.FormEvent) => {
                    leaveHandler(e, it.id);
                  }}
                />
              </DeleteContainer>
            </MainTitleContainer>

            <SubTitleContainer className={'sub-title-container'}>
              <Title className={'title'}>{it.name}</Title>
            </SubTitleContainer>
          </TitleContainer>

          <MenuTitle className={'menu-title'}>메뉴 개수 {it.products.length} 개</MenuTitle>
        </WorkspaceContainer>
      ))}
      <ConfirmModal />
    </>
  );
}

export default WorkspaceContent;
