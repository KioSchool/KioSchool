import { useState } from 'react';
import styled from '@emotion/styled';
import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Account, PaymentMethod } from '@@types/index';
import { PAY_METHOD_STYLE } from '@constants/data/payMethods';
import AccountRows, { copyAccountInfo } from './AccountRows';
import { WaitCard, WaitCardTitle } from './waitStyles';

const Card = styled(WaitCard)`
  padding: 18px 20px;
  gap: 14px;
`;

const Toggle = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  cursor: pointer;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Reopen = styled.button<{ background: string }>`
  height: 50px;
  gap: 8px;
  border: none;
  border-radius: 12px;
  background: ${({ background }) => background};
  color: #25282b;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const ReopenLogo = styled.img<{ bordered: boolean }>`
  box-sizing: border-box;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: ${({ bordered }) => (bordered ? '1px solid #e8eef2' : 'none')};
`;

const AccountBox = styled.div`
  padding: 16px;
  gap: 10px;
  border-radius: 12px;
  background: #f7f7f7;
  ${colFlex({ align: 'stretch' })}
`;

const CopyButton = styled.button`
  height: 40px;
  border: 1px solid #e8eef2;
  border-radius: 12px;
  background: #ffffff;
  color: #464a4d;
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;

interface NotSentYetPanelProps {
  method: PaymentMethod.TOSS | PaymentMethod.KAKAOPAY;
  account: Account;
  onReopen: () => void;
}

// 토스·카카오페이 대기 화면의 '아직 보내지 않았나요?'. 처음엔 접혀 있고, 펼치면 앱 다시 열기와 계좌 정보
function NotSentYetPanel({ method, account, onReopen }: NotSentYetPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const style = PAY_METHOD_STYLE[method];
  const Arrow = isOpen ? RiArrowUpSLine : RiArrowDownSLine;

  return (
    <Card>
      <Toggle type="button" aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)}>
        <WaitCardTitle>아직 보내지 않았나요?</WaitCardTitle>
        <Arrow size={20} color="#9aa1a6" />
      </Toggle>
      {isOpen && (
        <>
          <Reopen type="button" background={style.background} onClick={onReopen}>
            {style.logo && <ReopenLogo src={style.logo} alt="" bordered={style.logoBordered} />}
            {style.label} 다시 열기
          </Reopen>
          <AccountBox>
            <AccountRows title="계좌로 직접 보내도 돼요" account={account} />
            <CopyButton type="button" onClick={() => copyAccountInfo(account)}>
              계좌 정보 복사하기
            </CopyButton>
          </AccountBox>
        </>
      )}
    </Card>
  );
}

export default NotSentYetPanel;
