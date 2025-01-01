import styled from '@emotion/styled';
import { rowFlex } from '@styles/flexStyles';
import RoundedAppButton from '@components/common/button/RoundedAppButton';
import useInputConfirm from '@hooks/useInputConfirm';

const ButtonContainer = styled.div`
  gap: 20px;
  ${rowFlex({ align: 'center' })}
`;

function SuperAdminEmailTitleNavBarChildren() {
  const { InputConfirmModal, confirm } = useInputConfirm({
    title: '도메인 추가',
    description: '추가할 도메인을 입력하세요.',
    submitText: '도메인 추가하기',
    inputSlots: [
      { label: '학교명', placeholder: '등록하실 학교 이름을 입력해주세요.' },
      { label: '학교 도메인', placeholder: '학교 이메일 도메인을 입력해주세요.' },
    ],
  });

  const handleAddDomain = async () => {
    try {
      const result = await confirm();
      console.log('입력된 도메인:', result);
    } catch {
      console.log('도메인 추가 취소됨');
    }
  };

  return (
    <>
      <ButtonContainer className={'button-container'}>
        <RoundedAppButton onClick={handleAddDomain}>도메인 추가하기</RoundedAppButton>
      </ButtonContainer>
      <InputConfirmModal />
    </>
  );
}

export default SuperAdminEmailTitleNavBarChildren;
