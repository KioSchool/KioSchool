import Container from '@components/common/container/Container';
import MyInfoContent from '@components/common/content/MyInfoContent';
import styled from '@emotion/styled';
import useAdminUser from '@hooks/useAdminUser';
import { adminUserAtom } from '@recoils/atoms';
import ArrowLeftSvg from '@resources/svg/ArrowLeftSvg';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
const MyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const LabelContainer = styled.div`
  padding-bottom: 25px;
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LabelSubContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const UserNameText = styled.div`
  display: inline-block;
  padding-left: 50px;
  font-size: 36px;
  font-weight: 800;
`;

const ArrowLeftButton = styled(ArrowLeftSvg)`
  position: absolute;
  left: 1px;
  top: 20px;
  bottom: 20px;
  transition: transform 0.1s ease;
  &:hover {
    transform: scale(1.2);
  }
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
        <MyInfoContainer>
          <LabelContainer>
            <LabelSubContainer>
              <ArrowLeftButton />
              <UserNameText>{user.name}님의 마이페이지</UserNameText>
            </LabelSubContainer>
          </LabelContainer>

          <MyInfoContent />
        </MyInfoContainer>
      </Container>
    </>
  );
}

export default MyInfo;
