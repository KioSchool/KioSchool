import { MouseEvent, useRef } from 'react';
import styled from '@emotion/styled';
import { useAtomValue, useSetAtom } from 'jotai';
import { match } from 'ts-pattern';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import DemoGuestBasket from './DemoGuestBasket';
import DemoGuestComplete from './DemoGuestComplete';
import DemoGuestLeft from './DemoGuestLeft';
import DemoGuestMenu from './DemoGuestMenu';
import DemoGuestPay from './DemoGuestPay';
import DemoGuestWait from './DemoGuestWait';
import DemoPhoneDialog from './DemoPhoneDialog';

const ORDER_UNAVAILABLE_LINES = ['아직 주문을 받을 수 없는 테이블입니다.', '직원에게 테이블 사용 시작을 요청해주세요.'];

const Screen = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${Color.WHITE};
  color: ${Color.TEXT_DEFAULT};
`;

const ScrollArea = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;

  &::-webkit-scrollbar {
    display: none;
  }
`;

function DemoGuestScreen() {
  const { guestScreen, isPhoneAlertOpen } = useAtomValue(demoStateAtom);
  const dispatch = useSetAtom(demoStateAtom);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 가져다 쓴 실제 컴포넌트 안의 링크(개인정보처리방침 등)를 누르면 체험 밖으로 나가므로 막는다
  const handleLinkClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!(event.target as HTMLElement).closest('a')) return;
    event.preventDefault();
    dispatch({ type: 'UNSUPPORTED' });
  };

  return (
    <Screen data-guest-screen={guestScreen} onClickCapture={handleLinkClick}>
      <ScrollArea key={guestScreen} ref={scrollRef} data-guest-scroll>
        {match(guestScreen)
          .with('menu', () => <DemoGuestMenu scrollRef={scrollRef} />)
          .with('basket', () => <DemoGuestBasket />)
          .with('pay', () => <DemoGuestPay />)
          .with('wait', () => <DemoGuestWait />)
          .with('complete', () => <DemoGuestComplete />)
          .with('left', () => <DemoGuestLeft />)
          .exhaustive()}
      </ScrollArea>
      {isPhoneAlertOpen && (
        <DemoPhoneDialog lines={ORDER_UNAVAILABLE_LINES} buttons={[{ label: '확인', onClick: () => dispatch({ type: 'PHONE_ALERT_CLOSE' }) }]} />
      )}
    </Screen>
  );
}

export default DemoGuestScreen;
