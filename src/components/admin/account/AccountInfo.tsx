import useAdminUser from '@hooks/admin/useAdminUser';
import { adminUserAccountAtomSelector, adminUserTossAccountAtomSelector } from '@recoils/atoms';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

function AccountInfo() {
  const { fetchAdminUser } = useAdminUser();
  const accountInfo = useRecoilValue(adminUserAccountAtomSelector);
  const tossAccountInfo = useRecoilValue(adminUserTossAccountAtomSelector);

  useEffect(() => {
    fetchAdminUser();
  }, []);

  if (!accountInfo && !tossAccountInfo) {
    return <div>계좌 정보가 없습니다. 계좌 정보를 입력해주세요 (토스 계좌는 일반 계좌 정보를 입력한 후 동일한 계좌 정보를 토스QR로 입력해주세요)</div>;
  }

  return (
    <div>
      {accountInfo && (
        <>
          <div>일반 계좌 정보</div>
          <div>{accountInfo.bankName}</div>
          <div>{accountInfo.accountNumber}</div>
          <div>{accountInfo.accountHolder}</div>
        </>
      )}

      <br />

      <div>토스 계좌 정보</div>
      {accountInfo && !tossAccountInfo ? (
        <div>토스 계좌가 비어있습니다.</div>
      ) : (
        tossAccountInfo && (
          <>
            <div>{tossAccountInfo.tossBankName}</div>
            <div>{tossAccountInfo.tossAccountNumber}</div>
          </>
        )
      )}
    </div>
  );
}

export default AccountInfo;
