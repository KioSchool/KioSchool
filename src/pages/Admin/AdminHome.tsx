import React, { useEffect, useRef } from 'react';
import useAdminUser from '@hooks/useAdminUser';
import { useRecoilValue } from 'recoil';
import { workspacesAtom } from '@recoils/atoms';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  box-sizing: border-box;
`;
const SubContainer = styled.div`
  display: flex;
  width: 70vw;
  flex-basis: 0;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 500px;
`;

const WorkspaceContainer = styled.div`
  width: 321px;
  height: 332px;
  border-radius: 25px;
  background: #eb6d09;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const MenuTitle = styled.div`
  padding: 0 0 25px 22px;
  width: 164px;
  height: 27px;
  flex-shrink: 0;
  color: #fff;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 220px;
  flex-direction: column;
`;

const SubTitle = styled.div`
  padding: 26px 0 0 22px;
  display: flex;
  flex-wrap: wrap;
  width: 198px;
  flex-shrink: 0;
  color: #fff;
  font-family: Inter;
  font-size: 32px;
  font-weight: 100;
`;

const Title = styled.div`
  padding: 5px 0 0 22px;
  display: flex;
  flex-wrap: wrap;
  width: 188px;
  height: 45px;
  flex-shrink: 0;
  color: #fff;

  font-family: Inter;
  font-size: 40.329px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const AddWorkspaceContainer = styled.div`
  width: 321px;
  height: 332px;
  flex-shrink: 0;
  border-radius: 25px;
  border: 1px solid #000;
  background: #fff;
`;
function AdminHome() {
  const { fetchWorkspaces, createWorkspaces, leaveWorkspaces } = useAdminUser();
  const { appendPath } = useCustomNavigate();
  const userInputRef = useRef<HTMLInputElement>(null);
  const workspaces = useRecoilValue(workspacesAtom);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const createHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const userInput = userInputRef.current?.value;
    if (!userInput) {
      alert('workspace 이름을 입력해주세요');
      return;
    }
    createWorkspaces(userInput);
  };

  const leaveHandler = (id: number) => {
    leaveWorkspaces(id);
  };

  return (
    <>
      <Container>
        <SubContainer>
          {workspaces.map((it) => (
            <WorkspaceContainer key={it.id}>
              <TitleContainer>
                <SubTitle>건국대학교 컴퓨터공학부 주점</SubTitle>
                <Title>키오스쿨</Title>
              </TitleContainer>

              <button
                type={'button'}
                onClick={() => {
                  appendPath(`/workspace/${it.id}`);
                }}
              >
                이동
              </button>
              <button onClick={() => leaveHandler(it.id)}>탈퇴하기</button>
              <MenuTitle>메뉴 총 22개</MenuTitle>
            </WorkspaceContainer>
          ))}

          <AddWorkspaceContainer onSubmit={createHandler}>
            <input ref={userInputRef} type="text"></input>
            <button type="submit">생성하기</button>
          </AddWorkspaceContainer>
          <Link to={'/register-account'}>계좌 연결하기</Link>
        </SubContainer>
      </Container>
    </>
  );
}

export default AdminHome;
