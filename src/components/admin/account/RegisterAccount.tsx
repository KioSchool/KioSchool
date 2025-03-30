import SelectWithOptions from '@components/common/select/SelectWithOptions';
import useAdminUser from '@hooks/admin/useAdminUser';
import { banksAtom } from '@recoils/atoms';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import AppLabel from '@components/common/label/AppLabel';
import { Color } from '@resources/colors';

const Container = styled.div`
  width: 70%;
  height: 100%;
  gap: 20px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const ContentsContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 30px 40px;
  box-sizing: border-box;
  background: #f9f9f9;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const InputContainer = styled.div`
  width: 100%;
  gap: 10px;
  ${colFlex({ justify: 'center', align: 'start' })};
`;

const InputRowContainer = styled.div`
  width: 100%;
  display: grid;
  column-gap: 10px;
  grid-template-columns: 60px 1fr;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  height: 50px;
  width: 300px;
  border-radius: 40px;
  padding: 0 20px;
  box-sizing: border-box;
  background: ${Color.WHITE};
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const SubmitContainer = styled.div`
  height: 100%;
  ${colFlex({ justify: 'end', align: 'center' })};
`;

const SubmitButton = styled.button`
  width: 90px;
  height: 23px;
  font-size: 12px;
  background: ${Color.WHITE};
  border: 1px solid ${Color.GREY};
  border-radius: 20px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

function RegisterAccount() {
  const { fetchBanks, registerAccount } = useAdminUser();
  const banks = useRecoilValue(banksAtom);
  const accountHolderRef = useRef<HTMLInputElement>(null);
  const accountNumberRef = useRef<HTMLInputElement>(null);
  const [selectedBankId, setSelectedBankId] = useState<number | null>(null);

  useEffect(() => {
    fetchBanks();
  }, []);

  const filteredBanks = banks.map((bank) => ({
    id: bank.id,
    name: bank.name,
  }));

  const allBanks = [{ id: -1, name: '은행을 선택해주세요.' }, ...filteredBanks];

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBankId(Number(event.target.value));
  };

  const registerHandler = async () => {
    const accountHolder = accountHolderRef.current?.value;
    const accountNumber = accountNumberRef.current?.value;

    if (selectedBankId === null || selectedBankId === -1) {
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

    const response = await registerAccount(selectedBankId, accountNumber, accountHolder);
    if (response) {
      alert('계좌 등록이 완료되었습니다.');
      accountHolderRef.current!.value = '';
      accountNumberRef.current!.value = '';
      setSelectedBankId(null);
    }
  };

  return (
    <Container>
      <ContentsContainer>
        <InputContainer>
          <AppLabel size={15} color={Color.BLACK} style={{ fontWeight: 500 }}>
            등록할 계좌
          </AppLabel>
          <InputRowContainer>
            <AppLabel size={13} color={Color.BLACK} style={{ fontWeight: 500 }}>
              은행명
            </AppLabel>
            <SelectWithOptions options={allBanks} isUseDefaultOption={false} onChange={handleSelect} width={'300px'} />
          </InputRowContainer>
          <InputRowContainer>
            <AppLabel size={13} color={Color.BLACK} style={{ fontWeight: 500 }}>
              예금주
            </AppLabel>
            <Input placeholder={'예금주명을 입력해주세요.'} ref={accountHolderRef} />
          </InputRowContainer>
          <InputRowContainer>
            <AppLabel size={13} color={Color.BLACK} style={{ fontWeight: 500 }}>
              계좌번호
            </AppLabel>
            <Input placeholder={'(-)를 제외한 계좌번호를 입력해주세요.'} type={'number'} ref={accountNumberRef} />
          </InputRowContainer>
        </InputContainer>
        <SubmitContainer>
          <SubmitButton onClick={registerHandler}>계좌 등록</SubmitButton>
        </SubmitContainer>
      </ContentsContainer>
    </Container>
  );
}

export default RegisterAccount;
