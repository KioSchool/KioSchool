import styled from '@emotion/styled';
import { rowFlex } from '@styles/flexStyles';
import RoundedAppButton from '@components/common/button/RoundedAppButton';
import useInputConfirm from '@hooks/useInputConfirm';
import useSuperAdminBank from '@hooks/super-admin/useSuperAdminBank';

const ButtonContainer = styled.div`
  gap: 20px;
  ${rowFlex({ align: 'center' })}
`;

function SuperAdminBankTitleNavBarChildren() {
  const bankName = '은행명';
  const bankCode = '은행 코드';

  const { addBank } = useSuperAdminBank();
  const { InputConfirmModal, confirm } = useInputConfirm({
    title: '은행 추가',
    description: '추가할 은행을 입력하세요.',
    submitText: '은행 추가하기',
    inputSlots: [
      { label: bankName, placeholder: '등록하실 은행 이름을 입력해주세요.' },
      { label: bankCode, placeholder: '은행 코드를 입력해주세요.' },
    ],
  });

  const handleAddDomain = async () => {
    try {
      const result = await confirm();

      addBank(result[bankName], result[bankCode]);
    } catch {
      alert('은행 추가 취소됨');
    }
  };

  return (
    <>
      <ButtonContainer className={'button-container'}>
        <RoundedAppButton onClick={handleAddDomain}>은행 추가하기</RoundedAppButton>
      </ButtonContainer>
      <InputConfirmModal />
    </>
  );
}

export default SuperAdminBankTitleNavBarChildren;
