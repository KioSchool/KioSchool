import { Workspace } from '@@types/index';
import styled from '@emotion/styled';
import useAdminUser from '@hooks/admin/useAdminUser';
import useCustomNavigate from '@hooks/useCustomNavigate';
import useConfirm from '@hooks/useConfirm';
import DeleteButtonSvg from '@resources/svg/DeleteButtonSvg';
import React from 'react';

const WorkspaceContainer = styled.div`
  cursor: pointer;
  width: 321px;
  height: 332px;
  border-radius: 25px;
  background: #eb6d09;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  &:hover {
    background: linear-gradient(140deg, #ffe3cc -165.17%, #eb6d09 92.63%);
  }

  &:active {
    border-radius: 25px;
    background: #eb6d09;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25) inset;
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
  display: flex;
  flex-direction: row;
`;

const DeleteContainer = styled.div`
  position: relative;
  padding: 12px 15px 0 0;
`;

const DeleteButton = styled(DeleteButtonSvg)`
  position: absolute;
  right: 15px;
  top: 12px;
  transition: transform 0.1s ease;
  &:hover {
    transform: scale(1.2);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: column;
`;

const MainTitleContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

const SubTitleContainer = styled.div``;

const Description = styled.div`
  padding: 26px 10px 0 23px;
  display: flex;
  flex-wrap: wrap;
  width: 198px;
  color: #fff;
  font-size: 32px;
  font-weight: 100;
`;

const Title = styled.div`
  padding: 5px 10px 22px 22px;
  display: flex;
  flex-wrap: wrap;
  width: 69%;
  height: 50px;
  color: #fff;
  font-size: 40px;
  font-weight: 700;
`;

interface Props {
  workspaces: Workspace[];
}

function WorkspaceContent({ workspaces }: Props) {
  const { leaveWorkspace } = useAdminUser();
  const { appendPath } = useCustomNavigate();
  const { ConfirmModal, confirm } = useConfirm('해당 워크스페이스를 삭제하시겠습니까?', '확인 후 되돌릴 수 없습니다.', '확인', '취소');

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
        >
          <TitleContainer>
            <MainTitleContainer>
              <Description>{it.description}</Description>
              <DeleteContainer>
                <DeleteButton
                  onClick={(e: React.FormEvent) => {
                    leaveHandler(e, it.id);
                  }}
                />
              </DeleteContainer>
            </MainTitleContainer>

            <SubTitleContainer>
              <Title>{it.name}</Title>
            </SubTitleContainer>
          </TitleContainer>

          <MenuTitle>메뉴 개수 {it.products.length} 개</MenuTitle>
        </WorkspaceContainer>
      ))}
      <ConfirmModal />
    </>
  );
}

export default WorkspaceContent;
