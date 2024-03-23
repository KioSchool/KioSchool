import { Workspace } from '@@types/index';
import styled from '@emotion/styled';
import useAdminUser from '@hooks/useAdminUser';
import useCustomNavigate from '@hooks/useCustomNavigate';

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
  padding: 16px 23px 0 0;
`;

const DeleteText = styled.div`
  cursor: pointer;
  color: #fff;
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

const SubTitleContainer = styled.div`
  display: block;
`;

const Description = styled.div`
  padding: 26px 0 0 22px;
  display: flex;
  flex-wrap: wrap;
  width: 198px;
  color: #fff;
  font-size: 32px;
  font-weight: 100;
`;

const Title = styled.div`
  padding: 5px 0 0 22px;
  display: flex;
  flex-wrap: wrap;
  width: 188px;
  height: 45px;
  color: #fff;
  font-size: 40.329px;
  font-weight: 700;
`;

interface Props {
  workspaces: Workspace[];
}

const WorkspaceContent = ({ workspaces }: Props) => {
  const { leaveWorkspaces } = useAdminUser();
  const { appendPath } = useCustomNavigate();

  const leaveHandler = (e: React.FormEvent, id: number) => {
    e.stopPropagation();
    const userInput = window.confirm('정말 삭제하시겠습니까?');
    if (userInput) leaveWorkspaces(id);
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
                <DeleteText
                  onClick={(e: React.FormEvent) => {
                    leaveHandler(e, it.id);
                  }}
                >
                  탈퇴하기
                </DeleteText>
              </DeleteContainer>
            </MainTitleContainer>

            <SubTitleContainer>
              <Title>{it.name}</Title>
            </SubTitleContainer>
          </TitleContainer>

          <MenuTitle>메뉴 개수 {it.products.length} 개</MenuTitle>
        </WorkspaceContainer>
      ))}
    </>
  );
};

export default WorkspaceContent;
