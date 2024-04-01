import Container from '@components/common/container/Container';
import MyInfoContent from '@components/common/content/MyInfoContent';
import styled from '@emotion/styled';
import useAdminUser from '@hooks/useAdminUser';
import { adminUserAtom } from '@recoils/atoms';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
const MyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const UserNameContainer = styled.div`
  padding-bottom: 25px;
  width: 100%;
  height: 80px;
`;

const UserNameText = styled.div`
  display: inline-block;
  font-size: 60px;
  font-weight: 800;
`;

const DescriptionText = styled.div`
  display: inline-block;
  font-size: 60px;
  font-weight: 500;
`;
function MyInfo() {
  const { fetchAdminUser } = useAdminUser();
  const user = useRecoilValue(adminUserAtom);

  useEffect(() => {
    fetchAdminUser();
  }, []);
  return (
    <>
      <Container justifyValue={'center'} alignItems={'center'} flexDirection={'column'}>
        <>
          <MyInfoContainer>
            <UserNameContainer>
              <UserNameText>{user.name}</UserNameText>
              <DescriptionText>님의 마이페이지</DescriptionText>
            </UserNameContainer>
            <MyInfoContent />
          </MyInfoContainer>
        </>
      </Container>
    </>
  );
}

export default MyInfo;
