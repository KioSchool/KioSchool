import { RefObject, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useAtomValue, useSetAtom } from 'jotai';
import { DEMO_CATEGORIES, DEMO_PRODUCTS, DEMO_WORKSPACE } from '@constants/data/demo/demoSeed';
import OrderImageSlider from '@components/user/order/OrderImageSlider';
import WorkspaceNotice from '@components/user/order/WorkspaceNotice';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { calculateBasketTotalAmount } from '@utils/orderBasket';
import DemoCategoryBadges from './DemoCategoryBadges';
import DemoGuestNavBar from './DemoGuestNavBar';
import DemoOrderButton from './DemoOrderButton';
import DemoProductList from './DemoProductList';

const NAV_BAR_BUFFER = 65;
const PRODUCTS_MAP = Object.fromEntries(DEMO_PRODUCTS.map((product) => [product.id, product]));

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  ${colFlex({ align: 'center' })}
`;

const StickyHeader = styled.div`
  width: 100%;
  position: sticky;
  top: 45px;
  background: ${Color.WHITE};
  z-index: 1000;
`;

const Header = styled.div`
  width: 100%;
  min-height: 120px;
  word-break: keep-all;
  ${colFlex({ justify: 'center', align: 'center' })}
  gap: 7px;
`;

const Title = styled.div`
  color: ${Color.TEXT_STRONG};
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;

const Description = styled.div`
  padding: 0 24px;
  font-size: 15px;
  line-height: 1.45;
  color: ${Color.TEXT_SUBTLE};
  text-align: center;
  white-space: pre-wrap;
`;

interface DemoGuestMenuProps {
  scrollRef: RefObject<HTMLDivElement | null>;
}

function DemoGuestMenu({ scrollRef }: DemoGuestMenuProps) {
  const { basket } = useAtomValue(demoStateAtom);
  const dispatch = useSetAtom(demoStateAtom);
  const headerRef = useRef<HTMLDivElement>(null);
  const [showNavBar, setShowNavBar] = useState(false);
  const totalAmount = calculateBasketTotalAmount(basket, PRODUCTS_MAP);

  useEffect(() => {
    const area = scrollRef.current;
    if (!area) return undefined;

    const updateNavBar = () => {
      const header = headerRef.current;
      if (!header) return;
      setShowNavBar(header.offsetTop + header.offsetHeight - area.scrollTop - NAV_BAR_BUFFER <= 0);
    };
    area.addEventListener('scroll', updateNavBar);
    return () => area.removeEventListener('scroll', updateNavBar);
  }, [scrollRef]);

  return (
    <Container>
      <OrderImageSlider images={DEMO_WORKSPACE.images} />
      <Header ref={headerRef}>
        <Title>{DEMO_WORKSPACE.name}</Title>
        <Description>{DEMO_WORKSPACE.description}</Description>
      </Header>
      <DemoGuestNavBar showNavBar={showNavBar} workspaceName={DEMO_WORKSPACE.name} />
      <StickyHeader>
        <DemoCategoryBadges categories={DEMO_CATEGORIES} scrollRef={scrollRef} />
      </StickyHeader>
      <WorkspaceNotice notice={DEMO_WORKSPACE.notice} />
      <DemoProductList />
      <DemoOrderButton
        showButton={basket.length > 0}
        buttonLabel={`${totalAmount.toLocaleString()}원 장바구니`}
        onClick={() => dispatch({ type: 'GUEST_GO', screen: 'basket' })}
      />
    </Container>
  );
}

export default DemoGuestMenu;
