import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useAtomValue, useSetAtom } from 'jotai';
import { match } from 'ts-pattern';
import { DEMO_PRODUCTS, DEMO_TABLE_NUMBER, DEMO_WORKSPACE } from '@constants/data/demo/demoSeed';
import { OrderCard, OrderCardDivider, OrderCardTitle } from '@components/user/order/orderCardStyles';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { calculateBasketTotalAmount, getBasketItemsWithProduct } from '@utils/orderBasket';
import DemoBasketItem from './DemoBasketItem';
import DemoGuestNavBar from './DemoGuestNavBar';
import DemoOrderButton from './DemoOrderButton';
import DemoPhoneDialog from './DemoPhoneDialog';

const PRODUCTS_MAP = Object.fromEntries(DEMO_PRODUCTS.map((product) => [product.id, product]));
const ALL_ITEMS = 'all';

const Container = styled.div`
  min-height: 100%;
  padding-top: 50px;
  box-sizing: border-box;
`;

const SubContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px 20px 130px;
  gap: 10px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const OrderBasketContainer = styled(OrderCard)`
  padding: 4px 16px;
`;

const Header = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 2px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const ClearButton = styled.button`
  padding: 4px 0;
  background: none;
  color: ${Color.TEXT_SUBTLE};
  font: inherit;
  font-size: 13px;
  border: none;
  cursor: pointer;
`;

const ItemContainer = styled.div`
  width: 100%;
  ${colFlex()}
`;

type DeleteTarget = number | typeof ALL_ITEMS;

function DemoGuestBasket() {
  const { basket } = useAtomValue(demoStateAtom);
  const dispatch = useSetAtom(demoStateAtom);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const basketItems = getBasketItemsWithProduct(basket, PRODUCTS_MAP);
  const totalAmount = calculateBasketTotalAmount(basket, PRODUCTS_MAP);

  useEffect(() => {
    if (basketItems.length === 0) dispatch({ type: 'GUEST_GO', screen: 'menu' });
  }, [basketItems.length, dispatch]);

  const confirmDelete = () => {
    match(deleteTarget)
      .with(ALL_ITEMS, () => basket.forEach((entry) => dispatch({ type: 'BASKET_DELETE', productId: entry.productId })))
      .with(null, () => undefined)
      .otherwise((productId) => dispatch({ type: 'BASKET_DELETE', productId }));
    setDeleteTarget(null);
  };

  const dialogLines = match(deleteTarget)
    .with(ALL_ITEMS, () => ['정말로 모두 삭제하시겠습니까?'])
    .otherwise(() => ['정말로 삭제하시겠습니까?']);

  return (
    <Container>
      <DemoGuestNavBar
        showNavBar={true}
        workspaceName={DEMO_WORKSPACE.name}
        tableNo={DEMO_TABLE_NUMBER}
        onBack={() => dispatch({ type: 'GUEST_GO', screen: 'menu' })}
      />
      <SubContainer>
        <Header>
          <OrderCardTitle>장바구니</OrderCardTitle>
          <ClearButton type="button" onClick={() => setDeleteTarget(ALL_ITEMS)}>
            전체 삭제
          </ClearButton>
        </Header>
        <OrderBasketContainer>
          {basketItems.map(({ basketItem, product }, index) => (
            <ItemContainer key={basketItem.productId}>
              <DemoBasketItem product={product} quantity={basketItem.quantity} onDeleteRequest={setDeleteTarget} />
              {index !== basketItems.length - 1 && <OrderCardDivider />}
            </ItemContainer>
          ))}
        </OrderBasketContainer>
        <DemoOrderButton
          showButton={basketItems.length > 0}
          buttonLabel={`${totalAmount.toLocaleString()}원 주문하기`}
          onClick={() => dispatch({ type: 'ORDER_REQUEST' })}
        />
      </SubContainer>
      {deleteTarget !== null && (
        <DemoPhoneDialog
          lines={dialogLines}
          buttons={[
            { label: '취소', onClick: () => setDeleteTarget(null) },
            { label: '확인', onClick: confirmDelete },
          ]}
        />
      )}
    </Container>
  );
}

export default DemoGuestBasket;
