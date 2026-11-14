import { SetProductComponentRequest } from '@@types/index';
import { SetProductComponentFormValue, SetProductFormValue } from '@@types/setProduct';

export const MIN_SET_SALE_PRICE = 1;
export const MIN_SET_COMPONENT_QUANTITY = 1;
export const MAX_SET_PRODUCT_NAME_LENGTH = 12;
export const MAX_SET_PRODUCT_DESCRIPTION_LENGTH = 30;

export function parseSetPrice(value: string): number | null {
  const trimmedValue = value.trim();
  if (!/^\d+$/.test(trimmedValue)) return null;

  const price = Number(trimmedValue);
  return Number.isSafeInteger(price) ? price : null;
}

export function getSetSalePrice(originalPrice: number, discountPrice: number): number {
  return originalPrice - discountPrice;
}

export function getSetDiscountRate(originalPrice: number, discountPrice: number): number {
  if (originalPrice <= 0 || discountPrice <= 0) return 0;
  return Math.round((discountPrice / originalPrice) * 100);
}

export function createEmptySetComponent(key: string): SetProductComponentFormValue {
  return {
    key,
    name: '',
    quantity: MIN_SET_COMPONENT_QUANTITY,
    conditionProductId: null,
  };
}

export function validateSetProductForm(value: SetProductFormValue): string | null {
  if (!value.name.trim() || !value.description.trim()) return '세트 이름과 설명을 입력해주세요.';
  if (value.name.length > MAX_SET_PRODUCT_NAME_LENGTH) return `세트 이름은 ${MAX_SET_PRODUCT_NAME_LENGTH}자 이하로 입력해주세요.`;
  if (value.description.length > MAX_SET_PRODUCT_DESCRIPTION_LENGTH) return `세트 설명은 ${MAX_SET_PRODUCT_DESCRIPTION_LENGTH}자 이하로 입력해주세요.`;

  const originalPrice = parseSetPrice(value.originalPrice);
  const discountPrice = parseSetPrice(value.discountPrice);
  if (originalPrice === null || discountPrice === null) return '설정 금액과 할인 금액은 0 이상의 정수로 입력해주세요.';
  if (discountPrice > originalPrice) return '할인 금액은 설정 금액보다 클 수 없습니다.';
  if (getSetSalePrice(originalPrice, discountPrice) < MIN_SET_SALE_PRICE) return '최종 판매가는 1원 이상이어야 합니다.';
  if (value.components.length === 0) return '제공 구성은 한 개 이상 등록해주세요.';

  const hasInvalidComponent = value.components.some(
    (component) => !component.name.trim() || !Number.isInteger(component.quantity) || component.quantity < MIN_SET_COMPONENT_QUANTITY,
  );
  if (hasInvalidComponent) return '모든 구성품의 이름과 1개 이상의 수량을 입력해주세요.';

  return null;
}

export function toSetProductComponentRequests(components: SetProductComponentFormValue[]): SetProductComponentRequest[] {
  return components.map(({ name, quantity, conditionProductId }) => ({
    name: name.trim(),
    quantity,
    conditionProductId,
  }));
}
