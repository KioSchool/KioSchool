import AccountInfo from '@components/admin/account/AccountInfo';
import RegisterAccount from '@components/admin/account/RegisterAccount';
import RegisterTossAccount from '@components/admin/account/RegisterTossAccount';

function AdminAccount() {
  return (
    <div>
      <AccountInfo />
      <RegisterAccount />
      <RegisterTossAccount />
    </div>
  );
}

export default AdminAccount;
