import { useEffect, useRef, useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import CategoryBadgesContainer from '@components/user/order/CategoryBadgesContainer';
import useWorkspace from '@hooks/user/useWorkspace';
import { categoriesAtom, orderBasketAtom, userWorkspaceAtom } from '@recoils/atoms';
import { useRecoilValue } from 'recoil';
import { Product } from '@@types/index';
import _ from 'lodash';
import OrderButton from '@components/user/order/OrderButton';
import useProduct from '@hooks/user/useProduct';
import { colFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import OrderImageSlider from '@components/user/order/OrderImageSlider';
import OrderStickyNavBar from '@components/user/order/OrderStickyNavBar';
import WorkspaceNotice from '@components/user/order/WorkspaceNotice';
import OrderProductContent from './OrderProductContent';

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
  font-size: 25px;
  font-weight: 600;
  text-align: center;
`;

const Description = styled.div`
  font-size: 18px;
  color: ${Color.GREY};
  text-align: center;
  white-space: pre-wrap;
`;

function Order() {
  const workspace = useRecoilValue(userWorkspaceAtom);
  const isShowNotice = workspace.notice.length > 0;
  const rawProductCategories = useRecoilValue(categoriesAtom);
  const sellableProducts = workspace.products.filter((it) => it.isSellable);

  const productsByCategoryId = _.groupBy<Product>(sellableProducts, (product) => product.productCategory?.id);

  const productsMap = _.keyBy(workspace.products, 'id');

  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');
  const isPreview = searchParams.get('preview') === 'true';

  const { fetchWorkspace } = useWorkspace();
  const { fetchCategories } = useProduct(workspaceId);
  const navigate = useNavigate();
  const orderBasket = useRecoilValue(orderBasketAtom);
  const totalAmount = orderBasket.reduce((acc, cur) => {
    return acc + productsMap[cur.productId].price * cur.quantity;
  }, 0);

  const headerRef = useRef<HTMLDivElement>(null);
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    fetchWorkspace(workspaceId);
    fetchCategories();

    const updateStickyNavBarVisibility = () => {
      if (!headerRef.current) return;

      const bufferedHeight = 65;
      const headerBottom = headerRef.current.getBoundingClientRect().bottom;
      const isShow = headerBottom - bufferedHeight <= 0;

      setShowNavBar(isShow);
    };

    window.addEventListener('scroll', updateStickyNavBarVisibility);

    return () => window.removeEventListener('scroll', updateStickyNavBarVisibility);
  }, []);

  return (
    <Container className={'order-container'}>
      <OrderImageSlider images={workspace.images} />

      <Header ref={headerRef}>
        <Title>{workspace.name}</Title>
        <Description>{workspace.description}</Description>
      </Header>

      <OrderStickyNavBar showNavBar={showNavBar} workspaceName={workspace.name} />

      <StickyHeader>
        <CategoryBadgesContainer productCategories={rawProductCategories} productsByCategory={productsByCategoryId} />
      </StickyHeader>

      {isShowNotice && <WorkspaceNotice notice={workspace.notice} />}

      <OrderProductContent />

      <OrderButton
        showButton={orderBasket.length > 0}
        buttonLabel={`${totalAmount.toLocaleString()}원 장바구니`}
        onClick={() => {
          if (isPreview) {
            alert('미리보기 모드에서는 주문이 불가능합니다.');
            return;
          }
          navigate({
            pathname: '/order-basket',
            search: createSearchParams({
              workspaceId: workspaceId || '',
              tableNo: tableNo || '',
            }).toString(),
          });
        }}
      />
    </Container>
  );
}

export default Order;
