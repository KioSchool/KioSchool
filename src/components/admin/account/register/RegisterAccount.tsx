import SelectWithOptions from '@components/common/select/SelectWithOptions';
import useAdminUser from '@hooks/admin/useAdminUser';
import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import NewAppInput from '@components/common/input/NewAppInput';
import { adminBanksAtom, externalSidebarAtom } from 'src/jotai/admin/atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { RIGHT_SIDEBAR_ACTION } from '@@types/index';

const Container = styled.div`
  width: 100%;
  height: 100%;
  gap: 24px;
  padding: 10px 0 58px 0;
  ${colFlex({ justify: 'space-between', align: 'center' })};
`;

const InputContainer = styled.div`
  width: 100%;
  gap: 10px;
  color: #464a4d;
  ${colFlex({ justify: 'center', align: 'start' })};
`;

const InputLabel = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  ${colFlex({ justify: 'center', align: 'start' })};
`;

const InputColContainer = styled.div`
  width: 100%;
  gap: 4px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const SubmitContainer = styled.div`
  gap: 10px;
  ${rowFlex({ justify: 'end', align: 'center' })};
`;

function RegisterAccount() {
  const { fetchBanks, registerAccount } = useAdminUser();
  const banks = useAtomValue(adminBanksAtom);
  const accountHolderRef = useRef<HTMLInputElement>(null);
  const accountNumberRef = useRef<HTMLInputElement>(null);
  const [selectedBankId, setSelectedBankId] = useState<string>('');

  const setExternalSidebar = useSetAtom(externalSidebarAtom);

  const closeSidebar = () => {
    setExternalSidebar({
      action: RIGHT_SIDEBAR_ACTION.CLOSE,
    });
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const filteredBanks = banks.map((bank) => ({
    id: bank.id,
    name: bank.name,
  }));

  const allBanks = [{ id: 1, name: '은행을 선택해주세요.' }, ...filteredBanks];

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBankId(event.target.value);
  };

  const handleReset = () => {
    setSelectedBankId('');

    if (accountHolderRef.current) {
      accountHolderRef.current.value = '';
    }
    if (accountNumberRef.current) {
      accountNumberRef.current.value = '';
    }
  };

  const registerHandler = async () => {
    const accountHolder = accountHolderRef.current?.value;
    const accountNumber = accountNumberRef.current?.value;

    if (selectedBankId === '') {
      alert('은행을 선택해주세요.');
      return;
    }

    if (!accountHolder || accountHolder.trim() === '') {
      alert('예금주명을 입력해주세요.');
      return;
    }

    if (!accountNumber || accountNumber.trim() === '') {
      alert('계좌번호를 입력해주세요.');
      return;
    }

    if (accountNumber.includes('-')) {
      alert('하이픈(-)없이 숫자만 입력해주세요');
      return;
    }

    const response = await registerAccount(Number(selectedBankId), accountNumber, accountHolder);

    if (response) {
      alert('계좌 등록이 완료되었습니다.');
      handleReset();
      closeSidebar();
    }
  };

  return (
    <Container>
      <InputContainer>
        <InputColContainer>
          <InputLabel>은행명</InputLabel>
          <SelectWithOptions options={allBanks} isUseDefaultOption={false} onChange={handleSelect} width={'220px'} value={selectedBankId} />
        </InputColContainer>
        <InputColContainer>
          <InputLabel>예금주</InputLabel>
          <NewAppInput placeholder={'예금주명을 입력해주세요.'} type={'text'} ref={accountHolderRef} width={220} height={50} />
        </InputColContainer>
        <InputColContainer>
          <InputLabel>계좌번호</InputLabel>
          <NewAppInput placeholder={'(-)를 제외한 계좌번호를 입력해주세요.'} type={'text'} ref={accountNumberRef} width={220} height={50} />
        </InputColContainer>
      </InputContainer>
      <SubmitContainer>
        <NewCommonButton onClick={handleReset} customSize={{ width: 106, height: 40 }} color="blue_gray">
          초기화
        </NewCommonButton>
        <NewCommonButton onClick={registerHandler} customSize={{ width: 106, height: 40 }}>
          편집 완료
        </NewCommonButton>
      </SubmitContainer>
    </Container>
  );
}

export default RegisterAccount;
