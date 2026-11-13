import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { RiBankLine } from '@remixicon/react';
import { rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { Account, RIGHT_SIDEBAR_ACTION } from '@@types/index';
import { externalSidebarAtom } from '@jotai/atoms';
import { ACCOUNT_MODAL } from '@constants/data/accountData';
import { hasRegisteredAccount } from '@utils/payMethods';
import useAdminUser from '@hooks/admin/useAdminUser';
import useConfirm from '@hooks/useConfirm';
import RegisterAccount from '@components/admin/account/register/RegisterAccount';
import { Badge, Card, Header, Info, InfoLabel, InfoValue, Name, Title } from './accountCardStyles';

const IconTile = styled.div`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${Color.LIGHT_GREY};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Actions = styled.div`
  gap: 8px;
  ${rowFlex({ align: 'center' })}
`;

const TextButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  color: #9aa1a6;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
`;

const PillButton = styled.button`
  height: 32px;
  padding: 0 14px;
  border-radius: 16px;
  border: 1px solid ${Color.BORDER_GREY};
  background: ${Color.WHITE};
  color: #464a4d;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
`;

const PrimaryPillButton = styled(PillButton)`
  border: none;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
`;

interface AccountCardProps {
  account: Account | null;
}

function AccountCard({ account }: AccountCardProps) {
  const location = useLocation();
  const setExternalSidebar = useSetAtom(externalSidebarAtom);
  const { deleteAccount } = useAdminUser();
  const { ConfirmModal, confirm } = useConfirm({
    title: '현재 등록된 계좌를 삭제하시겠습니까?',
    description: '확인 후 되돌릴 수 없습니다.',
    okText: '삭제하기',
    cancelText: '취소',
  });
  const registered = hasRegisteredAccount(account) && account;

  const handleRegisterClick = () => {
    setExternalSidebar({
      location,
      title: ACCOUNT_MODAL.TITLE,
      subtitle: ACCOUNT_MODAL.SUBTITLE,
      action: RIGHT_SIDEBAR_ACTION.OPEN,
      content: <RegisterAccount />,
    });
  };

  const handleDeleteClick = async () => {
    if (!(await confirm())) return;
    deleteAccount();
  };

  return (
    <Card>
      <Header>
        <IconTile>
          <RiBankLine size={20} color={Color.GREY} />
        </IconTile>
        <Title>
          <Name>입금받을 계좌</Name>
          {registered && <Badge active>등록됨</Badge>}
          {!registered && <Badge active={false}>등록 전</Badge>}
        </Title>
        <Actions>
          {!registered && (
            <PrimaryPillButton type="button" onClick={handleRegisterClick}>
              계좌 등록
            </PrimaryPillButton>
          )}
          {registered && (
            <TextButton type="button" onClick={handleDeleteClick}>
              삭제
            </TextButton>
          )}
          {registered && (
            <PillButton type="button" onClick={handleRegisterClick}>
              변경
            </PillButton>
          )}
        </Actions>
      </Header>
      <Info>
        {!registered && <InfoLabel>아직 등록한 계좌가 없어요</InfoLabel>}
        {registered && <InfoLabel>{`${registered.bank.name} · 예금주 ${registered.accountHolder}`}</InfoLabel>}
        {registered && <InfoValue>{registered.accountNumber}</InfoValue>}
      </Info>
      <ConfirmModal />
    </Card>
  );
}

export default AccountCard;
