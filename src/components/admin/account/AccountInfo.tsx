import useAdminUser from '@hooks/admin/useAdminUser';
import { adminUserAccountAtomSelector } from '@recoils/atoms';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

function AccountInfo() {
  const { fetchAdminUser } = useAdminUser();
  const accountInfo = useRecoilValue(adminUserAccountAtomSelector);

  useEffect(() => {
    fetchAdminUser();
  }, []);

  if (!accountInfo) {
    return <div>계좌 정보가 비어있습니다.</div>;
  }

  const { bankName, accountNumber, accountHolder } = accountInfo;

  return (
    <div>
      <div>{bankName}</div>
      <div>{accountNumber}</div>
      <div>{accountHolder}</div>
    </div>
  );
}

export default AccountInfo;
