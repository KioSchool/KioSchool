import _ from 'lodash';
import { OrderProduct, OrderProductBase, Product } from '@@types/index';

/**
 * `_.keyBy(products, 'id')` 의 결과 타입.
 *
 * lodash 의 `Dictionary<Product>` 는 모든 키가 존재한다고 단정하지만 실제로는 없는 키가 온다.
 * 그래서 `productsMap[productId]` 는 타입상 `Product` 인데 런타임에는 `undefined` 일 수 있고,
 * 타입 검사로는 걸러지지 않는다. 조회는 반드시 이 파일의 헬퍼를 거친다.
 */
export type ProductsMap = _.Dictionary<Product>;

export interface BasketItemWithProduct {
  basketItem: OrderProductBase;
  product: Product;
}

/**
 * 장바구니 항목 중 현재 상품 목록에 실제로 존재하는 것만 남긴다.
 *
 * 상품 목록이 장바구니와 어긋나는 시점이 두 가지 있다.
 * - 주문 화면 재진입 직후: `userProductsAtom` 기본값이 `[]` 이고 상품 조회는 `useEffect` 에서 돈다.
 *   반면 장바구니는 `atomWithReset` 이라 라우트 이동에도 살아남는다.
 * - 상품이 삭제됐거나 다른 워크스페이스로 이동해 상품 목록을 다시 받아온 경우.
 *
 * 두 경우 모두 조회 결과가 `undefined` 이므로, 가드 없이 접근하면 주문 화면 렌더가 통째로 죽는다.
 */
export const getBasketItemsWithProduct = (orderBasket: OrderProductBase[], productsMap: ProductsMap): BasketItemWithProduct[] =>
  orderBasket.flatMap((basketItem) => {
    const product: Product | undefined = productsMap[basketItem.productId];

    if (!product) return [];

    return [{ basketItem, product }];
  });

/** 상품 목록에서 사라진 항목은 합계에서 제외한다. */
export const calculateBasketTotalAmount = (orderBasket: OrderProductBase[], productsMap: ProductsMap): number =>
  getBasketItemsWithProduct(orderBasket, productsMap).reduce((acc, { basketItem, product }) => acc + product.price * basketItem.quantity, 0);

export interface GaItem {
  item_id: string;
  item_name: string;
  price: number;
  quantity?: number;
}

export const productToGaItem = (product: Product): GaItem => ({
  item_id: String(product.id),
  item_name: product.name,
  price: product.price,
});

export const productsToGaItems = (products: Product[]): GaItem[] => products.map(productToGaItem);

/** 단가는 `basketItem.productPrice`가 아니라 조인된 `product.price`에서 읽는다 — 전자는 수량 변경 시 누적되는 라인 합계다. */
export const basketToGaItems = (orderBasket: OrderProductBase[], productsMap: ProductsMap): GaItem[] =>
  getBasketItemsWithProduct(orderBasket, productsMap).map(({ basketItem, product }) => ({
    ...productToGaItem(product),
    quantity: basketItem.quantity,
  }));

/** 서버 응답(`Order.orderProducts`)에서 직접 만든다. `productPrice`는 서버가 항상 단가로 채운다(백엔드 `OrderFacade.kt`의 `productPrice = product.price` 참고). */
export const orderResponseToGaItems = (orderProducts: OrderProduct[]): GaItem[] =>
  orderProducts.map((orderProduct) => ({
    item_id: String(orderProduct.productId),
    item_name: orderProduct.productName,
    price: orderProduct.productPrice,
    quantity: orderProduct.quantity,
  }));
