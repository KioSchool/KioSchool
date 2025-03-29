import SelectWithOptions from '@components/common/select/SelectWithOptions';
import useAdminUser from '@hooks/admin/useAdminUser';
import { banksAtom } from '@recoils/atoms';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

function RegisterAccount() {
  const { fetchBanks } = useAdminUser();
  const banks = useRecoilValue(banksAtom);

  useEffect(() => {
    fetchBanks();
  }, []);

  const filteredBanks = banks.map((bank) => {
    return { id: bank.id, name: bank.name };
  });

  return (
    <div>
      <div>등록할 계좌</div>
      <SelectWithOptions options={filteredBanks} isUseDefaultOption={false} />
      <input placeholder={'예금주명을 입력해주세요.'} />
      <input placeholder={'계좌번호를 입력해주세요.'} />
      <button>계좌 등록</button>
    </div>
  );
}

export default RegisterAccount;
