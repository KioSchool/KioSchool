import SelectWithOptions from '@components/common/select/SelectWithOptions';
import useAdminUser from '@hooks/admin/useAdminUser';
import { banksAtom } from '@recoils/atoms';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

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

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBankId(Number(event.target.value));
  };

  const registerHandler = () => {
    const accountHolder = accountHolderRef.current?.value;
    const accountNumber = accountNumberRef.current?.value;

    if (!selectedBankId) {
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

    registerAccount(selectedBankId, accountNumber, accountHolder);
  };

  return (
    <div>
      <div>등록할 계좌</div>
      <SelectWithOptions options={filteredBanks} isUseDefaultOption={false} onInput={handleSelect} />
      <input ref={accountHolderRef} placeholder="예금주명을 입력해주세요." />
      <input ref={accountNumberRef} placeholder="계좌번호를 입력해주세요.(- 없이 숫자만)" />
      <button onClick={registerHandler}>계좌 등록</button>
    </div>
  );
}

export default RegisterAccount;
