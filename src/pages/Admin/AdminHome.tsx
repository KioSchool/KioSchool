import React, { useEffect, useRef, useState } from 'react';
import useAdminUser from '@hooks/useAdminUser';
import { useRecoilValue } from 'recoil';
import { workspacesAtom } from '@recoils/atoms';
import userDefaultProfileImage from '@resources/image/userDefaultProfileImage.png';
import kioLogo from '@resources/image/kioLogo.png';
import plusLogo from '@resources/image/plusLogo.png';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import AppInputWithLabel from '@components/common/input/AppInputWithLabel';
import AppButton from '@components/common/button/AppButton';

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
  width: 60vw;
  flex-basis: 0;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  height: 500px;
  justify-content: space-between;
`;

const NavContainer = styled.div`
  padding-bottom: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const LinkItem = styled(Link)`
  width: 60px;
  height: 60px;
`;
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

const AddWorkspaceContainer = styled.form`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 321px;
  height: 332px;
  border-radius: 25px;
  border: 1px solid #000;
`;

const DummyWorkspaceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 321px;
  height: 332px;
  border-radius: 25px;
  border: 1px solid #000;
`;

const ModalOverlay = styled.div`
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 25px;
  padding: 20px;
  z-index: 1010;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
function AdminHome() {
  const { fetchWorkspaces, createWorkspaces, leaveWorkspaces } = useAdminUser();
  const { appendPath } = useCustomNavigate();
  const workspaceNameRef = useRef<HTMLInputElement>(null);
  const workspaceDescriptionRef = useRef<HTMLInputElement>(null);
  const workspaces = useRecoilValue(workspacesAtom);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  console.log(workspaces.length);
  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const createHandler = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const workspaceName = workspaceNameRef.current?.value;
    if (!workspaceName) {
      alert('workspace 이름을 입력해주세요');
      return;
    }

    const workspaceDescription = workspaceDescriptionRef.current?.value;
    if (!workspaceDescription) {
      alert('workspace 설명 입력해주세요');
      return;
    }
    createWorkspaces(workspaceName, workspaceDescription);
    setModalOpen(false);
  };

  const leaveHandler = (e: React.FormEvent, id: number) => {
    e.stopPropagation();
    leaveWorkspaces(id);
  };

  return (
    <>
      <Container>
        <SubContainer>
          <NavContainer>
            <Link to={'/'}>
              <img src={kioLogo} width="170px" height="80px"></img>
            </Link>

            <LinkItem to={'/register-account'}>
              <img src={userDefaultProfileImage} width="60px" height="60px"></img>
            </LinkItem>
          </NavContainer>
          {workspaces.map((it) => (
            <WorkspaceContainer
              key={it.id}
              onClick={() => {
                appendPath(`/workspace/${it.id}`);
              }}
            >
              <TitleContainer>
                <MainTitleContainer>
                  <SubTitle>{it.description}</SubTitle>
                  <DeleteContainer>
                    <DeleteText
                      onClick={(e: React.FormEvent) => {
                        leaveHandler(e, it.id);
                        window.location.reload();
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

          {workspaces.length < 3 && (
            <AddWorkspaceContainer onClick={() => setModalOpen(true)}>
              <img src={plusLogo} width={'51px'} height={'51px'}></img>
            </AddWorkspaceContainer>
          )}
          {workspaces.length < 2 &&
            Array.from({ length: 2 - workspaces.length }, (_, index) => <DummyWorkspaceContainer key={`dummy_${index}`}></DummyWorkspaceContainer>)}
        </SubContainer>
      </Container>
      {modalOpen && (
        <>
          <ModalOverlay onClick={() => setModalOpen(false)} />
          <ModalContent onSubmit={createHandler}>
            <AppInputWithLabel titleLabel={'워크스페이스 이름'} style={{ marginBottom: '25px' }} type={'text'} id={'workspaceName'} ref={workspaceNameRef} />
            <AppInputWithLabel
              titleLabel={'워크스페이스 설명'}
              style={{ marginBottom: '20px' }}
              type={'text'}
              id={'workspaceDescription'}
              ref={workspaceDescriptionRef}
            />
            <AppButton size={'large'} style={{ marginTop: '15px' }} type={'submit'}>
              생성하기
            </AppButton>
          </ModalContent>
        </>
      )}
    </>
  );
}

export default AdminHome;
